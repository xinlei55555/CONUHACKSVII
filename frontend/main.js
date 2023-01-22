import { Manager } from "./Manager.js";
const searchSymbols = document.querySelector("#symbol-search");

const inputHandler = function (e) {
  console.log(e.target.value.trim());
};

searchSymbols.addEventListener("input", inputHandler);

fetch('good_data1.json').then(response => response.json()).then(data =>  {
  const manager = new Manager(1000);
  manager.run(data);
})
