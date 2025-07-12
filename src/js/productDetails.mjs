import { getLocalStorage, setLocalStorage } from "./utils.mjs";

export default class ProductDetails {
    constructor(productId, dataSource){
        this.productId = productId;
        this.productId = {};
        this.dataSource = dataSource;
    }


    async init(){
        this.product = await this.dataSource.findProductById(this.productId);
        this.renderProductDetails();

        document
        .getElementById('addToCart')
        .addEventListener('click', this.addProductToCart.bind(this));
    }

    addProductToCart(){
        const cartItems = getLocalStorage("so-cart") || [];
        cartItems.push(this.product);
        setLocalStorage("so-cart", cartItems); 
    }


    renderProductDetails(){
        producDetailsTemplate(this.product);
    }

}
    
    
    function producDetailsTemplate(product) {
        document.querySelector('h2').textContent = product.Brand.Name;
        document.querySelector('h3').textContent = product.NameWithoutBrand;

        const productImage = document.getElementById('productImage');
        productImage.src = product.Image;
        productImage.alt = product.NameWithoutBrand;

        document.getElementById('productPrice').textContent = product.FinalPrice;
        document.getElementById('productColor').textContent = product.Color[0].ColorName;
        document.getElementById('productDesc').innerHTML = product.DescriptionHtmlSimple;


        document.getElementById('addToCart').dataset.id = product.Id;
    }