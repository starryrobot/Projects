/* GLOBAL VARIABLES */
/* Get elements */
let divLogs = document.querySelector(".logs");
let divLogsChildren = divLogs.childElementCount;
const submitBtn = document.querySelector(".btn-save");
let form = document.querySelector("form");
const dateText = document.getElementById("date");
// const statusLi = document.querySelectorAll(".li-status");
// const statusLocal = document.getElementById("status-local");
// const statusClear = document.getElementById("status-clear");
// const statusHelp = document.getElementById("status-help");
const callbackText = document.getElementById("callbacks");
const formInteract = document.querySelectorAll(".form-interact");
const interactText = document.getElementById("interact-text");
const interactForm = document.querySelector(".interact-form");
const textArea = document.querySelector("textarea");
const searchText = document.querySelector(".search-text");
const searchInput = document.getElementById("search");
// const hamburger = document.getElementById("hamburger");
const topBar = document.querySelector(".top-bar");
const topMenu = document.querySelector(".top-menu");

/* Get Local Storage */
const fromLocal = JSON.parse(localStorage.getItem("Call Logs"));
const fromLocalHigh = JSON.parse(localStorage.getItem("Priority Array"));

/* Booleans */
let delState = false;
let highlightState = false;
let formEnabled = false;
let interactState = false;
let clearState = false;
let searchFocus = false;
let windowDisplay = false;

/* Strings */
let currState = "";
let div = "";
let today = "";
let formDay = "";
let windowEl = "";

/* Numbers */
let ulHeight = 0;
let callbackCounter = 0;
let consoleCounter = 0;
let todayCount = 0;
let currScrollPos = 0;
let totalHighPriority = 0;
let currentPos = window.scrollY;

/* Arrays */
let formArray = [];
let searchArray = [];
let highPriority = [];
let navArray = [];
let notifArray = [];

/* Add DOMContentLoaded to load from Local Storage */

window.addEventListener("DOMContentLoaded", onLoad);

// hamburger.addEventListener("click", function () {
//   topBar.classList.toggle("hide");
//   topMenu.classList.toggle("hide");
// });

/* Start routine procedure on page fully loaded in browser */
function onLoad() {
  consoleCounter++;
  console.log(
    `[#${consoleCounter}] -- onLoad DOMContentLoaded event triggered`
  );
  if (fromLocal) {
    clearState = true;
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
    // console.log("Not found. Not calling renderForm");
    // statusLocal.innerHTML += `<i class="fa-solid fa-xmark" style="color:#a70505";></i></i>`;
    // statusClear.classList.add("disabled");
    // statusLocal.title = "Local Storage has not been found";
    // checkContents(divLogsChildren);
  }
  checkContents();
  today = new Date().toLocaleDateString("en-GB");
  console.log(today);
}

/* Timer Function for checking current number of call backs */
setInterval(function () {
  consoleCounter++;
  console.log(`[#${consoleCounter}] -- setInterval (checkContents) called`);
  checkContents();
}, 2000);

/* Function for checking current number of call backs */
function checkContents() {
  consoleCounter++;
  console.log(`[#${consoleCounter}] -- checkContents function called`);
  divLogsChildren = divLogs.childElementCount;
  console.log(`Children in Logs: ${divLogsChildren}`);
  if (divLogsChildren === 0) {
    console.log("No children found");
    divLogs.innerHTML = `<span class="log-status">Nothing here, yet</span>`;
    callbackText.textContent = `${divLogsChildren}`;
    callbackText.title = "Entry still exists. Available again by refreshing";
    divLogs.innerHTML = "";
    divLogsChildren = divLogs.childElementCount;
  } else {
    callbackText.textContent = `${divLogsChildren}`;
  }
}

// getScrollInteractForm();

// setInterval(function () {
//   const bottomBar = document.querySelector(".bottom-bar");
//   currScrollPos = window.scrollY;
//   console.log(currScrollPos);
//   const formScrollPos = interactForm.scrollHeight;
//   console.log(formScrollPos);
//   if (currScrollPos < formScrollPos) {
//     bottomBar.classList.add("visible");
//     form.classList.add("bottom-fixed");
//   } else {
//     bottomBar.classList.remove("visible");
//     form.classList.remove("bottom-fixed");
//     console.log("No");
//   }
// }, 1000);

