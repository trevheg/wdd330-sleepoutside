import { getLocalStorage } from "./utils.mjs";

export default class CheckoutProcess{
    constructor(key, outputSelector){
        this.key = key;
        this.outputSelector = outputSelector;
        this.list = [];
        this.itemTotal = 0;
        this.shipping = 0;
        this.tax = 0;
        this.orderTotal = 0;
    }
    init(){
        this.list = getLocalStorage(this.key);
        this.calculateItemSummary();
    }

    calculateItemsubTotal(){
        // calculate total of dollars of items in the cart and the number of items
    }

    calculateOrderTotal(){
        this.tax = (this.itemTotal)
        this.shipping =
        this.orderTotal =

        this.displayOrderTotals();
    }

    displayOrderTotals(){
        const tax = document.querySelector(`${this.outputSelector} #tax`);
        tax.innerText = `$${this.tax.toFixed(2)}`;
    }
}