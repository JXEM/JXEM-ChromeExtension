// try {
//   importScripts("dist/backgroundLogic.js");
// } catch (e) {
//   console.error(e);
// }
let isLoggedIn = false;
let user = {};

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.message === "isLoggedIn") {
    sendResponse({
      message: "success",
      payload: isLoggedIn,
      user,
    });
  } else if (request.message === "userLoggedIn") {
    isLoggedIn = true;
    user = request.user;
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { isLoggedIn, user });
    });
    sendResponse({ message: "login success" });
  } else if (request.message === "userLoggedOut") {
    isLoggedIn = false;
    user = {};
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { isLoggedIn, user });
    });
    sendResponse({ message: "logout success" });
  }

  return true;
});
