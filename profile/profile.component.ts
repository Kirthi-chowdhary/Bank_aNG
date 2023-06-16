import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any;
  cardArray: any= [];
  currentUserards: any= [];
 

  constructor() { }

  ngOnInit() {
    let userData = localStorage.getItem('currentUser');
    this.user = userData ? JSON.parse(userData) : {};
   

    let storedcard = localStorage.getItem('Cards');
    this.cardArray = storedcard ? JSON.parse(storedcard) : [];

    this.currentUserards = this.cardArray.filter((CARDS: any) => {
      console.log(this.user.account)

      return CARDS.account == this.user.account;
    });
    console.log(this.currentUserards)
  }
  

}