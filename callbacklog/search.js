const searchText = document.querySelector(".search-text");
const searchInput = document.getElementById("search");
let searchArray = [];

searchInput.addEventListener("input", (e) => createSearch(e.target.value));

/* Search Function */
function createSearch(searchTerm) {
  searchText.classList.add("enabled");
  const entries = document.querySelectorAll(".renderedEntry");
  searchArray.push(Array.from(entries));
  for (let i = 0; i < searchArray[0].length; i++) {
    // console.log(`Search array: ${searchArray[0][i].innerText}`);
    if (
      searchArray[0][i].innerText
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    ) {
      console.log(`Search match found: ${searchArray[0][i].innerText}`);
      console.log(currState);
      setTimeout(function () {
        searchArray[0][i].classList.remove("hide");
      }, 1000);
      // divLogs.innerHTML = currState;
    } else {
      searchArray[0][i].classList.add("hide");
    }
    setTimeout(function () {
      searchText.classList.remove("enabled");
    }, 2000);
  }
}
