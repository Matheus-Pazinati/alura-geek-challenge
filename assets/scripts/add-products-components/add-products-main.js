import { openCloseSearchBox } from "../open-close-searchbox.js";
import { loadImageFromInput } from './load-image-input.js';
import { dragAndDropImages } from './load-image-dragndrop.js'

openCloseSearchBox()
loadImageFromInput()
dragAndDropImages()

let headerTemplate = {
  'X-Api-Version': '3',
  'Authorization': 'Bearer e16fc5dad5efc05d18c48a26a709ac',
  'Accept': 'application/json',
  'Content-Type': 'application/vnd.api+json'
};
async function getAWSUploadUrl() {
  const productImage = document.querySelector('[data-input-image]')
  const requestAwsUrl = await fetch('https://site-api.datocms.com/upload-requests', {
    method: 'POST',
    headers: headerTemplate,
    body: JSON.stringify({
      data: {
        type: 'upload_request',
        attributes: {
          filename: `${productImage.files[0].name}`
        }
      }
    })
  })
  const requestResponse = await requestAwsUrl.json()
  return requestResponse
}

function addNewProduct() {
  const productName = document.querySelector('[data-input-name]')
  const productCategory = document.querySelector('[data-input-category]')
  const productPrice = document.querySelector('[data-input-price]')
  const productDescription = document.querySelector('[data-input-description]')

  fetch('https://site-api.datocms.com/items', {
    method: 'POST',
    headers: headerTemplate,
    body: JSON.stringify({
      data: {
        type: 'item',
        attributes: {
          name: `${productName.value}`,
          category: `${productCategory.value}`,
          price: `${productPrice.value}`,
          description: `${productDescription.value}`
        },
        relationships: {
          item_type: {
            data: {
              type: 'item_type',
              id: '489314'
            }
          }
        }
      }
    })
  })
}

let form = document.querySelector('[data-form]')
form.addEventListener('submit', (event) => {
  event.preventDefault()
  addNewProduct()
  getAWSUploadUrl()
})