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

fetch("final_data1.json")
  .then((response) => response.json())
  .then((data) => {
    const manager = new Manager(200);
    manager.run(data);
    setInterval(() => {
      const time = document.getElementById("time");
      let t = time.innerHTML;
      let newTime =
        Number(t.split(":")[0]) * 60 * 60 * 1000 +
        Number(t.split(":")[1]) * 60 * 1000 +
        Number(t.split(":")[2]) * 1000 +
        1000;

      let seconds = Math.floor(newTime / 1000);
      let minutes = Math.floor(seconds / 60);
      let hours = String(Math.floor(minutes / 60));
      seconds = seconds % 60;
      minutes = minutes % 60;
      if (seconds < 10) {
        seconds = "0" + seconds;
      }
      hours = hours % 24;

      document.getElementById("time").innerHTML =
        "09" + ":" + minutes + ":" + seconds;
    }, 1000);
  });
