const ulEl = document.querySelector(".logs");
const submitBtn = document.querySelector(".btn-save");
let form = document.querySelector("form");
const dateText = document.getElementById("date");
const fromLocal = JSON.parse(localStorage.getItem("Entry"));
const statusLocal = document.getElementById("status-local");
const statusClear = document.getElementById("status-clear");
const callbackText = document.getElementById("callbacks");
const formInteract = document.querySelectorAll(".form-interact");
const interactText = document.getElementById("interact-text");
let formArray = [];
let ulHeight = 0;
let callbackCounter = 0;
let formEnabled = false;
let interactState = false;
let clearState = false;

/* Add DOMContentLoaded to load from Local Storage */

window.addEventListener("DOMContentLoaded", onLoad);

function onLoad() {
  if (fromLocal) {
    console.log(fromLocal);
    formArray = fromLocal;
    statusLocal.innerHTML = `Loaded from Local Storage <i class="fa-solid fa-check" style="color:#019c01";></i>`;
    callbackText.textContent = formArray.length;
    renderForm(fromLocal);
  } else {
    console.log("Not found");
    statusLocal.innerHTML = `Loaded from Local Storage <i class="fa-solid fa-xmark" style="color:#a70505";></i></i>`;
  }
}

/* Clear LocalStorage */
statusClear.addEventListener("click", function () {
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
});

/* Form interaction */

formInteract.forEach(function (element) {
  const faChevronDown = `<i class="fa-solid fa-chevron-down fa-2xl"></i>`;
  const faChevronUp = `<i class="fa-solid fa-chevron-up fa-2xl"></i>`;
  const showForm = `<span class="normal" id="interact-text">Show Form</span>`;
  const hideForm = `<span class="normal" id="interact-text">Hide Form</span>`;
  element.addEventListener("click", function (e) {
    const styles = e.currentTarget.classList;
    if (styles.contains("interact-form")) {
      form.classList.toggle("hidden");
      if (form.classList.contains("hidden")) {
        console.log(this.innerHTML);
        this.innerHTML = faChevronUp + showForm;
        setTimeout(function () {
          form.style.display = "none";
        }, 1000);
      } else {
        console.log(this.innerHTML);
        this.innerHTML = faChevronDown + hideForm;
        setTimeout(function () {
          form.style.display = "initial";
        }, 1000);
      }
    } else if (styles.contains("interact-stats")) {
    }
  });
});

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
  let returnedCount = formArray.length + 1;
  return returnedCount;
}
