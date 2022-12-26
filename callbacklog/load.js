const fromLocal = JSON.parse(localStorage.getItem("Call Logs"));
const fromLocalHigh = JSON.parse(localStorage.getItem("Priority Array"));
let formArray = [];
let highPriority = [];
let clearState = false;

function onLoad() {
  consoleCounter++;
  console.log(
    `[#${consoleCounter}] -- onLoad DOMContentLoaded event triggered`
  );
  if (fromLocal) {
    clearState = true;
    console.log(
      `LocalStorage found. Parsed content of LocalStorage (array) is ${fromLocal}`
    );
    formArray = fromLocal;
    statusLocal.innerHTML += `<i class="fa-solid fa-check" style="color:#019c01";></i>`;
    statusLocal.title = "Local Storage has been found";
    if (fromLocalHigh) {
      console.log(
        `Priority Array found. Parsed content of highPriority (array) is ${fromLocalHigh}`
      );
      for (let i = 0; i < fromLocalHigh.length; i++) {
        totalHighPriority++;
        document.querySelector(".cards #high").textContent =
          fromLocalHigh.length;
      }
      highPriority = fromLocalHigh;
    }
    formShowCallbacks();
    renderForm(fromLocal);
  } else {
    clearState = false;
    console.log("Not found. Not calling renderForm");
    statusLocal.innerHTML += `<i class="fa-solid fa-xmark" style="color:#a70505";></i></i>`;
    statusClear.classList.add("disabled");
    statusLocal.title = "Local Storage has not been found";
    // checkContents(divLogsChildren);
  }
  checkContents();
  today = new Date().toLocaleDateString("en-GB");
  console.log(today);
}
