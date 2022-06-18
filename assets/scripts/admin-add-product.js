import { openCloseSearchBox } from "./open-close-searchbox.js";
openCloseSearchBox()

let uploadedImageURL;

function readImage(file) {
  uploadedImageURL = URL.createObjectURL(file);
  let imageContainer = document.getElementById('image-container')
  imageContainer.innerHTML = ''
  imageContainer.style.background = `url(${uploadedImageURL}) no-repeat center/cover`
}

function loadImageFromInput() {
  let inputFile = document.querySelector('input[type=file]')
  inputFile.addEventListener('change', () => {
    let image = inputFile.files[0]
    readImage(image)
  })
}

function dragAndDropImages() {
  let imageContainer = document.getElementById('image-container')
  imageContainer.addEventListener('dragover', (event) => {
    event.stopPropagation();
    event.preventDefault();
    event.dataTransfer.dropEffect = 'copy';
  })
  imageContainer.addEventListener('drop', (event) => {
    event.stopPropagation();
    event.preventDefault();
    const fileList = event.dataTransfer.files;
    readImage(fileList[0])
  })
}

loadImageFromInput()
dragAndDropImages()