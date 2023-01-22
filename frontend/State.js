export class State {
    // key - value pairs
    // key : symbol
    // value : # of orders currently in this state

    /*
    {
    TSX: {GOOG: 2},
    AEQ: {GOOG: 1},.
    }
    */

    constructor() {
        this.exchangeMap = {};
    }
    /*
    increment -> bool
    symbol -> string
    */
    operate(exchange, symbol, increment) {
        if(!this.exchangeMap.has(exchange)) {
            this.exchangeMap[exchange] = new Map();
        }
        if(!this.exchangeMap[exchange].has(symbol)) {
            this.exchangeMap[exchange][symbol] = new Map();
        }
        this.exchangeMap[exchange][symbol] += increment ? 1 : -1;
    }
}