/* Top Menu function */
// statusLi.forEach(function (liEl) {
//   consoleCounter++;
//   console.log(`[#${consoleCounter}] -- Top Menu (statusLi) function called`);
//   liEl.addEventListener("click", function (e) {
//     const liElClassList = e.currentTarget.classList;
//     console.log(liElClassList);
//     /* Refresh Page */
//     if (liElClassList.contains("status-refresh")) {
//       document.location.reload();
//       /* Help Section */
//     } else if (liElClassList.contains("status-help")) {
//       const helpWindow =
//         statusHelp.parentElement.parentElement.lastElementChild;
//       helpWindow.childNodes[1].classList.toggle("visible");
//       helpWindow.childNodes[1].scrollTop = helpWindow.scrollHeight;
//       /* Clear Local Storage */
//     } else if (liElClassList.contains("status-pop")) {
//       currScrollPos = 0;
//       // form.classList.toggle("bottom-fixed");
//     } else {
//       clearState = true;
//       if (clearState === true) {
//         let alert = confirm(
//           "Continuing will delete all callbacks and refresh the page!\r\n\r\nThis might not be able to be undone!\r\n\r\nContinue?"
//         );
//         if (alert) {
//           let alert2 = confirm("Are you sure?");
//           if (alert2) {
//             localStorage.removeItem("Entry");
//             location.reload();
//             onLoad();
//           }
//         }
//       }
//     }
//   });
// });

function createPop() {
  window.open(
    url,
    "Call Log Form",
    "height=auto,width=auto,resizable=no,scrollbars=no,toolbar=no,menubar=no,location=no"
  );
}

/* Add event listener to search input element */
searchInput.addEventListener("input", (e) => createSearch(e.target.value));

/* Search Function */
function createSearch(searchTerm) {
  let term = searchTerm;
  searchFocus = true;
  searchText.classList.add("enabled");
  const entries = document.querySelectorAll(".renderedEntry");
  searchArray.push(Array.from(entries));
  for (let i = 0; i < searchArray[0].length; i++) {
    // console.log(`Search array: ${searchArray[0][i].innerText}`);
    if (
      searchArray[0][i].innerText.toLowerCase().includes(term.toLowerCase())
    ) {
      console.log(`Search match found: ${searchArray[0][i].innerText}`);
      console.log(currState);
      setTimeout(function () {
        searchArray[0][i].classList.remove("hide");
      }, 250);
      // divLogs.innerHTML = currState;
    } else {
      searchArray[0][i].classList.add("hide");
    }
    setTimeout(function () {
      searchText.classList.remove("enabled");
    }, 500);
  }
}

// function filterData(searchTerm) {
//   renderedEntry.forEach();
// }

/* Clear LocalStorage */
// statusClear.addEventListener("click", function () {
//   consoleCounter++;
//   console.log(`[#${consoleCounter}] -- statusClear onClick event triggered`);
//   if (clearState === true) {
//     let alert = confirm(
//       "Continuing will delete all callbacks and refresh the page!\r\n\r\nThis might not be able to be undone!\r\n\r\nContinue?"
//     );
//     if (alert) {
//       let alert2 = confirm("Are you sure?");
//       if (alert2) {
//         localStorage.removeItem("Entry");
//         location.reload();
//         onLoad();
//       }
//     }
//   }
// });

/* Form interaction */
formInteract.forEach(function (element) {
  const faChevronDown = `<i class="fa-solid fa-chevron-down fa-2xl"></i>`;
  const faChevronUp = `<i class="fa-solid fa-chevron-up fa-2xl"></i>`;
  const showForm = `<span class="normal" id="interact-text">Show Form</span>`;
  const hideForm = `<span class="normal" id="interact-text">Hide Form</span>`;
  const children = document.querySelector(".form-interact").childNodes;
  console.log(children);
  element.addEventListener("click", function (e) {
    const styles = e.currentTarget.classList;
    if (styles.contains("interact-form")) {
      form.classList.toggle("hidden");
      if (form.classList.contains("hidden")) {
        console.log(this.innerHTML);
        e.currentTarget.innerHTML = faChevronUp + showForm;
        setTimeout(function () {
          form.style.display = "none";
        }, 1000);
      } else {
        console.log(this.innerHTML);
        e.currentTarget.innerHTML = faChevronDown + hideForm;
        setTimeout(function () {
          form.style.display = "initial";
        }, 1000);
      }
    }
  });
});

