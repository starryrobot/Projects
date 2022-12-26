const callbackText = document.getElementById("callbacks");
const formInteract = document.querySelectorAll(".form-interact");
const interactText = document.getElementById("interact-text");
const interactForm = document.querySelector(".interact-form");
const textArea = document.querySelector("textarea");
const submitBtn = document.querySelector(".btn-save");
let form = document.querySelector("form");
const dateText = document.getElementById("date");

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
    ccnumber: formCC,
    custref: formRef,
    log: formLog,
    state: "active",
    checkday: today,
  });

  if (formPriority.toLowerCase() == "high") {
    highPriority.push({
      reason: formReason,
      datenow: formDateTimeNow,
      datescheduled: formDateTimeScheduled,
      custname: formCustName,
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
                         <div class="entry-item priority">
                         <span class="li-text"><b>Priority:</b></span><span class="li-text text-main">${
                           form[i].priority
                         }</span>
                         </div>
                         <div class="entry-item reason">
                         <span class="li-text"><b>Reason:</b></span><span class="li-text text-main">${
                           form[i].reason
                         }</span>
                         </div>
                         <div class="entry-item datenow">
                         <span class="li-text"><b>Date & Time Now:</b></span><span class="li-text text-main">${
                           form[i].datenow
                         }</span>
                         </div>
                         <div class="entry-item datethen">
                         <span class="li-text"><b>Date Scheduled:</b></span><span class="li-text text-main">${
                           form[i].datescheduled
                         }</span>
                         </div>
                         <div class="entry-item custname">
                         <span class="li-text"><b>Customer Name:</b></span><span class="li-text text-main">${
                           form[i].custname
                         }</span>
                         </div>
                         <div class="entry-item ccnum">
                         <span class="li-text"><b>CRM Number:</b></span><span class="li-text text-main">${
                           form[i].ccnumber
                         }</span>
                         </div>
                         <div class="entry-item orderef">
                         <span class="li-text"><b>Order Ref:</b></span><span class="li-text text-main">${
                           form[i].custref
                         }</span>
                         </div>
                         <div class="entry-item notes">
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
  checkPriority();
  console.log(formDay);
  checkToday(today);
  const renderedBtns = document.querySelectorAll(".btn");
  renderedBtns.forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      const targetClassList = e.currentTarget.classList;
      if (targetClassList.contains("delete")) {
        console.log(this);
        delState = true;
        highlightState = false;
        checkContents();
      } else {
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
