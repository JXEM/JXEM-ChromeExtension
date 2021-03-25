function init() {
  // 토글 버튼 생성
  const toggleButton = document.createElement("div");
  toggleButton.id = "toggleYoutube";
  toggleButton.innerText = "toggle";

  // 토글 버튼 추가
  const buttonInsertTarget = document.querySelector(
    "div.ytp-time-display.notranslate"
  );
  buttonInsertTarget.insertAdjacentElement("afterend", toggleButton);

  // 메모 창 생성
  const memo = document.createElement("div");
  memo.id = "memoYoutube";
  memo.classList.toggle("memoYoutubeHide");
  const textArea = document.createElement("textarea");
  textArea.id = "textAreaYoutube";
  memo.appendChild(textArea);
  const saveButton = document.createElement("div");
  saveButton.id = "saveButtonYoutube";
  saveButton.innerText = "Save";
  memo.appendChild(saveButton);

  // 메모 창 삽입
  const memoInsertTarget = document.querySelector("div#secondary");
  memoInsertTarget.insertAdjacentElement("afterbegin", memo);

  // 이벤트 등록
  toggleButton.onclick = toggle;
  saveButton.onclick = save;

  function save() {
    let text = textArea.value;
    if (text !== "") {
      chrome.storage.sync.get("memo", ({ memo }) => {
        if (memo) {
          const newMemo = [...memo, [text, Date.now()]];
          chrome.storage.sync.set({ memo: newMemo });
        } else {
          const newMemo = [[text, Date.now()]];
          chrome.storage.sync.set({ memo: newMemo });
        }
      });
      textArea.value = "";
    }
  }

  function toggle() {
    memo.classList.toggle("memoYoutubeHide");
  }
}

window.onload = init;
