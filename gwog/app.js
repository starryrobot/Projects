const value = document.getElementById("value");
const result = document.querySelector(".result-text");
const history = document.querySelector(".history-ul");
const local = JSON.parse(localStorage.getItem("gogw"));
const options = document.querySelector(".options-area");
const clear = document.getElementById("trash");
const customInput = document.getElementById("custom-input");
const customBtn = document.querySelector(".btn-custom");
let state = false;
let customSet = false;
let optionClass = "";
let optionValue = "";
let historyArray = [];
let dataAttribute = 0;

document.addEventListener("DOMContentLoaded", isLocal(local));
clear.addEventListener("click", clearContents);

function calculate(perc, price) {
  if (state === true) {
    let calc = (perc / 100) * price;
    let decimal = calc.toFixed(2);
    result.textContent = `£${decimal}`;
    historyArray.push({
      value: decimal,
      percent: perc,
      input: document.getElementById("value").value,
    });
    console.log(historyArray);
    localStorage.setItem("gogw", JSON.stringify(historyArray));
    addHistory(historyArray);
  } else {
    result.textContent = `Nothing to calculate`;
  }
}

function optionHandler(option) {
  optionClass = option;
  state = true;
  optionValue = value.value;
  dataAttribute = option.getAttribute("data-attribute");
  calculate(dataAttribute, optionValue);
}

function addHistory(arr) {
  let li = "";
  const liClass = "new-entry";
  for (let i = 0; i < arr.length; i++) {
    li += `<li class="${liClass}" entry="${arr.length}" choice="${optionValue}"><span class="li-emphasise">£${arr[i].value}</span> <span class="li-blue">Percent: ${arr[i].percent}%</span> Total: £${arr[i].input}</li>`;
    history.innerHTML = li;
  }
  history.scrollTop = history.scrollHeight;
}

function isLocal() {
  if (local) {
    historyArray = local;
    addHistory(local);
  } else {
    const text = `<i class="fa-solid fa-clock-rotate-left fa-2xl"></i> No history found`;
    const spanText = document.createElement("span");
    spanText.className = "history-span";
    spanText.style.display = "inline-block";
    spanText.style.marginTop = "2rem";
    spanText.style.textAlign = "center";
    spanText.innerHTML = text;
    history.appendChild(spanText);
  }
}

function clearContents() {
  const firstStep = confirm("Clear history?");
  let historyInner = history.innerHTML;
  let historyText = history.textContent;
  console.log(historyText);
  console.log(historyInner);
  if (firstStep) {
    history.innerHTML = `<i class="fa-solid fa-clock-rotate-left fa-2xl"></i> No history found`;
    history.back;
  }
  const secondStep = confirm("Clear completely?");
  if (secondStep) {
    localStorage.removeItem("gogw");
    window.location.reload();
  }
}

function custom(option) {
  const parent = option.parentElement;
  const inputValue = parent.querySelector(".value-custom").value;
  optionClass = option;
  state = true;
  optionValue = inputValue;
  calculate(optionValue, value.value);
}
