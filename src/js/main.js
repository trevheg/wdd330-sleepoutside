import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { updateCartCount, loadHeaderFooter } from "./utils.mjs";

const element = document.querySelector(".product-list");

const productData = new ProductData("tents");
const productList = new ProductList("tents", productData, element);

productList.init();
loadHeaderFooter();
updateCartCount();
