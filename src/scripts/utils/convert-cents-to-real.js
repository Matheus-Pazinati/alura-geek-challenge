export function convertCentsToReal(centsAmount) {
  return (centsAmount / 100).toLocaleString("pt-BR", { style: 'currency', currency: 'BRL' })
}