/* Entry Handler */
function liHandler(liEl) {
  const li = liEl.classList;
  if (li.contains("view")) {
    const lihtml = liEl.parentElement.parentElement.innerHTML;
    const box = document.createElement("div");
    const bg = document.createElement("div");
    box.className = "window";
    bg.className = "bg";
    box.innerHTML = lihtml;
    document.body.appendChild(bg);
    bg.appendChild(box);
    document.body.classList.add("oflow");
    window.scrollTo(0, 0);
    windowEl = document.querySelector(".window");
    windowDisplay = true;
    getViewWindow(windowEl);
  } else {
    consoleCounter++;
    console.log(`[#${consoleCounter}] -- liHandler function called`);
    console.log(this);
    divLogsChildren = divLogs.childElementCount;
    if (delState === true && highlightState === false) {
      liEl.classList.add("puff-out-center");
      setTimeout(function () {
        liEl.remove();
      }, 500);
      divLogsChildren = divLogs.childElementCount;
      callbackText.textContent = divLogsChildren;
      delState = false;
      checkContents();
    } else if (delState === false && highlightState === true) {
      callbackText.textContent = divLogsChildren;
      liEl.classList.toggle("highlighted");
      highlightState = false;
      delState = false;
      checkContents();
    }
  }
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

function checkPriority() {
  const reasonLi = document.querySelectorAll(".priority");
  reasonLi.forEach(function (e) {
    const eChildren = e.childNodes[2];
    const text = eChildren.textContent.toLowerCase();
    console.log(eChildren);
    if (text == "high") {
      eChildren.classList.add("red");
      // lowerCase.style.color = "red";
      // lowerCase.style.fontWeight = "800";
    } else if (text == "normal") {
      eChildren.classList.add("blue");
    } else {
      eChildren.classList.add("green");
    }
  });
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

/* Process Form */
function processForm() {
  consoleCounter++;
  console.log(`[#${consoleCounter}] -- processForm function called`);
  /* Get values of form elements */
  let formPriority = document.getElementById("logpriority").value;
  let formReason = document.getElementById("reason").value;
  let formDateTimeNow = document.getElementById("datetime").value;
  let formDateTimeScheduled = document.getElementById("datescheduled").value;
  let formCustName = document.getElementById("custname").value;
  let formCustNum = document.getElementById("custnum").value;
  let formCC = document.getElementById("ccnumber").value;
  let formRef = document.getElementById("custref").value;
  let formLog = document.getElementById("loginfo").value;

  /* Push object to array */
  formArray.push({
    lognumber: countCallbacks(),
    priority: formPriority,
    reason: formReason,
    datenow: formDateTimeNow,
    datescheduled: formDateTimeScheduled,
    custname: formCustName,
    custnum: formCustNum,
    ccnumber: formCC,
    custref: formRef,
    log: formLog,
    state: "active",
    checkday: today,
  });

  /* Check if entry is high priority */
  if (formPriority.toLowerCase() == "high") {
    highPriority.push({
      reason: formReason,
      datenow: formDateTimeNow,
      datescheduled: formDateTimeScheduled,
      custname: formCustName,
      custnum: formCustNum,
      ccnumber: formCC,
      custref: formRef,
      log: formLog,
    });
    localStorage.setItem("Priority Array", JSON.stringify(highPriority));
  }

  console.log(formArray);
  /* Clear values of all form items / reset */
  document.getElementById("logpriority").value = "";
  document.getElementById("reason").value = "";
  document.getElementById("datetime").value = "";
  document.getElementById("datescheduled").value = "";
  document.getElementById("custname").value = "";
  document.getElementById("ccnumber").value = "";
  document.getElementById("custref").value = "";
  document.getElementById("loginfo").value = "";

  /* Save to Local Storage */
  localStorage.setItem("Call Logs", JSON.stringify(formArray));

  /* Call renderForm */
  renderForm(formArray);
}

/* Add EventListener for onKeyPress to form */
textArea.addEventListener("click", function () {
  textArea.classList.toggle("active");
});

// window.addEventListener("keypress", function (e) {
//   consoleCounter++;
//   console.log(`[#${consoleCounter}] -- form onKeyPress event triggered`);
//   if (e.key == "Enter" && searchFocus === false) {
//     processForm();
//   }
// });

/* Render Form function */
function renderForm(form) {
  const callImg = `<i class="fa-solid fa-phone fa-3x" id="entry-img"></i>`;
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
                       ${callImg}
                       <h4 class="li-head">Call ${form[i].lognumber}</h4>
                       </div>
                       <div class="entry-item priority">
                       <span class="li-text">Priority:</span><span class="li-text text-main">${
                         form[i].priority
                       }</span>
                       </div>
                       <div class="entry-item reason">
                       <span class="li-text">Reason:</span><span class="li-text text-main">${
                         form[i].reason
                       }</span>
                       </div>
                       <div class="entry-item datenow">
                       <span class="li-text">Date & Time Now:</span><span class="li-text text-main">${
                         form[i].datenow
                       }</span>
                       </div>
                       <div class="entry-item datethen">
                       <span class="li-text">Date Scheduled:</span><span class="li-text text-main">${
                         form[i].datescheduled
                       }</span>
                       </div>
                       <div class="entry-item custname">
                       <span class="li-text">Customer Name:</span><span class="li-text text-main">${
                         form[i].custname
                       }</span>
                       </div>
                       <div class="entry-item ccnum">
                       <span class="li-text">CRM Number:</span><span class="li-text text-main">${
                         form[i].ccnumber
                       }</span>
                       </div>
                       <div class="entry-item orderef">
                       <span class="li-text">Order Ref:</span><span class="li-text text-main">${
                         form[i].custref
                       }</span>
                       </div>
                       <div class="entry-item notes">
                       <span class="li-text">Notes:</span><span class="li-text text-main">${
                         form[i].log
                       }</span>
                       </div>
                       <div class="render-btn-space">
                       <button class="btn btn-li btn-primary delete" onclick="liHandler(this)">Delete</button>
                       <button class="btn btn-li btn-outline view" onclick="liHandler(this)">View</button>
                       <button class="btn btn-li btn-outline highlight" onclick="liHandler(this)">Highlight</button>
                       </div>
                       </div>`;
  }
  divLogs.innerHTML = listItems;
  checkPriority();
  console.log(formDay);
  checkToday(today);
  let entryToast = new toast("Notification", "Entry added");
  entryToast.createToast();

  /* Get all buttons after rendering of entry */
  const renderedBtns = document.querySelectorAll(".btn");
  renderedBtns.forEach(function (btn) {
    /* After forEach loop, addEventListner to every button */
    btn.addEventListener("click", function (e) {
      const targetClassList = e.currentTarget.classList;
      if (targetClassList.contains("delete")) {
        console.log(this);
        delState = true;
        highlightState = false;
        checkContents();
      } else if (targetClassList.contains("highlight")) {
        console.log(this);
        delState = false;
        highlightState = true;
        checkContents();
      }
    });
  });
  formShowCallbacks();
  /* Scroll to bottom of log-area element */
  setTimeout(function () {
    window.scrollTo(0, divLogs.scrollHeight);
  }, 1250);
  // // logArea.scrollTop = logArea.scrollHeight;
  // checkContents();
  // Save current state of divLogs
  currState = divLogs.innerHTML;
}

function checkToday(day) {
  const isToday = new Date().toLocaleDateString("en-GB");
  if (isToday === day) {
    todayCount++;
    document.querySelector(".cards #today").textContent = todayCount;
  }
}

/* Time function */
// setInterval(function () {
//   let current = new Date();
//   const options = { hour: "numeric", minute: "numeric", hour12: true };
//   let date = current.toLocaleDateString("en-GB", options);
//   dateText.textContent = date;
// }, 1000);

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
  document.querySelector(".cards #high").textContent = highPriority.length;
}

/* Scroll Position Function & Timer */
setInterval(getScroll, 2500);

function getScroll() {
  currentPos = window.scrollY;
  console.log(currentPos);
  return currentPos;
}

function getViewWindow(win) {
  win.querySelector(".render-btn-space").remove();
  document.body.querySelector(".wrapper").classList.add("blur");
  console.log(win.parentElement);
  win.parentElement.addEventListener("click", function () {
    console.log(win);
    if (windowDisplay === true) {
      win.parentElement.remove();
      document.body.classList.remove("oflow");
      windowDisplay = false;
      document.body.querySelector(".wrapper").classList.remove("blur");
    }
  });
}

function toast(title, content) {
  this.title = title;
  this.content = content;

  /* Create new toast */
  this.createToast = function () {
    const toastEl = document.createElement("div");
    const toastText = `<span class="toast-head">${this.title}</span>
                       <span class="toast-text">${this.content}</span>
    `;
    toastEl.className = "toast";
    toastEl.innerHTML += toastText;
    document.querySelector("footer .toast-area").appendChild(toastEl);
    const allToasts = document.querySelectorAll(".toast");
    allToasts.forEach(function (toast) {
      toast.classList.add("fixed");
      toast.addEventListener("click", function (e) {
        const currClass = e.currentTarget.classList;
        currClass.add("pop");
        setTimeout(function () {
          currClass.remove();
        }, 5000);
      });
    });
  };
}
