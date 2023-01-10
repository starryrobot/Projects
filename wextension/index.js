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
let notesDone = [];
let lastpage = "";
let pIndex = 0;
let state = "";
let optionState = false;
let modalEventStatus = false;
let loaded = false;
let set = false;
let formDirection = "";
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
  const cancelBtn = document.getElementById("cancel");
  modal.classList.toggle("hidden");
  if (!modal.classList.contains("hidden")) {
    console.log("does not contain hidden");
    if (!modalEventStatus) {
      modalEventStatus = true;
      console.log("no event listener");
      submitBtn.addEventListener("click", gatherForm);
      cancelBtn.addEventListener("click", function (e) {
        modal.classList.toggle("hidden");
        if (modal.classList.contains("hidden")) {
          formDirection = "cancel";
          gatherForm(formDirection);
        }
      });
    }
  }
}

/* Gather form information */
function gatherForm(fd) {
  const notetext = document.getElementById("notetext");
  const notetitle = document.getElementById("notetitle");
  if (fd == "cancel") {
    resetForm(notetitle, notetext);
  } else {
    submitNote(notetitle, notetext);
    resetForm(notetitle, notetext);
  }
}

/* Reset Form function */
function resetForm(nt1, nt2) {
  nt1.value = "";
  nt2.value = "";
}

function submitNote(nt1, nt2) {
  const modal = document.querySelector(".menu-bg");
  modalEventStatus = true;
  modal.classList.toggle("hidden");

  notes.push({
    title: nt1.value,
    note: nt2.value,
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
    <input type="text" name="note-edit" class="note-edit-input edit-title input-none" placeholder="Title: ${notes[i].title}">
    <p class="note-para">
      ${notes[i].note}
    </p>
    <input type="text" name="note-edit" class="note-edit-input edit-note input-none" placeholder="Note: ${notes[i].note}">
    <span class="edit-notes" onclick="editThis(this)">EDIT</span>
    <div class="note-btns">
      <button class="btn note-btn btn-done" title="Done" onclick="itemHandler(this)">
        <img src="clarity_check-line.svg" alt="clarity_check-line" />
      </button>
      <button class="btn note-btn btn-top" title="Send to top" onclick="itemHandler(this)">
        <img src="clarity_arrow-line.svg" alt="clarity_arrow-line" />
      </button>
      <button class="btn note-btn btn-edit" title="Edit" onclick="itemHandler(this)">
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
    <input type="text" name="note-edit" class="note-edit-input edit-title input-none" placeholder="Title: ${src[i].title}" oninput="key(this, event.target.value)">
    <p class="note-para">
      ${src[i].note}
    </p>
    <input type="text" name="note-edit" class="note-edit-input edit-note input-none" placeholder="Note: ${src[i].note}" oninput="key(this, event.target.value)">
    <span class="edit-notes" onclick="editThis(this)">EDIT</span>
    <div class="note-btns">
      <button class="btn note-btn btn-done" title="Done" onclick="itemHandler(this)">
        <img src="clarity_check-line.svg" alt="clarity_check-line" />
      </button>
      <button class="btn note-btn btn-top" title="Send to top" onclick="itemHandler(this)">
        <img src="clarity_arrow-line.svg" alt="clarity_arrow-line" />
      </button>
      <button class="btn note-btn btn-edit" title="Edit" onclick="itemHandler(this)">
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

function key(el, key) {
  const elParent = el.parentElement.parentElement;
  let title = elParent.querySelector(".note-head");
  let note = elParent.querySelector(".note-para");
  const index = notes.findIndex((notes) => notes === title.textContent);
  const anotherIndex = notes.indexOf(title.textContent);
  console.log(anotherIndex);
  if (el.classList.contains("edit-title")) {
    note = elParent.querySelector(".note-para");
    title.textContent = key;
    notes.splice(index, 1, {
      title: key,
      note: note.textContent,
    });
    localStorage.setItem("notes", JSON.stringify(notes));
  } else {
    title = elParent.querySelector(".note-head");
    note.textContent = key;
    notes.splice(index, 1, {
      title: title.textContent,
      note: key,
    });
    localStorage.setItem("notes", JSON.stringify(notes));
  }
}

function itemHandler(el) {
  const elClass = el.classList;
  const elParent = el.parentElement.parentElement;
  const title = elParent.querySelector(".note-head");
  const note = elParent.querySelector(".note-para");
  console.log(title);
  const index = notes.findIndex((notes) => notes === title);
  const firstChild =
    document.querySelector(".section-area").firstElementChild.innerText;
  const noteList = document.querySelector(".note-list");
  const sectionArea = document.querySelector(".section-area");
  if (elClass.contains("btn-done")) {
    if (index) {
      notes.splice(index, 1);
      elParent.remove();
      localStorage.setItem("notes", JSON.stringify(notes));
    }
  } else if (elClass.contains("btn-top")) {
    if (firstChild.match(title.textContent)) {
      console.log("Already at the top!");
    } else {
      console.log("Not at the top!");
      const content = elParent.innerHTML;
      const newDiv = document.createElement("div");
      newDiv.className = "note-item";
      sectionArea.prepend(newDiv);
      newDiv.innerHTML = content;
      /* Remove object at index, remove one element */
      notes.splice(index, 1);
      /* Add object at 0 index, add title and note from values stored */
      notes.splice(0, 0, {
        title: title.textContent,
        note: note.textContent,
      });
      elParent.remove();
      localStorage.setItem("notes", JSON.stringify(notes));
    }
  } else if (elClass.contains("btn-edit")) {
    const allInputs = elParent.querySelectorAll(".note-edit-input");
    allInputs.forEach(function (input) {
      if (input.classList.contains("input-none")) {
        input.classList.remove("input-none");
        title.classList.add("note-hidden");
        note.classList.add("note-hidden");
      } else {
        input.classList.add("input-none");
        title.classList.remove("note-hidden");
        note.classList.remove("note-hidden");
      }
    });
  }
}
