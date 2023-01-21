class Manager {

    
    constructor(timeInterval) {
        /*
        key - value pair
        key : orderID
        value : list of all the 
        orders[1] = [{timestamp : 1, price: 2}, ]
        */
        this.orders = new Map()

        this.timeInterval = timeInterval;
        this.symbolsToDisplay = new Set();
        this.States = {
            AQ: new State(),
            AP: new State(),
            TSX: new State(),
        }
    }

    run(operations) {
        this.startTimestamp = Date.now()
        while(true){}
    }


}

