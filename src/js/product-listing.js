import { loadHeaderFooter, getParam } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";

loadHeaderFooter();

// Get the category from the url
const category = getParam("category");
// Make a ExternalServices object
const productData = new ExternalServices();
// Find the element on the page where you want to render the list
const element = document.querySelector(".product-list");
// create a new ProductList class with the required information
const productList = new ProductList(category, productData, element);
// Render the products on the page
productList.init();
