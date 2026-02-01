import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";
import ExternalServices from "./ExternalServices.mjs";

loadHeaderFooter();

const services = new ExternalServices();

const order = new CheckoutProcess("so-cart", ".order-summary", services);
order.init();

// Add event listeners to fire calculateOrderTotal when the user changes the zip code
document.querySelector("#zip").addEventListener("blur", order.calculateOrderTotal.bind(order));

// Waiting for Submit Form
const checkoutForm = document.querySelector("#checkout-form");
checkoutForm.addEventListener("submit", async(e) => {
    e.preventDefault();
    order.checkout(checkoutForm);
})