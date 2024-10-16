//  Selects the form elements.
const form = document.querySelector("form")
const amount = document.getElementById("amount")
const expense = document.getElementById("expense")
const category = document.getElementById("category")

// Selects elements from the list.
const expenseList = document.querySelector("ul")
const expensesTotal = document.querySelector("aside header h2")
const expenseQuantity = document.querySelector("aside header p span")

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
    
    const expenseAmount = document.createElement("span")
    expenseAmount.classList.add("expense-amount")
    
    // Create a span with R$ for formatting purposes and remove the R$ that comes in the value of newExpense.amount.
    expenseAmount.innerHTML = `<small>R$</small>${newExpense.amount.toUpperCase().replace("R$", "")}`

    const removeIcon = document.createElement("img")
    removeIcon.classList.add("remove-icon")
    removeIcon.setAttribute("src", "/img/remove.svg")
    removeIcon.setAttribute("alt", "remover")

    // Add name and category in expense-info div.
    expenseInfo.append(expenseName, expenseCategory)

    // Add the information to the item.
    expenseItem.append(expenseIcon, expenseInfo, expenseAmount, removeIcon)

    // Add the item (li) to list (ul).
    expenseList.append(expenseItem)

    // Updates the totals
    updateTotals()


  } catch (error) {
    console.log(error)
  }
}

function updateTotals(){
  try {
    // Check how many children the UL element has, thus finding out the number of items in the list.
    const items = expenseList.children    
     expenseQuantity.textContent = `${items.length} ${items.length > 1 ? "despesas" : "despesa"}`

    // Go through the items on the list, adding up the expenses.
    let total = 0
    for (let item = 0; item < items.length; item++) {
      const itemAmount = items[item].querySelector(".expense-amount")

      //  Remove non-numeric characters and replace comma with period.
      let value = itemAmount.textContent.replace(/[^\d,]/g, "").replace(",", ".")
      value = parseFloat(value)

      total += Number(value)
    }

    // Create smal with stylized R$.
    const symbolBRL = document.createElement("small")
    symbolBRL.textContent = "R$"

    // Formats the total and removes the R$
    total = formatCurrencyBRL(total).toUpperCase().replace("R$", "")

    //  Clear element content.
    expensesTotal.innerHTML = ""

    expensesTotal.append(symbolBRL, total)

  } catch (error) {
    console.log(error)
  }
}

// Capture the click event on list items.
expenseList.addEventListener("click", function(event){

  // Check if the element clicked is the remove icon.
  if (event.target.classList.contains("remove-icon")) {
    
    // Gets the parent li of the clicked element.
    const item = event.target.closest(".expense")
    item.remove()
  }

  updateTotals()

})