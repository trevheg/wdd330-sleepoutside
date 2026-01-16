import { getLocalStorage, setLocalStorage, getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";


class ProductDetails {
    constructor(productId, dataSource){
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
    }

    async init() {
    // use the datasource to get the details for the current product. findProductById will return a promise! use await or .then() to process it
    this.product = await this.dataSource.findProductById(this.productId);
    this.render();
    
    // the product details are needed before rendering the HTML
    this.renderProductDetails(this.product);
    // once the HTML is rendered, add a listener to the Add to Cart button
    
    // Notice the .bind(this). This callback will not work if the bind(this) is missing. Review the readings from this week on 'this' to understand why.

    document.getElementById('addToCart')
    .addEventListener('click', this.addToCart.bind(this));
    }

}


function addProductToCart(product) {
  const cart = getLocalStorage("so-cart") || [];
  cart.push(product);
  setLocalStorage("so-cart", cart);
}

function renderProductDetails(product) {}