import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  constructor(private router: Router) {}
  street:string = "";
  city:string = "";
  country:string = "";

  name:string = "";
  surname:string = "";

  phone:string = "";
  
  email:string = "";
  password:string = "";
  passwordRepeat:string = "";

  isLandlord:boolean = true;

  ngOnInit(){
    this.street = "";
    this.city = "";
    this.country = "";
  
    this.name = "";
    this.surname = "";
  
    this.phone = "";
    
    this.email = "";
    this.password = "";
    this.passwordRepeat = "";
  
    this.isLandlord = true;
  }

  logIn() {
    this.router.navigate(['login']);
  }

  signUp(){
    console.log(this.street);
    console.log(this.city);
    console.log(this.country);
    console.log(this.name);
    console.log(this.surname);
    console.log(this.phone);
    console.log(this.email);
    console.log(this.password);
    console.log(this.passwordRepeat);
    console.log(this.isLandlord);
    // this.router.navigate(['profile']);
  }
}
