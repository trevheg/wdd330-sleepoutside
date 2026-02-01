import { getParam, loadHeaderFooter } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import ProductDetails from "./ProductDetails.mjs";

loadHeaderFooter();

const dataSource = new ExternalServices();
const productID = getParam("product");

const product = new ProductDetails("so-cart", productID, dataSource);
product.init();
