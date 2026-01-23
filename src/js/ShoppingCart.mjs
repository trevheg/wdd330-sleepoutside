import {getLocalStorage, renderListWithTemplate} from "./utils.mjs";

// Create a card in html for an item in the cart
function cartItemTemplate(item) {
  return `
    <li class="cart-card divider">
    <a href="../product_pages/?product=${item.Id}" class="cart-card__image">
      <img
        src="${item.Image}"
        alt="${item.Name}"
      />
    </a>
    <a href="../product_pages/?product=${item.Id}">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <p class="cart-card__quantity">qty: 1</p>
    <p class="cart-card__price">$${item.FinalPrice}</p>
  </li>
    `;
}


export default class ShoppingCart {
    constructor(key, listElement) {
        this.key = key;
        this.listElement = listElement;
    }

    async init() {
        const list = this.getCartItems();
        this.renderList(list);
        this.displayCartTotal(list);
    }

    getCartItems() {
        return getLocalStorage(this.key) || [];
    }

    renderList(list) {
        renderListWithTemplate(cartItemTemplate, this.listElement, list)
    }

    // Display Total Price of Cart Items
    displayCartTotal(list) {
        // Check if there are items in the cart
        if (list.length != 0) {
            // make the cart footer display
            document.querySelector(".cart-footer").style.display = "grid";
            // Calculate total cost
            const totalCost = list.reduce((sum, item) => sum + item.FinalPrice, 0);
            // display the total in the cart
            document.querySelector(".cart-total-cost").textContent = `Total Cost: $${totalCost.toFixed(2)}`;
        }
    }
}