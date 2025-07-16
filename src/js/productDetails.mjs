import { getLocalStorage, setLocalStorage } from "./utils.mjs";

export default class ProductDetails {
    constructor(productId, dataSource){
        this.productId = productId;
        this.product = {};
        this.dataSource = dataSource;
    }

    //Original code
    // async init(){
    //     this.product = await this.dataSource.findProductById(this.productId);
    //     this.renderProductDetails();

    //     document
    //     .getElementById("addToCart")
    //     .addEventListener("click", this.addProductToCart.bind(this));
    // }

    async init(){
        this.product = await this.dataSource.findProductById(this.productId);

        if (!this.product) {
          console.error(`Product with ID "${this.productId}" not found.`);
          // Optionally, show a message in the UI or redirect
          return;  // Stop further execution
        }

        this.renderProductDetails();

        document
          .getElementById("addToCart")
          .addEventListener("click", this.addProductToCart.bind(this));
    }


    addProductToCart(){
        const cartItems = getLocalStorage("so-cart") || [];
        cartItems.push(this.product);
        setLocalStorage("so-cart", cartItems); 
    }


    renderProductDetails(){
        productDetailsTemplate(this.product);
    }

}
    

function productDetailsTemplate(product) {
  // ... your existing checks before

  const productImage = document.getElementById("productImage");
  if (productImage) {
    productImage.src = product.Image || "default-image.jpg";
    productImage.alt = product.NameWithoutBrand || "Product Image";
  } else {
    console.warn("Missing #productImage element in the DOM.");
  }

  // Continue with other elements similarly...
}