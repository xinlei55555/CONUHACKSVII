import { Manager } from "./Manager.js";
const searchSymbols = document.querySelector("#symbol-search");

const inputHandler = function (e) {
  console.log(e.target.value.trim());
};

searchSymbols.addEventListener("input", inputHandler);
//Popup Modal Box
const modal = document.getElementById("myModal");
// Modal Demo Code, for testing only
const closeBtn = document.getElementById("close");
closeBtn.onclick = function () {
  console.log("OK");
  modal.style.display = "none";
};
// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    console.log("OK");
    modal.style.display = "none";
  }
};

fetch("final_data.json")
  .then((response) => response.json())
  .then((data) => {
    const manager = new Manager(1000);
    manager.run(data);
    setInterval(() => {
      const time = document.getElementById("time");
      let t = time.innerHTML;
      let newTime =
        Number(t.split(":")[0]) * 60 * 60 * 1000 +
        Number(t.split(":")[1]) * 60 * 1000 +
        Number(t.split(":")[2]) * 1000 +
        1000;
      console.log(newTime);

      let seconds = Math.floor(newTime / 1000);
      let minutes = Math.floor(seconds / 60);
      let hours = String(Math.floor(minutes / 60));
      seconds = seconds % 60;
      minutes = minutes % 60;
      if (seconds < 10) {
        seconds = "0" + seconds;
      }
      hours = hours % 24;
      console.log("09" + ":" + minutes + ":" + seconds);

      document.getElementById("time").innerHTML =
        "09" + ":" + minutes + ":" + seconds;
      console.log(document.getElementById("time").innerHTML);
    }, 1000);
  });
