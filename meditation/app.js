let btnGo = document.getElementById("go");
let app = document.querySelector("main .app");
let beginBtn = document.getElementById("begin");
let timerText = document.querySelector(".timer-text");
let startingTitle = "";
let appArray = [
  {
    name: "intro",
    title: "Meditation",
    content: `<main class="app">
    <section class="timer">
    <header class="header">
    <h1 class="heading">Meditation</h1>
    <article class="meditate">
    <button class="btn btn-primary btn-go" id="go">I'm here now</button>
    </article>
    </header>
    </section>
    </main>
    <footer>
    </footer>
    `,
  },
  {
    name: "choice",
    title: "Choice",
    content: `<main class="app">
    <section class="timer">
    <div class="feature">
    <div class="bells">
      <h1 class="heading">Bells</h1>
      <button
        class="btn btn-primary btn-rounded bell-1"
        onclick="bells(this)"
      >
        1
      </button>
      <button
        class="btn btn-primary btn-rounded bell-2"
        onclick="bells(this)"
      >
        2
      </button>
      <button
        class="btn btn-primary btn-rounded bell-3"
        onclick="bells(this)"
      >
        3
      </button>
    </div>
    <div class="duration">
      <input type="number" class="time" id="dur" placeholder="Duration (in minutes)" />
      <input
        type="number"
        class="time"
        id="int"
        placeholder="Intervals (in minutes)"
      />
    </div>
    <button class="btn btn-outline" id="begin">Begin</button>
  </div>
    </section>
    </main>
    `,
  },
  {
    name: "timer",
    content: `<main class="app">
    <section class="timer">
    <span class="timer-text timer-hidden"></span>
  </section>
  </main>`,
  },
  {
    name: "finish",
    content: `<h1>Finish</h1>`,
  },
];
let bellArray = [];
let chosenBell = "";
let time = 0;
let ready = 0;
let nIndex = 0;
let bellIndex = 0;
let bellObj = [];
let state = false;
let currentContent = "";
let navTo = "";
let end = false;

window.addEventListener("DOMContentLoaded", load);

function load() {
  console.log("load");
  document.body.classList.add("bg");
  let index = 0;
  let start = "";
  const body = document.body;
  for (let i = 0; i < appArray.length; i++) {
    /* Get intro object */
    start = appArray.find((appArray) => appArray[i] === "intro");
    /* Get index of intro object */
    index = appArray.findIndex((appArray) => appArray[i] === start);
    /* Set innerHTML of body to intro object content property */
    body.innerHTML = appArray[index].content;
    navTo = appArray[index].title;
    startingTitle = appArray[0].title;
  }
  document
    .querySelector(".app")
    .setAttribute("component", appArray[index].name);
  btnGo = document.getElementById("go");
  btnGo.addEventListener("click", function () {
    startApp();
  });
}

function navigate(ind) {
  console.log("navigation");
  const appEl = document.querySelector(".app");
  nIndex = ind;
  console.log(nIndex);
  const currComp = appEl.getAttribute("component");
  console.log(currComp);
  const findIndex = appArray.find((appArray) => appArray.name == currComp);
  console.log(findIndex);
  if (nIndex < appArray.length) {
    console.log(nIndex);
    appEl.innerHTML = appArray[nIndex].content;
  } else {
    nIndex--;
    appEl.innerHTML = appArray[nIndex].content;
  }
}

function startApp() {
  console.info("start");
  nIndex++;
  document
    .querySelector(".app")
    .setAttribute("component", appArray[nIndex].name);
  navigate(nIndex);
  const bellBtn = document.querySelectorAll(".bells .btn");
  console.log(bellBtn);
  console.log("start called");
  // btnGo.textContent = "Take a few breaths";
  // document.querySelector(".app").classList.add("circles");
  // setInterval(function () {
  //   document.querySelector(".feature").classList.add("here");
  //   document.querySelector(".meditate").classList.add("gone");
  //   document.querySelector(".heading").classList.add("tr-y-up");
  // }, 10000);
  console.log("for loop");
  for (let i = 0; i < bellBtn.length; i++) {
    console.log("for loop");
    bellArray.push({
      bell: bellBtn[i].classList[3],
      mp3: bellBtn[i].classList[3] + ".mp3",
    });
    console.log(bellArray[i].bell);
  }
  choices();
}

function choices() {
  console.log("choices function called");
  beginBtn = document.getElementById("begin");
  timerText = document.querySelector(".timer-text");
  beginBtn.addEventListener("click", function (e) {
    console.log(e);
    /* Get minutes and intervals */
    const startingMinutes = document.getElementById("dur").value;
    const startingInterval = document.getElementById("int").value;
    /* Minutes into seconds */
    time = startingMinutes * 60;
    /* Minutes into milliseconds for setInterval timeout */
    ready = Math.floor(startingInterval * 60 * 1000);
    ready = ready < 60000 ? 60000 : ready;
    timerComponent();
  });
}

function timerComponent() {
  document.body.classList.remove("bg");
  document.body.classList.add("timer-dull");
  timerText = document.querySelector(".timer-text");
  nIndex++;
  document
    .querySelector(".app")
    .setAttribute("component", appArray[nIndex].name);
  navigate(nIndex);
  if (!state) {
    timerText.textContent = "No bell chosen";
  } else {
    setInterval(updateTimer, 1000);
    setInterval(intervals, ready);
  }
}

function bells(bell) {
  console.log("bells");
  const bellClass = bell.classList[3];
  if (bellArray.find((bellArray) => bellArray.bell === bellClass)) {
    /* Set state */
    state = true;
    /* Assign current bell to global variable chosenBell */
    chosenBell = bellClass;
    /* Find index of bell */
    bellIndex = bellArray.findIndex(
      (bellArray) => bellArray.bell === bellClass
    );
    /* Create new Audio object with chosen bell */
    bellObj = new Audio(bellArray[bellIndex].mp3);
    console.log(bellObj);
    /* Play chosen bell */
    bellObj.play();
  }
}

function updateTimer() {
  if (!end) {
    timerText = document.querySelector(".timer-text");
    const minutes = Math.floor(time / 60);
    let seconds = time % 60;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    timerText.textContent = `${minutes}: ${seconds}`;
    time--;
    if (time <= 0) {
      endBell();
    }
  }
}

function endBell() {
  if (!end) {
    end = true;
    console.log("end bell");
    ending = new Audio("bell-1-long.mp3");
    ending.play();
    setTimeout(function () {
      navigate(0);
      document.body.classList.add("bg");
    }, 10000);
  }
}

function intervals() {
  if (!end) {
    bellObj.play();
  }
}
