import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import firebase from "firebase/app";
import "firebase/database";
import Chat from "./Chat";
import "./style.css";

const Wrapper = styled.div`
  position: relative;
  width: 50px;
  height: 50px;
`;

const bounceFrame = keyframes`
  0%{
    transform: translateY(0px);
  }50%{
    transform: translateY(-10px);
  }100%{
    transform: translateY(0px);
  }
`;

const ToggleButton = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 1px solid black;
  background-color: #d3d3d3;
  &:hover {
    cursor: pointer;
    animation: ${bounceFrame} 1s ease-in infinite;
  }
`;

const App = () => {
  const [openChatView, setOpenChatView] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});

  const firebaseConfig = {
    apiKey: "AIzaSyADWkScefuru-Yj9MdWDe4P_RjoOhC9Opk",
    authDomain: "jxem-6900b.firebaseapp.com",
    databaseURL: "https://jxem-6900b-default-rtdb.firebaseio.com",
    projectId: "jxem-6900b",
    storageBucket: "jxem-6900b.appspot.com",
    messagingSenderId: "885331730726",
    appId: "1:885331730726:web:aece010c8af2669a44a1e7",
  };
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  } else {
    firebase.app();
  }

  // listen chrome message
  useEffect(() => {
    console.log("user info check");
    function handleChromeMessage(request, sender, sendResponse) {
      const { isLoggedIn, user } = request;
      console.log(user);
      if (isLoggedIn) {
        setIsLoggedIn(true);
        setUser(user);
      } else {
        setIsLoggedIn(false);
        setUser({});
      }
      console.log(`login: ${isLoggedIn}, user: ${user}`);
    }

    chrome.runtime.onMessage.addListener(handleChromeMessage);
  }, []);

  const fbConfig = {
    apiKey: "AIzaSyADWkScefuru-Yj9MdWDe4P_RjoOhC9Opk",
    // authDomain: "jxem-6900b.firebaseapp.com",
    projectId: "jxem-6900b",
    storageBucket: "jxem-6900b.appspot.com",
    messagingSenderId: "885331730726",
    appId: "1:885331730726:web:aece010c8af2669a44a1e7",
    // appclient:"836541547315-dgodsk7lc2895j5ah08m26s705kr72as.apps.googleusercontent.com"
  };
  if (!firebase.apps.length) {
    firebase.initializeApp(fbConfig);
  } else {
    firebase.app();
  }

  return (
    <Wrapper>
      {isLoggedIn && (
        <>
          <ToggleButton
            onClick={() => {
              setOpenChatView((v) => !v);
            }}
          />
          {openChatView && <Chat user={user} />}
        </>
      )}
    </Wrapper>
  );
};

export default App;
