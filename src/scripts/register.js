import { FormValidator } from "./form-validator.js"
import { showSuccessAlert } from "./alerts/alert.js"

const registerForm = document.querySelector('[data-form-submit]')

registerForm.addEventListener('click', (event) => {
  FormValidator.handleSubmit(event, submitForm)
})

async function submitForm(inputs) {
  const formValues = inputs.reduce((acc, current) => {
    acc[current.id] = current.value
    return acc
  }, {
    username: '',
    email: '',
    password: '',
    passwordConfirm: ''
  })

  const response = await fetch("http://localhost:3000/users", {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: formValues.username,
      email: formValues.email,
      password: formValues.password,
      passwordConfirm: formValues.passwordConfirm
    })
  })

  if (!response.ok) {
    if (response.status == 409) {
      const jsonResponse = await response.json()
      FormValidator.showInputError(
        document.getElementById(jsonResponse.path),
        jsonResponse.message
      )
      throw new Error(jsonResponse.message)
    }
  } else {
    showSuccessAlert(
      'Cadastro realizado com sucesso!',
      'Faça login no site.'
    )
    FormValidator.clearFields(inputs)
  }

}