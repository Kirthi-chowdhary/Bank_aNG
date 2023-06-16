import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-investments',
  templateUrl: './investments.component.html',
  styleUrls: ['./investments.component.css']
})
export class InvestmentsComponent implements OnInit {

  myForm!: FormGroup;
  name: string = '';
  amount: number = 0;
  duration: number = 0;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.myForm = this.formBuilder.group({
      name: '',
      amount: 0,
      duration: 0
    });
  }
  registerInvestment(){
    //Investment Logic
  }
 
}
