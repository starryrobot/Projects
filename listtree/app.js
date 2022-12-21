const submitBtn = document.getElementById("submit");
const clickSpan = document.getElementsByClassName("click");

submitBtn.addEventListener("click", listFunction());

function listFunction() {
  for (i = 0; i < clickSpan.length; i++) {
    clickSpan[i].addEventListener("click", function () {
      this.parentElement.querySelector(".nested").classList.toggle("active");
    });
  }
}
