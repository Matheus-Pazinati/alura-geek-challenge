export function showSuccessAlert(title, text) {
  return Swal.fire({
    title: `${title}`,
    text: `${text}`,
    icon: 'success'
  })
}

export function showErrorAlert(title, text) {
  return Swal.fire({
    title: `${title}`,
    text: `${text}`,
    icon: 'error'
  })
}