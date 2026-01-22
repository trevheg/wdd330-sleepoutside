import { getLocalStorage, updateCartCount } from "./utils.mjs";

// Render the contents of the cart for the user
function renderCartContents() {
  // Get the contents of the cart from localStorage and return an empty array if there is no cart stored
  const cartItems = getLocalStorage("so-cart") || [];
  // map through the cartItems array and create an html display for each item
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  // join the array of html cart items into a single html string and place it in the cart page.
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
  // Check if there is anything in the cart and show the total price if there is.
  checkCartForItems();
}

// Create a card in html for an item in the cart
function cartItemTemplate(item) {
  const newItem = `
  <li class="cart-card divider">
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
  </li>
  `;

  return newItem;
}

// Check to see if there are items in the cart. If there are, display the total price.
function checkCartForItems() {
  const cartItems = getLocalStorage("so-cart") || [];
  if (cartItems.length != 0) {
    // make the cart footer display
    document.querySelector(".cart-footer").style.display = "grid";
    // get all the prices
    const prices = cartItems.map((obj) => obj.FinalPrice);
    // add all the prices together
    const totalCost = prices.reduce((a, cv) => a + cv, 0);
    // display the total in the cart
    document.querySelector(".cart-total-cost").textContent =
      `Total Cost: $${totalCost}`;
  }
}

checkCartForItems();
renderCartContents();
updateCartCount();
