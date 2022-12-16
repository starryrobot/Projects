const divLogs = document.querySelector(".logs");
const submitBtn = document.querySelector(".btn-save");
let form = document.querySelector("form");
const dateText = document.getElementById("date");
const fromLocal = JSON.parse(localStorage.getItem("Entry"));
const statusLocal = document.getElementById("status-local");
const statusClear = document.getElementById("status-clear");
const callbackText = document.getElementById("callbacks");
const formInteract = document.querySelectorAll(".form-interact");
const interactText = document.getElementById("interact-text");
const textArea = document.querySelector("textarea");
let currentPos = window.scrollY;
let formArray = [];
let ulHeight = 0;
let callbackCounter = 0;
let consoleCounter = 0;
let formEnabled = false;
let interactState = false;
let clearState = false;

/* Add DOMContentLoaded to load from Local Storage */

window.addEventListener("DOMContentLoaded", onLoad);

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
    statusLocal.innerHTML = `Loaded from Local Storage <i class="fa-solid fa-check" style="color:#019c01";></i>`;
    formShowCallbacks();
    renderForm(fromLocal);
  } else {
    clearState = false;
    console.log("Not found. Not calling renderForm");
    statusLocal.innerHTML = `Loaded from Local Storage <i class="fa-solid fa-xmark" style="color:#a70505";></i></i>`;
    statusClear.classList.add("disabled");
  }
  /* Get child element count on divLogs */
  if (divLogs.childElementCount === 0) {
    divLogs.innerHTML = `<span class="log-status">Nothing here, yet</span>`;
  }
}

/* Clear LocalStorage */
statusClear.addEventListener("click", function () {
  consoleCounter++;
  console.log(`[#${consoleCounter}] -- statusClear onClick event triggered`);
  if (clearState === true) {
    let alert = confirm(
      "Continuing will delete all callbacks and refresh the page!\r\n\r\nThis might not be able to be undone!\r\n\r\nContinue?"
    );
    if (alert) {
      let alert2 = confirm("Are you sure?");
      if (alert2) {
        localStorage.removeItem("Entry");
        location.reload();
        onLoad();
      }
    }
  }
});

/* Form interaction */

// formInteract.forEach(function (element) {
//   const faChevronDown = `<i class="fa-solid fa-chevron-down fa-2xl"></i>`;
//   const faChevronUp = `<i class="fa-solid fa-chevron-up fa-2xl"></i>`;
//   const showForm = `<span class="normal" id="interact-text">Show Form</span>`;
//   const hideForm = `<span class="normal" id="interact-text">Hide Form</span>`;
//   const children = document.querySelector(".form-interact").childNodes;
//   console.log(children);
//   element.addEventListener("click", function (e) {
//     const styles = e.currentTarget.classList;
//     if (styles.contains("interact-form")) {
//       form.classList.toggle("hidden");
//       if (form.classList.contains("hidden")) {
//         console.log(this.innerHTML);
//         e.currentTarget.innerHTML = faChevronUp + showForm;
//         setTimeout(function () {
//           form.style.display = "none";
//         }, 1000);
//       } else {
//         console.log(this.innerHTML);
//         e.currentTarget.innerHTML = faChevronDown + hideForm;
//         setTimeout(function () {
//           form.style.display = "initial";
//         }, 1000);
//       }
//     }
//   });
// });

/* Entry Handler */

function liHandler(liEl) {
  liEl.classList.toggle("highlighted");
}

/* Tab Handler */

function tabHandler(el) {
  consoleCounter++;
  console.log(`[#${consoleCounter}] -- tabHandler function called`);
  const faChevronDown = `<i class="fa-solid fa-chevron-down fa-2xl"></i>`;
  const faChevronUp = `<i class="fa-solid fa-chevron-up fa-2xl"></i>`;
  const mainEl = document.querySelector("main");
  const elementsArray = Array.from(mainEl.childNodes);
  console.log(
    `NodeList of main element converted to an array. Contents are ${elementsArray}`
  );
  let elClassList = el.classList;
  console.log(`ClassList of event is ${elClassList}`);
  if (elClassList.contains("interact-stats")) {
    console.log(stats);
    const cards = document
      .querySelector(".cards")
      .classList.toggle("option-disabled");
    if (cards) {
      el.innerHTML =
        faChevronDown +
        `<span class="normal" id="interact-text">Show Stats</span>`;
    } else {
      el.innerHTML =
        faChevronUp +
        `<span class="normal" id="interact-text">Hide Stats</span>`;
    }
  } else if (elClassList.contains("interact-logs")) {
    const logs = document
      .querySelector(".log-area")
      .classList.toggle("option-disabled");
    if (logs) {
      el.innerHTML =
        faChevronDown +
        `<span class="normal" id="interact-text">Show Logs</span>`;
    } else {
      el.innerHTML =
        faChevronUp +
        `<span class="normal" id="interact-text">Hide Logs</span>`;
    }
  } else {
    const formEl = document
      .querySelector("form")
      .classList.toggle("option-disabled");
    if (formEl) {
      el.innerHTML =
        faChevronDown +
        `<span class="normal" id="interact-text">Show Form</span>`;
    } else {
      el.innerHTML =
        faChevronUp +
        `<span class="normal" id="interact-text">Hide Form</span>`;
    }
  }
}

