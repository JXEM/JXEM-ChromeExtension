chrome.storage.sync.get("memo", ({ memo }) => {
  if (memo) {
    for (let i = 0; i < memo.length; i++) {
      console.log(memo[i]);
      addToPopup(...memo[i]);
    }
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
