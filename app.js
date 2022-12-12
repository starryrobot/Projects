const ulEl = document.querySelector(".logs");
const submitBtn = document.querySelector(".btn-save");
let form = document.querySelector("form");
const dateText = document.getElementById("date");
const fromLocal = JSON.parse(localStorage.getItem("Entry"));
const statusLocal = document.getElementById("status-local");
const callbackText = document.getElementById("callbacks");
let formArray = [];
let ulHeight = 0;
let callbackCounter = 0;
let formEnabled = false;

/* Add DOMContentLoaded to load from Local Storage */

window.addEventListener("DOMContentLoaded", function () {
  if (fromLocal) {
    console.log(fromLocal);
    formArray = fromLocal;
    statusLocal.innerHTML = `<i class="fa-solid fa-hard-drive" title="Local Storage found"></i>`;
    callbackText.textContent = formArray.length;
    renderForm(fromLocal);
  } else {
    console.log("Not found");
  }
});

/* Add EventListener to form */

form.addEventListener("submit", function (e) {
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
  /* Prevent refresh */
  e.preventDefault();
});

/* Process Form function */

/* Render Form function */

function renderForm(form) {
  let listItems = "";
  for (let i = 0; i < form.length; i++) {
    console.log(form[i]);
    listItems += `
                       <li>
                       <h4 class="li-head">Callback # ${form[i].lognumber}</h4>
                       <span class="li-text"><b>Priority:</b> ${form[i].priority}</span><br>
                       <span class="li-text"><b>Date & Time Now:</b> ${form[i].datenow}</span><br>
                       <span class="li-text"><b>Date Scheduled:</b> ${form[i].datescheduled}</span><br>
                       <span class="li-text"><b>Customer Name:</b> ${form[i].custname}</span><br>
                       <span class="li-text"><b>CC Number:</b> ${form[i].ccnumber}</span><br>
                       <span class="li-text"><b>Order Ref:</b> ${form[i].custref}</span><br>
                       <span class="li-text"><b>Log:</b> ${form[i].log}</span>
                       </li>`;
  }
  ulEl.innerHTML = listItems;
  /* Scroll to bottom of log-area element */
  logArea.scrollTop = logArea.scrollHeight;
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
  let returnedCount = formArray.length + 1;
  return returnedCount;
}
