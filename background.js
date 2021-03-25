let memo = [["Hello World", Date.now()]];

chrome.runtime.onInstalled.addListener(() => {
  // chrome.storage.sync.set({ memo }, () => {
  //   console.log(memo);
  // });
});
