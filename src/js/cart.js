import { getLocalStorage, setLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];
  const htmlItems = cartItems.map((item, index) => cartItemTemplate(item, index));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");

  setupRemoveListeners();
}

function cartItemTemplate(item, index) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
  <span class="cart-card__remove" data-id="${item.Id}" data-index="${index}">X Remove</span>
</li>`;

  return newItem;
}

function removeFromCart(index) {
  let cartItems = getLocalStorage("so-cart") || [];
  
  cartItems.splice(index, 1);
  
  setLocalStorage("so-cart", cartItems);
  
  renderCartContents();
}

function setupRemoveListeners() {
  const removeButtons = document.querySelectorAll(".cart-card__remove");
  
  removeButtons.forEach(button => {
    button.addEventListener("click", (event) => {
      const index = parseInt(event.target.dataset.index);
      removeFromCart(index);
    });
  });
}

renderCartContents();
