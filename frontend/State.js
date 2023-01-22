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
    this.exchangeMap = new Map();
    this.counter = 0;
  }
  /*
    increment -> bool
    symbol -> string
    */
  operate(exchange, symbol, increment) {
    increment = increment == "true";
    const value = increment ? 1 : -1;
    if (!this.exchangeMap.has(exchange)) {
      this.exchangeMap.set(exchange, new Map());
    }
    if (!this.exchangeMap.get(exchange).has(symbol)) {
      this.exchangeMap.get(exchange).set(symbol, 0);
    }
    const prevValue = this.exchangeMap.get(exchange).get(symbol);
    this.exchangeMap.get(exchange).set(symbol, prevValue + value);

    this.counter += value;
    // console.log('operation counter' + this.counter)
  }
}
