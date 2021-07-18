let user = null;
let isLoggedIn = false;

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  switch (request.message) {
    case "userLoggedIn":
      user = request.user;
      isLoggedIn = true;
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {
          isLoggedIn,
          user,
        });
      });
      sendResponse({
        message: "login success",
        isLoggedIn,
        user,
      });
      break;

    case "userLoggedOut":
      user = null;
      isLoggedIn = false;
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {
          isLoggedIn,
          user,
        });
      });
      sendResponse({
        message: "logout success",
        isLoggedIn,
        user,
      });

    case "userInfo":
      if (request.user) {
        user = request.user;
      }
      if (request.isLoggedIn) {
        isLoggedIn = request.isLoggedIn;
      }
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {
          isLoggedIn,
          user,
        });
      });
      sendResponse({
        message: "send user info",
        isLoggedIn,
        user,
      });
      break;

    default:
      break;
  }

  return true;
});
