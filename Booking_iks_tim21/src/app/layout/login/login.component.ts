import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  
  constructor(private router: Router) {}
  email:string = "";
  password:string = "";

  ngOnInit(){

  }

  logIn() {
    //this.router.navigate(['profile']);
    console.log(this.password);
    console.log(this.email);
  }

  signUp(){
    //sign-up
    this.router.navigate(['profile']);
  }
}
