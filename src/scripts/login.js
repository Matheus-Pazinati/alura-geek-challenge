import { FormValidator } from "./form-validator.js";
import { openCloseSearchBox } from "./open-close-searchbox.js";

openCloseSearchBox()

const loginButton = document.querySelector('[data-button-submit]')
loginButton.addEventListener('click', (event) => {
  FormValidator.handleSubmit(event, authenticateUser)
})

async function authenticateUser(inputs) {
  const formValues = inputs.reduce((acc, current) => {
    acc[current.id] = current.value
    return acc
  }, {
    email: '',
    password: '',
  })

  const response = await fetch("http://localhost:3000/authentication", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: 'include',
    body: JSON.stringify(formValues)
  })

  const jsonResponse = await response.json()

  if (!response.ok) {
    if (response.status == 401) {
      FormValidator.showInputError(
        document.getElementById(jsonResponse.path),
        jsonResponse.message
      )
      throw new Error(jsonResponse.message)
    }
  } else {
    window.location.href="admin-home.html"
  }
}