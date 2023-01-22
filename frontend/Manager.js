
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
        this.displayer = new Displayer(this);
        this.orders = new Map()

        // 1 second -> timeInterval = 1000
        this.timeInterval = timeInterval;
        
        
        this.states = ['OR', 'OA', 'CR', 'CA', 'CC', 'TT']
        this.stateObjects = {
            OR: new State(),
            OA: new State(),
            CR: new State(),
            CA: new State(),
            CC: new State(),
            TT: new State(),
        }
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
            while(operations.length > index && parseInt(operations[index].timestamp) <= maxTimestamp) {
                let {exchange, symbol, increment, state} = operations[index];
                this.stateObjects[state].operate(exchange, symbol, increment);
                index++;
            }

            this.displayer.updateDisplay();

            if(operations.length == index) clearInterval(interval);
        }, this.timeInterval)
        
    }
}

