const value = document.getElementById("value");
const result = document.querySelector(".result-text");
const history = document.querySelector(".history-ul");
let state = false;
let optionClass = "";
let historyArray = [];

function calculate(num, value) {
  if (state === true) {
    let calc = (num / 100) * value;
    let decimal = calc.toFixed(2);
    result.textContent = `£${decimal}`;
    historyArray.push({
      value: decimal,
    });
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
  calculate(dataAttribute, optionValue);
}

function addHistory(arr) {
  let li = "";
  const newLiEl = document.createElement("li");
  newLiEl.className = "new-entry";
  for (let i = 0; i < arr.length; i++) {
    li = `£${arr[i].value}`;
    newLiEl.textContent = li;
    history.appendChild(newLiEl);
  }
}
