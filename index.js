localStorage.setItem('budget', 0);

class Transaction {
    constructor(price, type, date, notes) {
        this.price = price;
        this.type = type;
        this.date = date;
        this.notes = notes;
    }
}

let createBudget = (userbudget) => localStorage.setItem('budget', userbudget);

let changeBudget = () => {
    let budget = document.getElementById('budgetInput').value; 
    createBudget(budget);
    let budgetamt = localStorage.getItem('budget');
    console.log(budgetamt);
    let budgetdiv = document.getElementById("budgetDisplay");
    budgetdiv.innerText = `Budget: $${budgetamt}`;
};

let transactions = [];

function addTransaction() {
    let price = parseFloat(document.getElementById('price').value);
    let type = document.getElementById('type').value;
    let date = document.getElementById('date').value;
    let notes = document.getElementById('notes').value;

    let currentBudget = parseFloat(localStorage.getItem('budget'));

    if (type === "expense") {
        currentBudget -= price;
    } else if (type === "income") {
        currentBudget += price;
    }

    localStorage.setItem('budget', currentBudget);
    let budgetDiv = document.getElementById("budgetDisplay");
    if (budgetDiv) {
        budgetDiv.innerText = `Budget: $${currentBudget}`;
    }

    createTransaction(price, type, date, notes);
    document.getElementById('transactionForm').reset();
}

function showTransactions() {
    let transactions = retrieveAllTransactions();
    let tableBody = document.getElementById('transactionsDetail');
    tableBody.innerHTML = '';

    transactions.forEach(transaction => {
        let tablerow = `<tr>
            <td>${transaction.price}</td>
            <td>${transaction.type}</td>
            <td>${transaction.date}</td>
            <td>${transaction.notes}</td>
        </tr>`;
        tableBody.innerHTML += tablerow;
    });
}
let createTransaction = (price,type,date,notes)=>{
    let transaction= new Transaction(price,type,date,notes);
    transactions.push(transaction);
    localStorage.setItem('transactions',JSON.stringify(transactions));
}
let retrieveAllTransactions = ()=>{
    let retrievedtransaction = localStorage.getItem('transactions');
    return retrievedtransaction ? JSON.parse(retrievedtransaction):[];
}
let getTransactionbyType = (type)=>{
    let transactions = retrieveAllTransactions();
    return transactions.filter(transaction=>transaction.type===type);
}
let getTransactionbyDate = (date)=>{
    let transactions = retrieveAllTransactions();
    return transactions.filter(transaction=>transaction.date===date);
}
let filterTransactionsbyDate = (mindate,maxdate)=>{
    let transactions = retrieveAllTransactions();
    return transactions.filter(transaction=>(transaction.date>mindate&&transaction.date<maxdate));
}
let filterTransactionsbyPrice = (minprice, maxprice) => {
    let transactions = retrieveAllTransactions();
    return transactions.filter(transaction => 
        transaction.price >= minprice && transaction.price <= maxprice // Corrected condition
    );
}
let getTransactionbyPrice = (date)=>{
    let transactions = retrieveAllTransactions();
    return transactions.filter(transaction=>transaction.price===price);
}

let filterByType =()=> {
    let type = document.getElementById('filterType').value;
    let filteredtransaction = getTransactionbyType(type);
    displayFilteredTransactions(filteredtransaction);
}

let filterByDate=()=> {
    let date = document.getElementById('filterDate').value;
    let filteredtransaction = getTransactionbyDate(date);
    displayFilteredTransactions(filteredtransaction);
}

let filterByPrice = () =>{
    let minPrice = parseFloat(document.getElementById('minPrice').value);
    let maxPrice = parseFloat(document.getElementById('maxPrice').value);
    let filteredtransaction = filterTransactionsbyPrice(minPrice, maxPrice);
    displayFilteredTransactions(filteredtransaction);
}
let displayFilteredTransactions = (transactions) => {
    let tableBody = document.getElementById('transactionsDetail');
    tableBody.innerHTML = '';

    transactions.forEach(transaction => {
        let row = `<tr>
            <td>${transaction.price}</td>
            <td>${transaction.type}</td>
            <td>${transaction.date}</td>
            <td>${transaction.notes}</td>
        </tr>`;
        tableBody.innerHTML += row;
    });

}
function clearMemory() {
    localStorage.removeItem('budget');
    localStorage.removeItem('transactions');
    transactions = []; 
    let budgetDiv = document.getElementById("budgetDisplay");
    budgetDiv.innerText = '';
    let tableBody = document.getElementById('transactionsDetail');
    tableBody.innerHTML = '';
}