import { openCloseSearchBox } from "../open-close-searchbox.js";
import { createProductCard } from "./create-product-card.js";

openCloseSearchBox()
getOwnerProducts()

async function getOwnerProducts() {
  const response = await fetch("http://localhost:3000/products/owner-products", {
    method: 'GET',
    credentials: 'include'
  })

  const ownerProducts = await response.json()

  const productsContainer = document.querySelector('[data-products-container]')
  ownerProducts.forEach((product) => {
    const productCard = createProductCard(product)
    productsContainer.appendChild(productCard)
  })
}