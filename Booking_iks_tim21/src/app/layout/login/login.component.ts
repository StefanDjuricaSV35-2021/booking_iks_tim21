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
    console.log(this.password);
    console.log(this.email);
    //this.router.navigate(['profile']);
  }

  signUp(){
    this.router.navigate(['signup']);
  }
}
