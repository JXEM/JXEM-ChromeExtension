import React from "react";
import ReactDOM from "react-dom";
import Button from "./Button";
import InjectedApp from "./InjectedApp";
import "./style.css";

// Render Target Inject
const buttonTarget = document.createElement("div");
buttonTarget.id = "JXEM-button-target";
document
  .querySelector("div.ytp-right-controls")
  .insertAdjacentElement("beforebegin", buttonTarget);

const memoTarget = document.createElement("div");
memoTarget.id = "JXEM-app-target";
document
  .querySelector("div#secondary")
  .insertAdjacentElement("afterbegin", memoTarget);

// Render Components
ReactDOM.render(<Button />, document.getElementById("JXEM-button-target"));
ReactDOM.render(<InjectedApp />, document.getElementById("JXEM-app-target"));
