// checks all changes that occur in amount input
const amount = document.getElementById("amount")

amount.oninput = () => {
  // replace any non-numeric value with nothing
  let value = amount.value.replace(/\D/g, "")

  // converts values ​​to cents
  value = Number(value)/100

  amount.value = formatCurrencyBRL(value)
}

// formats the value in BRL standard
function formatCurrencyBRL(value) {
    value = value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    })
   return value
}
