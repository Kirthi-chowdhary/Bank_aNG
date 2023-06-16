import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-withdrawl',
  templateUrl: './withdrawl.component.html',
  styleUrls: ['./withdrawl.component.css'],
})
export class WithdrawlComponent implements OnInit {
  acno!: string;
  fname: string | undefined;
  mname!: string;
  lname!: string;
 
  withdrawalAmount!: number;
  transactionArray: any=[];
  user: any;
  userTransactions: any;
  balance: number = 0;
  totalBalance: number = 0;


  constructor() {}

  ngOnInit() {
    let userData = localStorage.getItem('currentUser');
    this.user = userData ? JSON.parse(userData) : {};
  
    if (userData) {
      const userdata = JSON.parse(userData);
      this.acno = userdata.account;
      this.fname = userdata.firstName;
      this.mname = userdata.middleName;
      this.lname = userdata.lastName;
    }
  
    const storedTransactions = localStorage.getItem('Transactions');
    this.transactionArray = storedTransactions
      ? JSON.parse(storedTransactions)
      : [];
    let currentUserTransactions = this.transactionArray.filter(
        (transaction: any) => {
          return transaction.AcNo === this.user.account;
        }
      );
    
      this.userTransactions = currentUserTransactions.map((transaction: any) => {
        if (transaction.credit) {
          this.totalBalance += Number(transaction.credit);
          this.balance = this.totalBalance;
          return (transaction = { ...transaction,balance: this.balance });
        } else if (transaction.debit) {
          this.totalBalance -= transaction.debit;
          this.balance = this.totalBalance;
          return (transaction = { ...transaction,balance: this.balance });
        }
      });
   
  
    
  }
  
  submitForm() {
    console.log(this.withdrawalAmount);
    console.log(this.totalBalance)
    
    if(this.withdrawalAmount< this.totalBalance)
    {
      let timestamp = new Date();

    const withdrawal = {
      date:
        timestamp.getDate() +
        '/' +
        (timestamp.getMonth() + 1) +
        '/' +
        timestamp.getFullYear(),
      credit: '',
      debit: this.withdrawalAmount,
    
      AcNo: this.acno,
    };

    this.transactionArray.push(withdrawal);
    localStorage.setItem('Transactions', JSON.stringify(this.transactionArray));
    }
    else{
      alert("Insufficient Balance")
    }  

  }

  
}
