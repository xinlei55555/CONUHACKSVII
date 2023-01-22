import { Manager } from "./Manager.js";
const searchSymbols = document.querySelector("#symbol-search");

const inputHandler = function (e) {
  console.log(e.target.value.trim());
};

searchSymbols.addEventListener("input", inputHandler);
//Popup Modal Box


// Modal Demo Code, for testing only
const btn = document.getElementById("b8c529be-9283-11ed-ad3c-047c16291a22");
function openPopup(e) {
  // get ID
  let id = e.target.id;
  
}



fetch("final_data.json")
  .then((response) => response.json())
  .then((data) => {
    const manager = new Manager(1000);
    manager.run(data);
  });
