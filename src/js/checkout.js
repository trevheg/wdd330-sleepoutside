import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";
import ExternalServices from "./ExternalServices.mjs";

loadHeaderFooter();

const services = new ExternalServices();

const order = new CheckoutProcess("so-cart", ".order-summary", services);
order.init();

// Add event listener to run calculateOrderTotal when the user changes the zip code
document.querySelector("#zip").addEventListener("blur", order.calculateOrderTotal.bind(order));

// Waiting for Submit Form
const checkoutForm = document.querySelector("#checkout-form");
checkoutForm.addEventListener('click', (e) => {
  e.preventDefault();
  const myForm = document.forms[0];
  const chk_status = myForm.checkValidity();
  myForm.reportValidity();
  if(chk_status)
    myCheckout.checkout();
  });