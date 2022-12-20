const value = document.getElementById("value");
const fuel = document.getElementById("fuel");
const food = document.getElementById("food");
const result = document.querySelector(".result-text");
const history = document.querySelector(".history-ul");
const wrapper = document.querySelector(".wrapper");
const hasLocal = JSON.parse(localStorage.getItem("entry"));
const clearHistory = document.getElementById("clear-history");
let date = "";
let clearState = false;
let state = false;
let optionClass = "";
let historyArray = [];

window.addEventListener("DOMContentLoaded", onLoad);

clearHistory.addEventListener("click", clear);

function onLoad() {
  if (hasLocal) {
    historyArray = hasLocal;
    localStorage.setItem("entry", JSON.stringify(hasLocal));
    addHistory(hasLocal);
  } else {
    console.log("None");
  }
}

function clear() {
  let attention = confirm(
    "Are you sure you want to clear history?\r\n\r\nThis cannot be undone!"
  );
  if (attention) {
    if (clearState === false) {
      localStorage.clear("entry");
      history.innerHTML = "";
    } else {
      alert("Nothing to clear");
      console.log("Already cleared");
    }
  }
}

function calculate(num, value) {
  let decimal = 0;
  let type = "";
  let input = num;
  if (state === true) {
    if (value == "fuel") {
      console.log("Fuel chosen");
      type = value;
      let calc = (num / 100) * 25;
      decimal = calc.toFixed(2);
      result.textContent = `£${decimal}`;
    } else {
      console.log("Food chosen");
      type = value;
      let calc = (num / 100) * 35;
      decimal = calc.toFixed(2);
      result.textContent = `£${decimal}`;
    }
    historyArray.push({
      value: decimal,
      type: type,
      input: input,
    });
    localStorage.setItem("entry", JSON.stringify(historyArray));
    addHistory(historyArray);
  } else {
    result.textContent = `Nothing to calculate`;
  }
}

function optionHandler(option) {
  optionClass = option;
  state = true;
  const optionValue = value.value;
  const dataAttribute = option.getAttribute("data-attribute");
  // if (dataAttribute === "food") {
  //   selectionValue = food.value;
  // } else {
  //   selectionValue = fuel.value;
  // }
  calculate(optionValue, dataAttribute);
}

function addHistory(arr) {
  let li = "";
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].type == "fuel") {
      li += `<li class="new-entry">${
        arr[i].type.charAt(0).toUpperCase() + arr[i].type.slice(1)
      } value is <b>£${arr[i].value}</b> for ${
        arr[i].input
      } miles - <small>${date}</small></li>`;
    } else {
      li += `<li class="new-entry">${
        arr[i].type.charAt(0).toUpperCase() + arr[i].type.slice(1)
      } value is <b>£${arr[i].value}</b> for ${
        arr[i].input
      } liters - <small>${date}</small></li>`;
    }
    history.innerHTML = li;
    wrapper.scrollIntoView({ block: "end" });
  }
}

function getTimeDate() {
  let current = new Date();
  const options = { hour: "numeric", minute: "numeric", hour12: true };
  date = current.toLocaleDateString("en-GB", options);
}
