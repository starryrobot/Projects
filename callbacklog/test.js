const contentEl = document.querySelector(".content");
let currentTitle = "";

function Pages(title, content) {
  this.title = title;
  this.content = content;

  this.create = function () {
    contentEl.innerHTML = this.content;
  };
}

const home = new Pages("Home", `<h1>Homepage</h1>`);
const calls = new Pages("Calls", `<h1>Calls</h1>`);

function navigate(btn) {
  const currentBtn = btn.classList;
  if (currentBtn.contains(home.title.toLowerCase())) {
    home.create();
    currentTitle = home.title;
    console.log(currentTitle);
  } else {
    calls.create();
    currentTitle = calls.title;
    console.log(currentTitle);
  }
}
