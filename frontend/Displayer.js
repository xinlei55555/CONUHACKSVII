export class Displayer {
    constructor(manager) {
        this.symbolsToDisplay = new Set();
        this.exchangesToDisplay = new Set();
        this.exchangesToDisplay.add('AQ')
        this.exchangesToDisplay.add('AP')
        this.exchangesToDisplay.add('TSX')
        this.manager = manager;

        this.n1 = document.getElementById('n1');
        this.n2 = document.getElementById('n2');
        this.n3 = document.getElementById('n3');
        this.n4 = document.getElementById('n4');
        this.n5 = document.getElementById('n5');

        this.barsElements = {
            OR: document.getElementById('OR'),
            OA: document.getElementById('OA'),
            CR: document.getElementById('CR'),
            CA: document.getElementById('CA'),
            CC: document.getElementById('CC'),
            TT: document.getElementById('TT'),
        }
        this.symbolElements = {
            OR: new Map(),
            OA: new Map(),
            CR: new Map(),
            CA: new Map(),
            CC: new Map(),
            TT: new Map(),
        }
    }
    // update display
    // you need to for each of the states
    // look into the exchange maps of that state
    // add up all the symbol values together

    updateDisplay() {
        const states = this.manager.states;
        let barSums = new Map();
        let maxSum = 0;
        const stateObjects = this.manager.stateObjects;
        for(let state of states) {
            const stateObject = stateObjects[state];
            let symbolSum = new Map();
            for(let [exchange, symbolMap] of stateObject.exchangeMap) {
                if(this.exchangesToDisplay.has(exchange)) {
                    for(let [symbol, symbolCount] of symbolMap) {
                        if(!symbolSum.has(symbol)) symbolSum.set(symbol, 0);
                        symbolSum.set(symbol, symbolSum.get(symbol) + symbolCount);
                    }
                }
            }

            const barSum = this.getBarSum(symbolSum);
            barSums.set(state, barSum);
            if(barSum > maxSum) maxSum = barSum;
            //if(state == 'CC') console.log(stateObject);
        }
        //console.log(barSums)
        for(let barState of states) {
            const barSum = stateObjects[barState].counter;
            if(barSum > maxSum) maxSum = barSum;
        }
        maxSum = maxSum/1000*1000
        const n5 = Math.round(maxSum / 5);
        const n4 = n5 * 2;
        const n3 = n5 * 3;
        const n2 = n5 * 4;
        const n1 = n5 * 5;
        this.n1.innerHTML = n1;
        this.n2.innerHTML  = n2;
        this.n3.innerHTML  = n3;
        this.n4.innerHTML  = n4;
        this.n5.innerHTML  = n5;
        for(let barState of states) {
            this.renderBar(stateObjects[barState].counter, barState, maxSum);
        }
    }
    getBarSum(symbolSum) {
        let sum = 0;
        for(let [symbol, symbolCount] of symbolSum) {
            
            sum += symbolCount;
        }
        return sum;
    }
    renderBar(sum, state, maxSum) {
        let proportion = (1.0 * sum)/maxSum * 70;
        if(isNaN(proportion)) proportion = 0;
        //console.log('render counter' + this.counter)
        //console.log(proportion)
        this.barsElements[state].style.height = proportion + 'vh';
    }
}