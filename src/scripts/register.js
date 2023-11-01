import { RegisterFormValidator } from "./register-form-validator.js"

const registerForm = document.querySelector('[data-form-submit]')

registerForm.addEventListener('click', RegisterFormValidator.handleSubmit)