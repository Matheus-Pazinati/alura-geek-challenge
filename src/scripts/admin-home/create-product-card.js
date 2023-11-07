import { convertCentsToReal } from "../utils/convert-cents-to-real.js"

export function createProductCard(product) {
  const cardContainer = document.createElement('li')
  cardContainer.classList.add('products__card')
  cardContainer.innerHTML = `
    <div class="card__image">
      <img src=${product.image_url} alt="">
      <div class="card__icons">
        <i class="icon-delete card__icon"></i>
        <i class="icon-create card__icon"></i>
      </div>
    </div>
    <h4 class="card__title">${product.name}</h4>
    <p class="card__price">${convertCentsToReal(product.price)}</p>
    <p class="card__description">${product.description}</p>
  `

  return cardContainer
}