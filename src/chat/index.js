import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

const chatRoot = document.createElement("div");
chatRoot.id = "JXEM-chatRoot";
document.body.appendChild(chatRoot);

// Render Components
ReactDOM.render(<App />, document.getElementById("JXEM-chatRoot"));