// formInteract.addEventListener("click", function (element) {
//   const faChevronDown = `<i class="fa-solid fa-chevron-down fa-2xl"></i>`;
//   const faChevronUp = `<i class="fa-solid fa-chevron-up fa-2xl"></i>`;
//   const showForm = `<span class="normal" id="interact-text">Show Form</span>`;
//   const hideForm = `<span class="normal" id="interact-text">Hide Form</span>`;
//   form.classList.toggle("hidden");
//   if (form.classList.contains("hidden")) {
//     formInteract.innerHTML = faChevronUp + showForm;
//     setTimeout(function () {
//       form.style.display = "none";
//     }, 1000);
//   } else {
//     formInteract.innerHTML = faChevronDown + hideForm;
//     setTimeout(function () {
//       form.style.display = "initial";
//     }, 1000);
//   }
// });

/* Add EventListener to form */

form.addEventListener("submit", function (e) {
  consoleCounter++;
  console.log(`[#${consoleCounter}] -- form onSubmit event triggered`);
  /* Prevent refresh */
  e.preventDefault();
  processForm();
});

function processForm() {
  consoleCounter++;
  console.log(`[#${consoleCounter}] -- processForm function called`);
  /* Set LocalStorage */
  localStorage.setItem("Entry", JSON.stringify(fromLocal));
  /* Get values of form elements */
  let formPriority = document.getElementById("logpriority").value;
  let formDateTimeNow = document.getElementById("datetime").value;
  let formDateTimeScheduled = document.getElementById("datescheduled").value;
  let formCustName = document.getElementById("custname").value;
  let formCC = document.getElementById("ccnumber").value;
  let formRef = document.getElementById("custref").value;
  let formLog = document.getElementById("loginfo").value;
  /* Push object to array */
  formArray.push({
    lognumber: countCallbacks(),
    priority: formPriority,
    datenow: formDateTimeNow,
    datescheduled: formDateTimeScheduled,
    custname: formCustName,
    ccnumber: formCC,
    custref: formRef,
    log: formLog,
  });
  console.log(formArray);
  /* Save to Local Storage */
  localStorage.setItem("Entry", JSON.stringify(formArray));
  /* Call renderForm */
  renderForm(formArray);
}

/* Add EventListener for onKeyPress to form */

textArea.addEventListener("click", function () {
  textArea.classList.toggle("active");
});

window.addEventListener("keypress", function (e) {
  consoleCounter++;
  console.log(`[#${consoleCounter}] -- form onKeyPress event triggered`);
  if (e.key == "Enter" && !textArea.classList.contains("active")) {
    processForm();
  }
});

/* Render Form function */

function renderForm(form) {
  consoleCounter++;
  console.log(`[#${consoleCounter}] -- renderForm function called`);
  let listItems = "";
  for (let i = 0; i < form.length; i++) {
    console.log(form[i]);
    listItems += `
                       <div class="renderedEntry" onclick="liHandler(this)" data-attribute="${formArray.indexOf(
                         form[i]
                       )}" >
                       <div class="entry-top">
                       <h4 class="li-head">Call back Log # ${
                         form[i].lognumber
                       }</h4>
                       </div>
                       <div class="entry-item">
                       <span class="li-text"><b>Priority:</b></span><span class="li-text text-main">${
                         form[i].priority
                       }</span>
                       </div>
                       <div class="entry-item">
                       <span class="li-text"><b>Date & Time Now:</b></span><span class="li-text text-main">${
                         form[i].datenow
                       }</span>
                       </div>
                       <div class="entry-item">
                       <span class="li-text"><b>Date Scheduled:</b></span><span class="li-text text-main">${
                         form[i].datescheduled
                       }</span>
                       </div>
                       <div class="entry-item">
                       <span class="li-text"><b>Customer Name:</b></span><span class="li-text text-main">${
                         form[i].custname
                       }</span>
                       </div>
                       <div class="entry-item">
                       <span class="li-text"><b>CC Number:</b></span><span class="li-text text-main">${
                         form[i].ccnumber
                       }</span>
                       </div>
                       <div class="entry-item">
                       <span class="li-text"><b>Order Ref:</b></span><span class="li-text text-main">${
                         form[i].custref
                       }</span>
                       </div>
                       <div class="entry-item">
                       <span class="li-text"><b>Notes:</b></span><span class="li-text text-main">${
                         form[i].log
                       }</span>
                       </div>
                       <div class="render-btn-space">
                       <button class="btn btn-primary delete" onclick="liHandler(this)">Delete</button>
                       <button class="btn btn-secondary highlight" onclick="liHandler(this)">Highlight</button>
                       </div>
                       </div>`;
  }
  divLogs.innerHTML = listItems;
  formShowCallbacks();
  /* Scroll to bottom of log-area element */
  setTimeout(function () {
    window.scrollTo(0, divLogs.scrollHeight);
  }, 1250);
  // logArea.scrollTop = logArea.scrollHeight;
}

/* Time function */

setInterval(function () {
  let current = new Date();
  const options = { hour: "numeric", minute: "numeric", hour12: true };
  let date = current.toLocaleDateString("en-GB", options);
  dateText.textContent = date;
}, 1000);

/* Counter function */

function countCallbacks() {
  consoleCounter++;
  console.log(`[#${consoleCounter}] -- countCallbacks function called`);
  let returnedCount = formArray.length + 1;
  return returnedCount;
}

function formShowCallbacks() {
  consoleCounter++;
  console.log(`[#${consoleCounter}] -- formShowCallbacks function called`);
  callbackText.textContent = formArray.length;
}

/* Scroll Position Function & Timer */

setInterval(getScroll, 2500);

function getScroll() {
  currentPos = window.scrollY;
  console.log(currentPos);
  return currentPos;
}
