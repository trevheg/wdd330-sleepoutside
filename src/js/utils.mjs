// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

// gets the product id from the query string in the url
export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param);
  return product
}

export function renderListWithTemplate(template, parentElement, list, position = "afterbegin", clear = false) {
  // map through "list" and return array of html elements for each product object in "list"
  const htmlStrings = list.map(template);
  // if clear is "true" we need to clear out the contents of the parent.
  if (clear) {
    parentElement.innerHTML = "";
  }

  // Join the array of html elements to the parentElement. The default is after whatever else is in there. 
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}

export function renderWithTemplate(template, parentElement, data, callback) {
  parentElement.innerHTML = template;
  if(callback) {
    callback(data);
  }
}

// This asynchronous function fetches the content of the HTML file given a path. The response to the fetch is converted to text and returns the HTML content as a string.
async function loadTemplate(path) {
  const fileContents = await fetch(path);
  const template = await fileContents.text();
  return template;
}

// Load the header and footer templates in from the partials using the loadTemplate.
// Grab the header and footer placeholder elements out of the DOM.
// Render the header and footer using renderWithTemplate.
export async function loadHeaderFooter() {
  const headerTemplate = await loadTemplate("../partials/header.html");
  const footerTemplate = await loadTemplate("../partials/footer.html");

  const headerElement = document.querySelector("#main-header");
  const footerElement = document.querySelector("#main-footer");

  renderWithTemplate(headerTemplate, headerElement);
  renderWithTemplate(footerTemplate, footerElement);

  updateCartCount(); // calling to update the cart Badge after loading the header and footer
}

// Put a number over the cart icon showing if and how many items are in the cart
export function updateCartCount(cartItems = null) {
  // if not fetched, re-assign parameter
  if (!cartItems) {
    cartItems = getLocalStorage("so-cart") || [];
  }
  const cartCountElement = document.getElementById("cart-count");

  if (cartCountElement) {
    // Get the total quantity
    const itemCount = cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);
    cartCountElement.textContent = itemCount;

    if (itemCount === 0) {
      cartCountElement.style.display = "none";
    } else {
      cartCountElement.style.display = "flex";
    }
  }
}

export function alertMessage(message, scroll=true) {

  //Create element for alert
  const alert = document.createElement("div");
  alert.classList.add("alert");
  alert.innerHTML = `<p>${message}</p><span>X</span>`;

  // Add listener to the alert
  alert.addEventListener("click", function(e) {
    if (e.target.tagName === "SPAN") {
    main.removeChild(this);
    }
  });

  // Add the alert to the top of main
  const main = document.querySelector('main');
  main.prepend(alert);

  if (scroll) {
    window.scrollTo(0, 0);
  }
}
