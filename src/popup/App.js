import React, { useEffect, useState } from "react";
import styled from "styled-components";
import firebase from "firebase/app";
import * as firebaseui from "firebaseui";
import "./style.css";
import Loader from "./Loader";

const Wrapper = styled.div`
  width: 300px;
  height: 500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const UserInfo = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  font-size: 1rem;
  text-align: center;
`;

const UserPhoto = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  background-image: url(${(props) => props.src});
  margin-bottom: 10px;
`;

const Logout = styled.div`
  width: 100px;
  border-radius: 4px;
  border: 1px solid black;
  margin: 2px;
  padding: 2px;
  &:hover {
    cursor: pointer;
  }
`;

const Login = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  font-size: 2rem;
  text-transform: uppercase;
  transition: font-size 0.2s ease-in;
  &:hover {
    transition: font-size 0.2s ease-in;
    font-size: 2.2rem;
    cursor: pointer;
  }
`;

const LoginOptions = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
`;

const fbConfig = {
  apiKey: "AIzaSyADWkScefuru-Yj9MdWDe4P_RjoOhC9Opk",
  authDomain: "jxem-6900b.firebaseapp.com",
  projectId: "jxem-6900b",
  storageBucket: "jxem-6900b.appspot.com",
  messagingSenderId: "885331730726",
  appId: "1:885331730726:web:aece010c8af2669a44a1e7",
};
firebase.initializeApp(fbConfig);

const fbUIConfig = {
  callbacks: {
    signInSuccessWithAuthResult: function (authResult, redirectUrl) {
      const { user } = authResult;
      chrome.runtime.sendMessage(
        { message: "userLoggedIn", user },
        (response) => {
          if (response.message) {
            console.log(response.message);
          }
        }
      );
      return false;
    },
    uiShown: function () {
      document.getElementById("JXEM-loginButton").style.display = "none";
    },
  },
  signInFlow: "popup",
  signInOptions: [
    {
      provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      customParameters: {
        prompt: "select_account",
      },
    },
  ],
  // Terms of service url.
  // tosUrl: '<your-tos-url>',
  // Privacy policy url.
  // privacyPolicyUrl: '<your-privacy-policy-url>'
};
const fbUI = new firebaseui.auth.AuthUI(firebase.auth());

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [photoURL, setPhotoURL] = useState("");

  useEffect(() => {
    const unsuscribe = firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        const { displayName: name, photoURL } = user;
        setName(name);
        setPhotoURL(photoURL);
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });
    return () => unsuscribe();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 800);
  }, []);

  const handleLogin = () => {
    fbUI.start("#JXEM-loginUI", fbUIConfig);
  };

  const handleLogout = () => {
    firebase.auth().signOut();
    chrome.runtime.sendMessage({ message: "userLoggedOut" }, (response) => {
      if (response.message) {
        console.log(response.message);
      }
    });
    setIsLoggedIn(false);
  };

  return loading ? (
    <Loader />
  ) : (
    <Wrapper>
      {isLoggedIn ? (
        <UserInfo>
          {!!photoURL && <UserPhoto src={photoURL} />}
          {`${name}`}
          <Logout onClick={handleLogout}>Logout</Logout>
        </UserInfo>
      ) : (
        <>
          <LoginOptions id="JXEM-loginUI" />
          <Login id="JXEM-loginButton" onClick={handleLogin}>
            login
          </Login>
        </>
      )}
    </Wrapper>
  );
};

export default App;
