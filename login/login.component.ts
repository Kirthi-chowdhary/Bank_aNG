// import { Component } from '@angular/core';
// import { NavigationExtras, Router } from '@angular/router';
// import { FormGroup, FormControl } from '@angular/forms';
// import { LoginService } from '../Services/login.service';


// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css'],
// })
// export class LoginComponent {
//   loginForm!: FormGroup;

//   ngOnInit() {
//     this.loginForm = new FormGroup({
//       email: new FormControl(),
//       password: new FormControl(),
//     });
//   }
//   constructor(private router: Router, private service: LoginService) {}

//   goToRegister() {
//     this.router.navigateByUrl('/register');
//   }
//   goToLogin() {
//     const storedUserDetails = localStorage.getItem('userDetails');

//     if (storedUserDetails) {
//       const userDetails = JSON.parse(storedUserDetails);
//       console.log(userDetails);

//       const enteredEmail = this.loginForm.get('email')?.value;
//       const enteredPassword = this.loginForm.get('password')?.value;
//       console.log(enteredEmail);
//       console.log(enteredPassword);

//       let currentuser = userDetails.find((user: any) => {
//         return user.email === enteredEmail && user.password === enteredPassword;
//       });
//       console.log(currentuser, 'is current user');

//       if (currentuser) {
//         localStorage.setItem('currentUser', JSON.stringify(currentuser));
//         // Construct navigation extras with user details

//         // Navigate to home URL with user details
//         this.router.navigateByUrl('/home');
//       } else {
//         // Display message if email or password is incorrect
//         alert('Incorrect email or password.');
//       }
//     } else {
//       // Display message if no user details are stored
//       alert('No registered user found.');
//     }

//   }
// }

// USING SERVER

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { LoginService } from '../Services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private router: Router, private service: LoginService) {
    this.loginForm = new FormGroup({
      email: new FormControl(),
      password: new FormControl(),
    });
  }

  ngOnInit() {}

  goToRegister() {
    this.router.navigateByUrl('/register');
  }

  goToLogin() {
    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;

    this.service.loginauth(email, password).subscribe(
      (res: any) => {
        console.log("User is logged in");
        this.router.navigateByUrl("/home");
        console.log(res);
      },
      (error) => {
        console.log("Login failed:", error);
        alert('Incorrect email or password.');
      }
    );
  }
}
