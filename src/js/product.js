import { getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";


const dataSource = new ProductData("tents");
const productID = getParam("product")?.trim();

if (!productID) {
  console.error("Product ID missing from URL");
  // Optionally, display an error message to the user or redirect them
} else {
  const product = new ProductDetails(productID, dataSource);
  product.init();
}

// add to cart button event handler
// async function addToCartHandler(e) {
//   const product = await dataSource.findProductById(e.target.dataset.id);
//   addProductToCart(product);
// }

// // add listener to Add to Cart button
// document
//   .getElementById("addToCart")
//   .addEventListener("click", addToCartHandler);
//this is a proof