import { State } from "./State.js";
import { Displayer } from "./Displayer.js";
export class Manager {
  constructor(timeInterval) {
    /*
        key - value pair
        key : orderID
        value : list of all the 
        orders[1] = [{timestamp : 1, price: 2}, ]
        */
    this.style = "";
    this.image = "";
    this.modal = document.getElementById("myModal");
    //btn.addEventListener("click", openPopup);
    const closeBtn = document.getElementById("close");
    closeBtn.onclick = function () {
      this.modal.style.display = "none";
    };
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
      if (event.target == this.modal) {
        this.modal.style.display = "none";
      }
    };
    this.orders = new Map();
    this.ordersClusters = [];
    this.clusterize = new Clusterize({
      rows: this.ordersClusters,
      scrollId: "scrollArea",
      contentId: "contentArea",
    });
    this.displayer = new Displayer(this);
    this.orders = new Map();

    // 1 second -> timeInterval = 1000
    this.timeInterval = timeInterval;

    this.states = ["OR", "OA", "CR", "CA", "CC", "TT"];
    this.stateObjects = {
      OR: new State(),
      OA: new State(),
      CR: new State(),
      CA: new State(),
      CC: new State(),
      TT: new State(),
    };
  }

  run(operations) {
    this.currentTimestamp = this.timeInterval;

    // operations timestamp : 9:28:00 -> 0 ms
    // startTimestamp :
    // currentTimestamp - startTimestamp -> ms
    let index = 0;
    const interval = setInterval(async () => {
      const maxTimestamp = this.currentTimestamp;
      this.currentTimestamp += this.timeInterval;
      while (
        operations.length > index &&
        parseInt(operations[index].timestamp) <= maxTimestamp
      ) {
        let { exchange, symbol, increment, state, id, timestamp } =
          operations[index];
        if (increment == "true")
          this.updateOrder(
            id,
            state,
            operations[index]["order price"],
            timestamp
          );

        this.stateObjects[state].operate(exchange, symbol, increment);
        index++;
      }

      this.displayer.updateDisplay();
      this.updateCluster();

      if (operations.length == index) clearInterval(interval);
    }, this.timeInterval);
  }

  updateCluster() {
    let divs = [];
    for (let [id, object] of this.orders) {
      const states = object.states;
      const lastState = states[states.length - 1];
      const currentDIV = `<div class="transaction">
            <p>${id}</p>
            <p class="timestamp">${lastState.timestamp}</p>
            <div class="state">
              <div
                style="display: flex; align-items: center; margin-right: 30px"
                class=${
                  lastState.state === "CC" ||
                  lastState.state === "CA" ||
                  lastState.state === "CR"
                    ? "cancelled"
                    : lastState.state === "OA"
                    ? "pending"
                    : "done"
                }
              >
                <span style="padding-right: 2px">${lastState.state}</span>

                <img src="./images/${
                  lastState.state === "CC" ||
                  lastState.state === "CA" ||
                  lastState.state === "CR"
                    ? "cancel"
                    : lastState.state === "OA"
                    ? "clock"
                    : "check-mark"
                }.png" height="20px" />
              </div>
              <button
                class="popup-control"
                data-oid="${id}"
              >
                View
                <img src="./images/right-arrow.png" height="20px" />
              </button>
            </div>
          </div>`;

      divs.push(currentDIV);
    }
    this.clusterize.update(divs);
    document.getElementById("contentArea").onclick = (e) => {
      const target = e.target;
      const id = target.dataset.oid;
      if (this.orders.has(id)) {
        const modal = this.modal;
        const modalcontent = document.getElementById("modal-content");
        modalcontent.innerHTML = "";
        const object = this.orders.get(id);
        const h1 = document.createElement("h1");
        h1.innerText = "ORDER ID: " + id;
        const h2 = document.createElement("h2");
        h2.innerText = "PRICE: ";
        if (object.price) h2.innerText += object.price + "$";
        else h2.innerText += "unavailable";
        const list = document.createElement("ul");

        for (let { state, timestamp } of object.states) {
          const ul = document.createElement("il");
          ul.style.display = "list-item";
          ul.innerText = timestamp + " " + state;
          list.appendChild(ul);
        }
        modalcontent.appendChild(h1);
        modalcontent.appendChild(h2);
        modalcontent.appendChild(list);
        modal.style.display = "block";
        console.log(modal.style.display);
      }
    };
  }
  openpopup(id) {
    console.log(id);
  }

  updateOrder(id, state, price, timestamp) {
    if (this.orders.has(id)) {
      let previousObject = this.orders.get(id);
      previousObject.states.push({ state: state, timestamp: timestamp });
      if (!previousObject.price) previousObject[price] = price;
      this.orders.set(id, previousObject);
    } else {
      this.orders.set(id, {
        states: [{ state: state, timestamp: timestamp }],
        price: price,
      });
    }
  }
}
