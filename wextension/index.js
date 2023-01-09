let pages = [
  {
    pageno: 1,
    title: "main",
    content: `<h2 class="sub-header main-sub" id="main-sub">New</h2>
  <section class="new">
    <div class="section-area">
      <div class="sa-item item-new" onclick="action(this)">
        <img
          class="sa-img"
          src="clarity_edit-line.svg"
          alt="clarity_edit-line"
        />
        <h3 class="item-header" id="item-head">Note</h3>
        <span class="item-desc" id="item-desc">Make a note</span>
      </div>
    </div>
  </section>`,
  },
  {
    pageno: 2,
    title: "notes",
    content: `<h2 class="sub-header main-sub" id="main-sub">Notes</h2>
  <section class="note-list" id="notelist">
  <div class="section-area">

  </div>


  </section>
  <section class="note-list-completed" id="notelistcompleted">
  <h2 class="sub-header secondary-sub"></h2>
  <div class="section-area section-done">
  </div>
</section>
  `,
  },
];
let notes = [];
let lastpage = "";
let pIndex = 0;
let state = "";
let optionState = false;
let modalEventStatus = false;
let loaded = false;
let set = false;
const hasLocal = JSON.parse(localStorage.getItem("notes"));

window.addEventListener("DOMContentLoaded", onLoad);

function onLoad() {
  console.log("onLoad called");
  state = "load";
  let start = "";
  let index = 0;
  const appEl = document.querySelector("main");
  let eClass = "";
  for (let i = 0; i < pages.length; i++) {
    start = pages.find((pages) => pages[i] === "main");
    index = pages.findIndex((pages) => pages[i] === start);
    appEl.innerHTML = pages[index].content;
    appEl.setAttribute("page", pages[index].title);
    lastpage = pages[index].title;
  }

  const links = document.querySelectorAll(".link");
  links.forEach(function (l) {
    l.removeAttribute("id");
    l.addEventListener("click", function (e) {
      eClass = e.currentTarget.classList;
      console.log(eClass);
      if (!eClass.contains("link-n")) {
        const idState = e.currentTarget.getAttribute("id");
        optionState = false;
        findPage(eClass[1]);
      } else {
        optionState = true;
        optionHandler(eClass[2]);
      }
    });
  });
  if (hasLocal) {
    notes = hasLocal;
    findPage("notes");
    set = true;
    renderNote(hasLocal);
  }
}

function findPage(c) {
  let pageToIndex = 0;
  pageToIndex = pages.findIndex((pages) => pages.title === c);
  console.log(pageToIndex, c);
  pageHandler(pageToIndex, c);
}

function optionHandler(opt) {
  const optionClassList = document.querySelector("." + opt).classList;
  console.log(optionClassList);
  if (optionClassList.contains("search")) {
    console.log("search");
  } else if (optionClassList.contains("note")) {
    console.log("note");
  } else {
    console.log("settings");
  }
}

function pageHandler(ind, c) {
  /* ind = index number */
  /* c = class */
  pIndex = ind;
  const pageAttr = document.querySelector("main").getAttribute("page");
  const findPage = pages.find((pages) => pages.title === pageAttr);
  const appEl = document.querySelector("main");
  console.log(pageAttr, findPage, pIndex, c);
  if (findPage) {
    console.log("setting page");
    appEl.innerHTML = pages[pIndex].content;
    appEl.setAttribute("page", c);
  }
}

function linkHandler(link) {
  let start = "";
  let index = 0;
  const appEl = document.querySelector("main");
  const linkClass = link.classList;
  console.log(link.classList);
  if (linkClass.contains("main")) {
    start = pages.find((pages) => pages.title === "main");
    index = pages.findIndex((pages) => pages === start);
    if (start) {
      appEl.innerHTML = pages[index].content;
    }
  }
}

function action(event) {
  const modal = document.querySelector(".menu-bg");
  const submitBtn = document.getElementById("submit");
  modal.classList.toggle("hidden");
  if (!modal.classList.contains("hidden")) {
    console.log("does not contain hidden");
    if (!modalEventStatus) {
      console.log("no event listener");
      submitBtn.addEventListener("click", submitNote);
    } else {
      modalEventStatus = false;
    }
  }
}

function submitNote() {
  const modal = document.querySelector(".menu-bg");
  const notetext = document.getElementById("notetext").value;
  const notetitle = document.getElementById("notetitle").value;
  modalEventStatus = true;
  modal.classList.toggle("hidden");

  notes.push({
    title: notetitle,
    note: notetext,
  });
  localStorage.setItem("notes", JSON.stringify(notes));
  findPage("notes");
  renderNote(notes);
}

function renderNote(notes) {
  const renderArea = document.querySelector(".section-area");
  let newContent = "";
  for (let i = 0; i < notes.length; i++) {
    newContent += `<div class="note-item">
    <h3 class="note-head">${notes[i].title}</h3>
    <p class="note-para">
      ${notes[i].note}
    </p>
    <div class="note-btns">
      <button class="btn note-btn btn-done" title="Done">
        <img src="clarity_check-line.svg" alt="clarity_check-line" />
      </button>
      <button class="btn note-btn btn-top" title="Send to top">
        <img src="clarity_arrow-line.svg" alt="clarity_arrow-line" />
      </button>
      <button class="btn note-btn btn-edit" title="Edit">
        <img src="clarity_edit-line.svg" alt="clarity_edit-line" />
      </button>
    </div>
    <span class="note-bg" id="itembgtext">${notes[i].title}</span>
  </div>
    `;
  }
  renderArea.innerHTML = newContent;
  document
    .querySelector(".link.notes")
    .setAttribute("onclick", "loadNotes(notes)");
  set = true;
}

function loadNotes(src) {
  const renderArea = document.querySelector(".section-area");
  let newContent = "";
  if (set) {
    for (let i = 0; i < src.length; i++) {
      newContent += `<div class="note-item">
    <h3 class="note-head">${src[i].title}</h3>
    <p class="note-para">
      ${src[i].note}
    </p>
    <div class="note-btns">
      <button class="btn note-btn btn-done" title="Done">
        <img src="clarity_check-line.svg" alt="clarity_check-line" />
      </button>
      <button class="btn note-btn btn-top" title="Send to top">
        <img src="clarity_arrow-line.svg" alt="clarity_arrow-line" />
      </button>
      <button class="btn note-btn btn-edit" title="Edit">
        <img src="clarity_edit-line.svg" alt="clarity_edit-line" />
      </button>
    </div>
    <span class="note-bg" id="itembgtext">${src[i].title}</span>
  </div>
    `;
    }
    renderArea.innerHTML = newContent;
  }
}
