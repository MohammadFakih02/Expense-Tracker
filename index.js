
class Transaction{
    constructor(price,type,date,notes){
        this.price=price;
        this.type=type;
        this.date=date;
        this.notes=notes;
    }
}

let transactions=[];

let createBudget = userbudget => localStorage.setItem(budget, userbudget);
let createTransaction = (price,type,date,notes)=>{
    let transaction= new Transaction(price,type,data,notes);
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
let filterTransactionsbyPrice = (minprice,maxprice)=>{
    let transactions = retrieveAllTransactions();
    return transactions.filter(transaction=>transaction.price>minprice&&transaction<maxprice);
}
let getTransactionbyPrice = (date)=>{
    let transactions = retrieveAllTransactions();
    return transactions.filter(transaction=>transaction.price===price);
}