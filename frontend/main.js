import { Manager } from "./Manager.js";
const searchSymbols = document.querySelector("#symbol-search");

const inputHandler = function (e) {
  console.log(e.target.value.trim());
};

searchSymbols.addEventListener("input", inputHandler);
//Popup Modal Box
var modal = document.getElementById("myModal");

// Modal Demo Code, for testing only
const btn = document.getElementById("b8c529be-9283-11ed-ad3c-047c16291a22");
function openPopup(e) {
  // get ID
  let id = e.target.id;
  modal.style.display = "block";
  console.log(modal.style.display);
}

btn.addEventListener("click", openPopup);
var closeBtn = document.getElementById("close");
closeBtn.onclick = function () {
  modal.style.display = "none";
};
// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
fetch("good_data1.json")
  .then((response) => response.json())
  .then((data) => {
    const manager = new Manager(1000);
    manager.run(data);
  });
