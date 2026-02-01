import { getLocalStorage, setLocalStorage, updateCartCount, alertMessage } from "./utils.mjs";

export default class ProductDetails {

    constructor(key, productId, dataSource) {
        // The name of the key  of the saved information in localStorage
        this.key = key;
        // the id of the product
        this.productId = productId;
        this.product = {};
        // an object with methods for fetching data from APIs and returning either data on a category of products or a single product. 
        this.dataSource = dataSource;
    }

    async init() {
        this.product = await this.dataSource.findProductById(this.productId);
        this.renderProductDetails();
        document
            .getElementById('addToCart')
            .addEventListener('click', this.addProductToCart.bind(this));
    }

    addProductToCart() {
        const cartItems = getLocalStorage(this.key) || [];

        cartItems.push(this.product);
        setLocalStorage(this.key, cartItems);

        updateCartCount();

          // Remove any existing alerts first
        const existingAlert = document.querySelector(".alert");
        if (existingAlert) {
            existingAlert.remove();
        }
        alertMessage(`Successfully added to cart!`, true);
    }

    renderProductDetails() {
        productDetailsTemplate(this.product);
    }

}

// edits the page to match the details of the product contained in the parameter object
function productDetailsTemplate(product) {
    document.querySelector('h2').textContent = product.Brand.Name;
    document.querySelector('h3').textContent = product.NameWithoutBrand;

    const productImage = document.getElementById('productImage');
    productImage.src = product.Images.PrimaryLarge;
    productImage.alt = product.NameWithoutBrand;

    document.getElementById('productPrice').textContent = "$" + product.FinalPrice;
    document.getElementById('productColor').textContent = product.Colors[0].ColorName;
    document.getElementById('productDesc').innerHTML = product.DescriptionHtmlSimple;

    document.getElementById('addToCart').dataset.id = product.Id;
}