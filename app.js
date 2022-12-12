const ulEl = document.querySelector(".logs");
const submitBtn = document.querySelector(".btn-save");
let form = document.querySelector("form");
let formPriority = document.getElementById("logpriority").value;
let formDateTimeNow = document.getElementById("datetime").value;
let formDateTimeScheduled = document.getElementById("datescheduled").value;
let formCustName = document.getElementById("custname").value;
let formLog = document.getElementById("loginfo").value;
let logArea = document.querySelector(".log-area");
const dateText = document.getElementById("date");
const timeText = document.getElementById("time");
const fromLocal = JSON.parse(localStorage.getItem("Entry"));
const statusLocal = document.getElementById("status-local");
let formArray = [];
let ulHeight = 0;

/* Add DOMContentLoaded to load from Local Storage */

window.addEventListener("DOMContentLoaded", function () {
  if (fromLocal) {
    console.log(fromLocal);
    formArray = fromLocal;
    statusLocal.innerHTML = `<i class="fa-solid fa-hard-drive" title="Local Storage found"></i>`;
    renderForm(fromLocal);
  } else {
    console.log("Not found");
  }
});

/* Add EventListener to form */

form.addEventListener("submit", function (e) {
  localStorage.setItem("Entry", JSON.stringify(fromLocal));
  formPriority = document.getElementById("logpriority").value;
  formDateTimeNow = document.getElementById("datetime").value;
  formDateTimeScheduled = document.getElementById("datescheduled").value;
  formCustName = document.getElementById("custname").value;
  formLog = document.getElementById("loginfo").value;
  formArray.push({
    priority: formPriority,
    datenow: formDateTimeNow,
    datescheduled: formDateTimeScheduled,
    custname: formCustName,
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
                       <li><span class="li-text"><b>Priority:</b> ${form[i].priority}</span><br>
                       <span class="li-text"><b>Date & Time Now:</b> ${form[i].datenow}</span><br>
                       <span class="li-text"><b>Date Scheduled:</b> ${form[i].datescheduled}</span><br>
                       <span class="li-text"><b>Customer Name:</b> ${form[i].custname}</span><br>
                       <span class="li-text"><b>Log:</b> ${form[i].log}</span></li>`;
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
