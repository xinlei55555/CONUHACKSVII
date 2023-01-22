export class Displayer {
    constructor(manager) {
        this.symbolsToDisplay = new Set();
        this.exchangesToDisplay = new Set();
        this.exchangesToDisplay.add('AQ')
        this.exchangesToDisplay.add('AP')
        this.exchangesToDisplay.add('TSX')
        this.manager = manager;

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
        
        let proportion = (1.0 * sum)/maxSum * 100;
        if(isNaN(proportion)) proportion = 0;
        console.log('render counter' + this.counter)
        console.log(proportion)
        this.barsElements[state].style.height = proportion + 'vh';
    }
}