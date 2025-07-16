import { getLocalStorage, setLocalStorage } from "./utils.mjs";

function cartItemTemplate(item) {
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
    <span class="remove-item" data-id="${item.Id}" style="cursor: pointer;">X</span>
  </li>`;

  return newItem;
}

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");

  // Add listeners to all remove buttons
  const removeButtons = document.querySelectorAll(".remove-item");
  removeButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const idToRemove = e.target.dataset.id;
      removeFromCart(idToRemove);
    });
  });
}

function removeFromCart(productId) {
  let cartItems = getLocalStorage("so-cart") || [];
  const index = cartItems.findIndex((item) => item.Id === productId);
  if (index > -1) {
    cartItems.splice(index, 1); // remove only the first match
    setLocalStorage("so-cart", cartItems);
    renderCartContents(); // re-render the updated cart
  }
}

renderCartContents();