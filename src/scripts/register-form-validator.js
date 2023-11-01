import { showSuccessAlert } from "./alerts/alert.js"

export const RegisterFormValidator = {
  handleSubmit: (event) => {
    event.preventDefault()
    RegisterFormValidator.clearErrorsMessages()
    let canSubmitForm = true

    const formInputs = Array.from(document.querySelectorAll('[data-form-input]'))
    formInputs.forEach((input) => {
      const inputIsValid = RegisterFormValidator.validateInput(input)

      if (inputIsValid !== true) {
        canSubmitForm = false
        RegisterFormValidator.showInputError(input, inputIsValid.messageError)
      }
    })
    if (canSubmitForm) {
      RegisterFormValidator.submit(formInputs)
      showSuccessAlert(
        'Cadastro realizado com sucesso!',
        'Faça login no site.'
      )
      RegisterFormValidator.clearFields(formInputs)
    }
  },
  validateInput: (input) => {
    let rulesList = input.getAttribute('data-rules')
    if (rulesList !== null) {
      rulesList = rulesList.split('|')
      for (let rule in rulesList) {
        let ruleDetails = rulesList[rule].split('=')
        switch(ruleDetails[0]) {
          case 'required':
            if (input.value == '') {
              return {
                messageError: 'Este campo não pode ser vazio!'
              }
            }
            break;
          case 'min':
            if (input.value.length < ruleDetails[1]) {
              return {
                messageError: `Este campo precisa ter no mínimo ${ruleDetails[1]} caracteres!`
              }
            }
            break;
          case 'max':
            if (input.value.lenght > ruleDetails[1]) {
              return {
                messageError: `Este campo pode ter no máximo ${ruleDetails[1]} caracteres!`
              }
            }
            break
          case 'password':
            const firstPasswordField = document.getElementById('password')
            if (input.value !== firstPasswordField.value) {
              return {
                messageError: "As senhas devem ser iguais!"
              }
            }
            break
          case 'email':
            let emailRegex = new RegExp('^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+).(\.[a-z]{2,3})$')
            if (!emailRegex.test(input.value)) {
              return {
                messageError: "E-mail inválido!"
              }
            }
        }
      }
    }
    return true
  },
  showInputError: (input, errorMessage) => {
    input.style.borderColor = "#FF4030"
    let errorMessageBox = document.createElement('div')
    errorMessageBox.classList.add('error')
    errorMessageBox.innerHTML = errorMessage
    input.parentElement.insertBefore(errorMessageBox, null)
  },
  clearErrorsMessages: () => {
    const formInputs = Array.from(document.querySelectorAll('[data-form-input]'))
    formInputs.forEach((input) => {
      input.style.borderColor = "#868686"
    })
    const errorsBoxes = document.querySelectorAll(".error")
    errorsBoxes.forEach((box) => {
      box.remove()
    })
  },
  clearFields: (inputs) => {
    inputs.forEach((input) => {
      input.value = ""
    })
  },
  submit: (inputs) => {
    const formValues = inputs.reduce((acc, current) => {
      acc[current.id] = current.value
      return acc
    }, {
      username: '',
      email: '',
      password: '',
      passwordConfirm: ''
    })

    fetch("http://localhost:3000/users", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: formValues.username,
        email: formValues.email,
        password: formValues.password,
        passwordConfirm: formValues.passwordConfirm
      }),
    })
  }
}