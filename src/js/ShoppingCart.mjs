import {getLocalStorage, renderListWithTemplate, setLocalStorage, updateCartCount} from "./utils.mjs";

// Create a card in html for an item in the cart
function cartItemTemplate(item, index) {
  return `
    <li class="cart-card divider">
    <a href="../product_pages/?product=${item.Id}" class="cart-card__image">
      <img
        src="${item.Images.PrimarySmall}"
        alt="${item.Name}"
      />
    </a>
    <a href="../product_pages/?product=${item.Id}">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <p class="cart-card__quantity">qty: 1</p>
    <p class="cart-card__price">$${item.FinalPrice}</p>
    <span class="cart-card__remove" data-id="${item.Id}" data-index="${index}">X Remove</span>
  </li>
    `;
}


export default class ShoppingCart {
    constructor(key, listElement) {
        this.key = key;
        this.listElement = listElement;
    }

    async init() {
        this.refresh();
    }

    // Rendering functions without calling them again inside other functions like removeFromCart
    refresh() {
        const list = this.getCartItems();
        this.listElement.innerHTML = "";
        this.renderList(list);
        this.displayCartTotal(list);
        this.setupRemoveListener();
    }

    getCartItems() {
        return getLocalStorage(this.key) || [];
    }

    renderList(list) {
        renderListWithTemplate(cartItemTemplate, this.listElement, list)
    }

    removeFromCart(index) {
        const list = this.getCartItems(); //Rendering new List After Removing
        list.splice(index, 1);
        setLocalStorage(this.key, list);

        updateCartCount();
        this.refresh();
    }

    setupRemoveListener() {
        const removeButtons = document.querySelectorAll(".cart-card__remove");

        removeButtons.forEach(button => {
          button.addEventListener("click", (event) => {
            const index = parseInt(event.target.dataset.index);
            this.removeFromCart(index)
          })
        })
    }

    // Display Total Price of Cart Items
    displayCartTotal(list) {
        const cartFooter = document.querySelector(".cart-footer");
        // Check if there are items in the cart
        if (list.length > 0) {
            // make the cart footer display
            cartFooter.style.display = "grid";
            // Calculate total cost
            const totalCost = list.reduce((sum, item) => sum + item.FinalPrice, 0);
            // display the total in the cart
            document.querySelector(".cart-total-cost").textContent = `Total Cost: $${totalCost.toFixed(2)}`;
        } else {
            cartFooter.style.display = "none";
        }
    }
}