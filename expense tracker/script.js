document.addEventListener('DOMContentLoaded',()=>{
  const expenseForm = document.getElementById("expense-form");
  const expenseName = document.getElementById("expense-name");
  const expenseAmount = document.getElementById("expense-amount");
  const expenseList = document.getElementById("expense-list");
  const totalAmount = document.getElementById("total-amount");
  
  let expenses = JSON.parse(localStorage.getItem('expenses'))||[];

  function saveItems (){
    localStorage.setItem("expenses",JSON.stringify(expenses));
  }
  expenseForm.addEventListener('submit',(e)=>{
     e.preventDefault();
     addToExpense();
  })
  function addToExpense (){
    const name = expenseName.value.trim();
    const amount = parseFloat(expenseAmount.value);
    if(name!="" & !isNaN(amount) & amount>0){
      const newExpense = {
        id : Date.now(),
        name:name,
        amount
      };
      expenses.push(newExpense);
      saveItems();
      expenseName.value="";
      expenseAmount.value="";
      RenderExpenses();
    }
  }
  function RenderExpenses (){
    expenseList.innerHTML=""; 
   expenses.forEach((expense)=>{
      const expenseLi =  document.createElement("li");
      expenseLi.classList.add("expense");
      expenseLi.innerHTML = `<span>${expense.name}   =    $${expense.amount}</span>
                             <button data-id="${expense.id}" class="btn">Delete</button>`;
      expenseList.appendChild(expenseLi);
   });
   UpdatePrices();
  }
  function RenderPrices (){
    return expenses.reduce((sum,currentValue)=>sum + currentValue.amount,0);
  }
  function UpdatePrices (){
    const Amount = RenderPrices();
    totalAmount.textContent = `${Amount.toFixed(2)}`;
  }
  expenseList.addEventListener('click',(e)=>{
    if(e.target.tagName==='BUTTON'){
      const TargetId = parseInt(e.target.getAttribute('data-id'));
      expenses = expenses.filter((expense)=>expense.id !== TargetId);
      saveItems();
      RenderExpenses();
    }
  })



  RenderExpenses();
})