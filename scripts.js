// checks all changes that occur in amount input
const amount = document.getElementById("amount")

amount.oninput = () => {
  // replace any non-numeric value with nothing
  let value = amount.value.replace(/\D/g, "")
  amount.value = value
}
