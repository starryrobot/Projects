// let btnGo = document.getElementById("go");
// let app = document.querySelector("main .app");
// let beginBtn = document.getElementById("begin");
// let timerText = document.querySelector(".timer-text");
let startingTitle = "";
/* appArray for navigating app */
let appArray = [
  {
    name: "intro",
    title: "Meditation",
    content: `<main class="app">
    <section class="timer">
    <header class="header">
    <h1 class="heading entry-ts">Meditation</h1>
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
/* Array for storing bells */
let bellArray = [];
/* Bell chosen by user */
let chosenBell = "";
/* Length of meditation inputted by user */
let time = 0;
/* Minutes into milliseconds variable for bell interval function */
let ready = 0;
/* Index of current page/component */
let nIndex = 0;
/* Index of current chosen bell */
let bellIndex = 0;
/* Array for storing bells */
let bellObj = [];
/* Boolean for determining if user has chosen bell (therefore can continue to next step, or not) */
let state = false;
let currentContent = "";
/* Current title of page/component object * (used to determine what page user is on) */
let navTo = "";
/* Boolean for determining if meditation has ended (to stop further ringing of bells etc!) */
let end = false;

window.addEventListener("DOMContentLoaded", load);

function load() {
  console.log("load");
  /* Add nice background image to body element on startup */
  document.body.classList.add("bg");
  /* Assign string value to start variable for determining existence of first page/component to load in */
  let start = "";
  /* Assign number value to index variable for determining position of first page/component to load in */
  let index = 0;
  /* Get body element from document */
  const body = document.body;
  /* Loop through all objects in array */
  for (let i = 0; i < appArray.length; i++) {
    /* Get intro object */
    start = appArray.find((appArray) => appArray[i] === "intro");
    /* Get index of intro object */
    index = appArray.findIndex((appArray) => appArray[i] === start);
    /* Set innerHTML of body to intro object content property (property that contains all of the page to load in) */
    body.innerHTML = appArray[index].content;
    /* Assign string value to navTo of current title of page/component */
    navTo = appArray[index].title;
    /* Assign string value to startingTitle */
    startingTitle = appArray[0].title;
  }
  /* Set data attribute of main.app to current page/component name */
  document
    .querySelector(".app")
    .setAttribute("component", appArray[index].name);
  /* Assign go button element to variable btnGo */
  btnGo = document.getElementById("go");
  /* Add an event listener to go button and invoke startApp when click event is triggered */
  btnGo.addEventListener("click", function () {
    startApp();
  });
}

function navigate(ind) {
  console.log("navigation");
  /* Assign main.app element to variable appEl */
  const appEl = document.querySelector(".app");
  /* Assign function parameter to nIndex */
  nIndex = ind;
  console.log(nIndex);
  /* Get current data attribute of main.app element */
  const currComp = appEl.getAttribute("component");
  console.log(currComp);
  /* Match current data attribute to position in corresponding appArray and return index */
  const findIndex = appArray.find((appArray) => appArray.name == currComp);
  console.log(findIndex);
  /* Make sure nIndex remains within length of appArray */
  if (nIndex < appArray.length) {
    console.log(nIndex);
    /* Replace main.app HTML with page/component HTML in matched object */
    appEl.innerHTML = appArray[nIndex].content;
  } else {
    /* Bring nIndex within range of appArray length */
    nIndex--;
    /* Replace main.app HTML with page/component HTML in starting object (intro - this brings user back to start) */
    appEl.innerHTML = appArray[0].content;
  }
}

function startApp() {
  console.info("start");
  /* Increment nIndex */
  nIndex++;
  /* Set data attribute of main.app to current page/component name */
  document
    .querySelector(".app")
    .setAttribute("component", appArray[nIndex].name);
  /* Invoke navigate function */
  navigate(nIndex);
  /* Get NodeList of all bells ready for looping */
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
  for (let i = 0; i < bellBtn.length; i++) {
    /* Add bell object to bellArray */
    bellArray.push({
      /* Name of bell */
      bell: bellBtn[i].classList[3],
      /* File name of bell */
      mp3: bellBtn[i].classList[3] + ".mp3",
    });
    console.log(bellArray[i].bell);
  }
  /* Invoke choices function */
  choices();
}

function choices() {
  console.log("choices function called");
  /* Get begin button and store in variable beginBtn */
  beginBtn = document.getElementById("begin");
  /* Add event listener to begin button and invoke function on click event */
  beginBtn.addEventListener("click", function (e) {
    console.log(e);
    /* Get minutes and intervals */
    const startingMinutes = document.getElementById("dur").value;
    const startingInterval = document.getElementById("int").value;
    /* Minutes into seconds */
    time = startingMinutes * 60;
    /* Minutes into milliseconds for setInterval timeout */
    ready = Math.floor(startingInterval * 60 * 1000);
    /* Make sure chosen interval time cannot go lower than 1 minute */
    ready = ready < 60000 ? 60000 : ready;
    /* Invoke timerComponent function */
    timerComponent();
  });
}

function timerComponent() {
  /* Remove fancy background to minimize user distractions */
  document.body.classList.remove("bg");
  /* Add class for 'dulling/darkening' the screen */
  document.body.classList.add("timer-dull");
  /* Get span element of timer-text and store in variable timerText */
  const timerText = document.querySelector(".timer-text");
  /* Increment nIndex */
  nIndex++;
  /* Set data attribute of main.app to current page/component name */
  document
    .querySelector(".app")
    .setAttribute("component", appArray[nIndex].name);
  /* Invoke navigate function with nIndex as parameter */
  navigate(nIndex);
  /* If no bell has been chosen, let the user know */
  if (!state) {
    timerText.textContent = "No bell chosen";
  } else {
    /* Otherwise, begin meditation! */
    setInterval(updateTimer, 1000);
    setInterval(intervals, ready);
  }
}

function bells(bell) {
  console.log("bells");
  /* Assign classList with index of 3 (the class we want to use) to BellClass variable */
  const bellClass = bell.classList[3];
  /* If classList matches an object in bellArray with property of bell... */
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
  /* If meditation hasn't finished... */
  if (!end) {
    /* Assign timer-text element to timerText variable */
    const timerText = document.querySelector(".timer-text");
    /* Floor minutes */
    const minutes = Math.floor(time / 60);
    let seconds = time % 60;
    /* If seconds are less than 10, remove 0 */
    seconds = seconds < 10 ? "0" + seconds : seconds;
    /* Add text to timerText with current minutes/seconds */
    timerText.textContent = `${minutes}: ${seconds}`;
    /* Decrement timer */
    time--;
    /* If timer is equal or less than 0, ring ending bell */
    if (time <= 0) {
      endBell();
    }
  }
}

function endBell() {
  /* If meditation has not finished... */
  if (!end) {
    /* ...it has now! */
    end = true;
    console.log("end bell");
    /* Create audio object from chosen bell (using long variation of chosen bell) */
    ending = new Audio("bell-1-long.mp3");
    /* Play audio object (long bells) */
    ending.play();
    /* Wait 10 seconds before returning user to start */
    setTimeout(function () {
      /* Navigate to object with index 0 of appArray (the start) */
      navigate(0);
      /* Add fancy background again now meditation is over */
      document.body.classList.add("bg");
    }, 10000);
  }
}

function intervals() {
  /* If meditation has not finished... */
  if (!end) {
    /* ...keep the interval bells going! */
    bellObj.play();
  }
}
