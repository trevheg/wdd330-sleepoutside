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
        this.renderProductDetails("main");

        document
          .getElementById("add-to-cart")
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

  document.querySelector("h2").textContent = product.Category.charAt(0).toUpperCase() + product.Category.slice(1);
  document.querySelector("#p-brand").textContent = product.Brand.Name;
  document.querySelector("#p-name").textContent = product.NameWithoutBrand;
  // ... your existing checks before

  const productImage = document.querySelector("#p-image");
  productImage.src = product.Images.PrimaryExtraLarge;
  productImage.alt = product.NameWithoutBrand;
  const euroPrice = new Intl.NumberFormat('de-DE',
    {
      style: 'currency', currency: 'EUR',
    }).format(Number(product.FinalPrice) * 0.85);
    document.querySelector("#p-price").textContent = `${euroPrice}`;
    document.querySelector("#p-color").textContent = product.Colors[0].ColorName;
    document.querySelector("#p-description").innerHTML = product.DescriptionHtmlSimple;
    document.querySelector("#add-to-cart").dataset.id = product.Id;

  // Continue with other elements similarly...
}