import { getParam, loadHeaderFooter } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";

loadHeaderFooter();

// This class has methods that fetch information from an API about a "category" of product, and about a single product given its id. 
const dataSource = new ProductData();
// gets the product id from the query string in the url
const productID = getParam("product");

const product = new ProductDetails("so-cart", productID, dataSource);
product.init();
