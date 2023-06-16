import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { ActivatedRoute, NavigationExtras } from '@angular/router';
import { LoginService } from '../Services/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
 

  constructor(private route: ActivatedRoute, private service: LoginService) { }

  ngOnInit() {
  }
  openInvestments(){
    this.service.investments().subscribe(()=>{
      console.log("get loans");
    })
  }

  openSavings(){
    this.service.savings().subscribe(() => {
      console.log("get savings");
    });
}
}