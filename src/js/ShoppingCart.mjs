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
    <div class="cart-card__quantity">
        <button class="qty-btn minus" data-index="${index}" ${item.quantity <= 1 ? 'disabled' : ''}>−</button>
        <span class="qty-display">${item.quantity}</span>
        <button class="qty-btn plus" data-index="${index}">+</button>
    </div>
    <p class="cart-card__price">$${item.FinalPrice * item.quantity.toFixed(2)}</p>
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
        this.setupQuantityListeners();
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
            const list = this.getCartItems();
            const item = list[index];

            // If quantity is more than 1, show confirmation
            if (item.quantity > 1) {
                this.showConfirmModal(item.Name, item.quantity, index);
            } else {
                // Quantity is 1, remove directly
                this.removeFromCart(index);
            }
          });
        });
    }

    showConfirmModal(itemName, quantity, index) {
        // Remove existing modal if any
        const existingModal = document.getElementById("confirm-modal");
        if (existingModal) existingModal.remove();

        // Create modal
        const modal = document.createElement("div");
        modal.id = "confirm-modal";
        modal.classList.add("modal-overlay");
        modal.innerHTML = `
            <div class="modal-content">
                <h3>Remove Item</h3>
                <p>Are you sure you want to remove all ${quantity} of "${itemName}" from your cart?</p>
                <div class="modal-buttons">
                    <button class="btn-confirm">Remove All</button>
                    <button class="btn-cancel">Cancel</button>
                </div>
            </div>
        `;

        // Add event listeners to modal buttons
        modal.querySelector(".btn-confirm").addEventListener("click", () => {
            this.removeFromCart(index);
            modal.remove();
        });

        modal.querySelector(".btn-cancel").addEventListener("click", () => {
            modal.remove();
        });

        // Close modal if clicking outside
        modal.addEventListener("click", (e) => {
            if (e.target === modal) modal.remove();
        });

        document.body.appendChild(modal);
    }

    setupQuantityListeners() {
        const minusButtons = document.querySelectorAll(".qty-btn.minus");
        const plusButtons = document.querySelectorAll(".qty-btn.plus");

        minusButtons.forEach(button => {
            button.addEventListener("click", (event) => {
                const index = parseInt(event.target.dataset.index);
                this.updateQuantity(index, -1);
            });
        });

        plusButtons.forEach(button => {
            button.addEventListener("click", (event) => {
                const index = parseInt(event.target.dataset.index);
                this.updateQuantity(index, 1);
            });
        });
    }

    updateQuantity(index, change) {
        const list = this.getCartItems();
        list[index].quantity += change;

        if (list[index].quantity <= 0) {
            list.splice(index, 1);
        }

        setLocalStorage(this.key, list);
        updateCartCount();
        this.refresh();
    }    

    // Display Total Price of Cart Items
    displayCartTotal(list) {
        const cartFooter = document.querySelector(".cart-footer");
        // Check if there are items in the cart
        if (list.length > 0) {
            // make the cart footer display
            cartFooter.style.display = "grid";
            // Calculate total cost
            const totalCost = list.reduce((sum, item) => sum + (item.FinalPrice * (item.quantity || 1)), 0);
            // display the total in the cart
            document.querySelector(".cart-total-cost").textContent = `Total Cost: $${totalCost.toFixed(2)}`;
        } else {
            cartFooter.style.display = "none";
        }
    }
}