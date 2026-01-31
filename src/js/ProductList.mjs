import {renderListWithTemplate} from "./utils.mjs";

function productCardTemplate(product) {

    // determines if there is a discount on the item and prepares a message of "x% Off!"
    const discountPercent = product.FinalPrice < product.SuggestedRetailPrice ? `${parseInt(100 * ((product.SuggestedRetailPrice - product.FinalPrice)/product.SuggestedRetailPrice))}% Off!` : "";

        
  return `
    <li class="product-card">
        <a href="../product_pages/?product=${product.Id}">
        <img src="${product.Images.PrimaryMedium}" alt="Image of ${product.NameWithoutBrand}">
        <h2 class="card__brand">${product.Brand.Name}</h2>
        <h3 class="card__name">${product.Name}</h3>
        <p class="product-card__price">$${product.FinalPrice} <span class="discount">${discountPercent}</span></p>
        </a>
    </li>
    `;
}

export default class ProductList {
    constructor(category, dataSource, listElement) {
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
    }

    async init() {
        // get the list of products of the given category which contains all the information on those products 
        const list = await this.dataSource.getData(this.category); 
        this.renderList(list);
        // Show what category is being displayed. 
        document.querySelector(".title").textContent = this.category.charAt(0).toUpperCase() + this.category.slice(1);
    }

    renderList(list) {
        renderListWithTemplate(productCardTemplate, this.listElement, list)
    }
}