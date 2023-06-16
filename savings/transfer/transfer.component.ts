import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css'],
})
export class TransferComponent implements OnInit {
  acno!: string;
  fname!: string;
  mname!: string;
  lname!: string;
  transferAmount!: number;
  transactionArray: any;
  accountNumber!: number;
  user: any;
  balance: number = 0;
  totalBalance: number = 0;
  userTransactions: any=[];

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
    console.log(this.accountNumber);
    console.log(this.transferAmount);

    if(this.transferAmount< this.totalBalance){
      console.log('inside if')
      let timestamp = new Date();

    const withdrawal = {
      date:
        timestamp.getDate() +
        '/' +
        (timestamp.getMonth() + 1) +
        '/' +
        timestamp.getFullYear(),
      credit: '',
      debit: this.transferAmount,
      AcNo: this.acno,
    };

    this.transactionArray.push(withdrawal);
    localStorage.setItem('Transactions', JSON.stringify(this.transactionArray));

   
    if (this.accountNumber) {
      const storedData = localStorage.getItem('userDetails');
      console.log('storedData:', storedData);
      if (storedData) {
        const userData = JSON.parse(storedData);
        console.log('userData:', userData);
        const transfer = userData.find((user: any) => {
          return user.account === String(this.accountNumber);
        });
        console.log('transfer:', transfer.account);

        if (transfer) {
          console.log();
          const deposit = {
            date:
              timestamp.getDate() +
              '/' +
              (timestamp.getMonth() + 1) +
              '/' +
              timestamp.getFullYear(),
            credit: this.transferAmount,
            debit: '',
            
            AcNo: transfer.account,
          };

          this.transactionArray.push(deposit);
          localStorage.setItem(
            'Transactions',
            JSON.stringify(this.transactionArray)
          );

          
        }
      }
      

    }
    }else{
      alert("Insufficient Balance")
    }
    

  }

}
