import { RegisterFormValidator } from "./register-form-validator.js"

const registerForm = document.querySelector('[data-form-register]')

registerForm.addEventListener('submit', RegisterFormValidator.handleSubmit)