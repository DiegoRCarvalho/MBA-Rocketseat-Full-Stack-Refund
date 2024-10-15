//  Selects the form elements.
const form = document.querySelector("form")
const amount = document.getElementById("amount")
const expense = document.getElementById("expense")
const category = document.getElementById("category")

// Selects elements from the list.
const expenseList = document.querySelector("ul")

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
  expenseAdd(newExpense)
}

// call the function that will create the item in the list.
function expenseAdd(newExpense) {
  try {
    // Create the element to add to the list.
    const expenseItem = document.createElement("li")
    // Add list style class.
    expenseItem.classList.add("expense")

    // Create image element.
    const expenseIcon = document.createElement("img")
    // Set image attributes dynamically.
    expenseIcon.setAttribute("src", `img/${newExpense.category_id}.svg`)
    expenseIcon.setAttribute("alt", newExpense.category_name)

    const expenseInfo = document.createElement("div")
    expenseInfo.classList.add("expense-info")

    const expenseName = document.createElement("strong")
    expenseName.textContent = newExpense.expense

    const expenseCategory = document.createElement("span")
    expenseCategory.textContent = newExpense.category_name
    

    // Add name and category in expense-info div.
    expenseInfo.append(expenseName, expenseCategory)

    // Add the information to the item.
    expenseItem.append(expenseIcon, expenseInfo)

    // Add the item (li) to list (ul).
    expenseList.append(expenseItem)

  } catch (error) {
    console.log(error)
  }
}