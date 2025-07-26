import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs"

loadHeaderFooter();

const order = new CheckoutProcess("so-cart", ".checkout-summary");
order.init();


document
.querySelector("#zip")
.addEventListener("blur", order.calculateOrdertotal.bind(order));
const myForm = document.forms[0];

document.querySelector("#checkoutSubmit").addEventListener("click", async (e) =>{
    e.preventDefault();
    const chk_status = myForm.checkValidity();
    myForm.reportValidity();
    if(chk_status){
        console.log("checking....")
        await order.checkout();
       
    }else {
        console.log("Form no valid");
    }
    
});

