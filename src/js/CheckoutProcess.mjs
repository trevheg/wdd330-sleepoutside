import { alertMessage, getLocalStorage, setLocalStorage, removeAllAlerts } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

const services = new ExternalServices();

function formDataToJSON(formElement){
    const formData = new FormData(formElement);
    const convertedJSON = {};
    
    formData.forEach((value, key) => {
        convertedJSON[key] = value;
    });

    return convertedJSON;
}

function packageItems(items) {
    const simplifiedItems = items.map((item) =>{
        console.log(item);
        return{
            id:item.Id,
            price:item.FinalPrice,
            name: item.Name,
            quantity: 1,
        };
    });
    return simplifiedItems;
}



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

    calculateItemSummary(){
        const summaryElement = document.querySelector(
            this.outputSelector + " #cartTotal"
        );
        const itemNumElement = document.querySelector(
            this.outputSelector + " #num-items"
        );
        if (!summaryElement || !itemNumElement){
            console.warn("There is not one of the elements");
            return;
        }
        itemNumElement.innerText = this.list.length;

        const amounts = this.list.map((item) => item.FinalPrice);
        this.itemTotal = amounts.reduce((sum, item)=> sum + item);
        summaryElement.innerText = `$${this.itemTotal}`;;
    }

    calculateItemsubTotal(){
        // calculate total of dollars of items in the cart and the number of items
    }

    calculateOrderTotal(){
        this.tax = (this.itemTotal * .06);
        this.shipping = 10 + (this.list.length - 1) * 2;
        this.orderTotal = (
            parseFloat(this.itemTotal) +
            parseFloat(this.tax) +
            parseFloat(this.shipping)
        )

        this.displayOrderTotals();
    }

    displayOrderTotals(){
        const tax = document.querySelector(`${this.outputSelector} #tax`);
        const shipping = document.querySelector(`${this.outputSelector} #shipping`);
        const orderTotal = document.querySelector(`${this.outputSelector} #orderTotal`);
        tax.innerText = `$${this.tax.toFixed(2)}`;
        shipping.innerText = `$${this.shipping.toFixed(2)}`;
        orderTotal.innerText = `$${this.orderTotal.toFixed(2)}`;
    }



    async checkout(){
        const formElement = document.forms["checkout"];
        const order = formDataToJSON(formElement);

        order.orderDate = new Date().toISOString();
        order.orderTotal = this.orderTotal;
        order.tax = this.tax;
        order.shipping = this.shipping;
        order.items = packageItems(this.list);
        console.log(order);


        try{
            const response = await services.checkout(order);
            console.log("checking...",response);
            setLocalStorage("so-cart", []);
            location.assign("success.html");
        } catch (err){
            console.log("checking.... errorrr", err);
            alert("error")
            removeAllAlerts();
            for(let message in err.message){
                alertMessage(err.message[message]);
            }
            console.log(err);
        }

    }

}