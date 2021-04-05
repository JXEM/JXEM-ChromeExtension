import "./style.css";
import firebase from "firebase/app";

chrome.storage.sync.get("memo", ({ memo }) => {
  if (memo) {
    for (let i = 0; i < memo.length; i++) {
      console.log(memo[i]);
      addToPopup(...memo[i]);
    }
  }
});

console.log("hi");

const firebaseConfig = {
  apiKey: "AIzaSyC0b3Fz5h8zXkr9FAWqDBshr-svmbUDiiI",
  authDomain: "myuser-fc96a.firebaseapp.com",
  projectId: "myuser-fc96a",
  storageBucket: "myuser-fc96a.appspot.com",
  messagingSenderId: "127110286742",
  appId: "1:127110286742:web:847492231637701738a1b7",
};
const app = firebase.initializeApp(firebaseConfig);
const auth = app.auth();
auth.setPersistence(firebase.auth.Auth.Persistence.SESSION);
const signInWithPopup = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  return auth.signInWithPopup(provider).catch((error) => {
    console.log(error);
  });
};

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request) {
    console.log("popup login");
  }
  if (request.task === "login") {
    sendResponse({ result: true });
  }
});

function addToPopup(text, date) {
  console.log(date);
  const terminal = document.getElementById("console");
  const line = document.createElement("div");
  line.classList.add("line");
  line.innerHTML = text;
  const time = document.createElement("span");
  time.innerHTML =
    `${new Date(date).getMonth()}/${new Date(date).getDate()}` +
    ` ` +
    `${new Date(date).getHours()}`.padStart(2, 0) +
    ":" +
    `${new Date(date).getMinutes()}`.padStart(2, 0);
  time.classList.add("time");
  line.appendChild(time);

  terminal.appendChild(line);
}
