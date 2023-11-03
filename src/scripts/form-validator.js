export const FormValidator = {
  handleSubmit: async function (event, submitFormCallback) {
    event.preventDefault()
    FormValidator.clearErrorsMessages()
    let canSubmitForm = true

    const formInputs = Array.from(document.querySelectorAll('[data-form-input]'))
    formInputs.forEach((input) => {
      const inputIsValid = FormValidator.validateInput(input)

      if (inputIsValid !== true) {
        canSubmitForm = false
        FormValidator.showInputError(input, inputIsValid.messageError)
      }
    })
    if (canSubmitForm) {
      await submitFormCallback(formInputs)
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
            if (input.value.length > ruleDetails[1]) {
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
  }
}