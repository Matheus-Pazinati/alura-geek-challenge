import { openCloseSearchBox } from "./open-close-searchbox.js";
openCloseSearchBox()

function readImage(file) {
  return URL.createObjectURL(file);
}

function showImageOnContainer(image) {
  let imageContainer = document.getElementById('image-container')
  imageContainer.innerHTML = ''
  imageContainer.style.background = `url(${readImage(image)}) no-repeat center/cover`
}

function loadImageFromInput() {
  let inputFile = document.querySelector('input[type=file]')
  inputFile.addEventListener('change', () => {
    let image = inputFile.files[0]
    showImageOnContainer(image)
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
    showImageOnContainer(fileList[0])
  })
}

loadImageFromInput()
dragAndDropImages()