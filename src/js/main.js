import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { updateCartCount } from "./utils.mjs";

const element = document.querySelector(".product-list");

const productData = new ProductData("tents");
const productList = new ProductList("tents", productData, element);

productList.init();
document.addEventListener("DOMContentLoaded", updateCartCount);
