const form = document.querySelector("form")
const amount = document.getElementById("amount")
const expense = document.getElementById("expense")
const category = document.getElementById("category")

// checks all changes that occur in amount input
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

// Capture the form submit event to get the values.
form.onsubmit = (event) => {
  // Prevents the browser's default behavior of reloading the page when we submit the form.
  event.preventDefault()

  // Creates an object with the details of the new expense.
  const newExpense = {
    id: new Date().getTime(),
    expense: expense.value,
    category_id: category.value,
    category_name: category.options[category.selectedIndex].text,
    amount: amount.value,
    created_at: new Date(),
  }
  console.log(newExpense)
}