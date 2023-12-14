import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { AuthModule } from '../auth.module';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { SignUp } from '../model/signup.model';
import { User } from 'src/app/profile/model/user.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private authService: AuthService,
    private router: Router) {}

  private passwordMatchValidator: ValidatorFn = (control: AbstractControl): { [key: string]: boolean } | null => {
    const password = control.get('password');
    const passwordRepeat = control.get('passwordRepeat');
  
    return password && passwordRepeat && password.value === passwordRepeat.value
      ? null 
      : { passwordMismatch: true }; 
  };

  signUpForm = new FormGroup({
    

    street: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    country: new FormControl('', [Validators.required]),

    name: new FormControl('', [Validators.required]),
    surname: new FormControl('', [Validators.required]),

    phone: new FormControl('', [Validators.required]),

    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(4)]),
    passwordRepeat: new FormControl('', [Validators.required, Validators.minLength(4)]),

    isOwner: new FormControl(false),
  },{ validators: this.passwordMatchValidator })



  ngOnInit(){
  
  }

  logIn() {
    this.router.navigate(['login']);
  }

  signUp(){
    if(this.signUpForm.valid) {
      const signup: SignUp = {
        email: this.signUpForm.value.email || "",
        password: this.signUpForm.value.password || "",
        street: this.signUpForm.value.street || "",
        city: this.signUpForm.value.city || "",
        country: this.signUpForm.value.country || "",
        name: this.signUpForm.value.name || "",
        surname: this.signUpForm.value.surname || "",
        phone: this.signUpForm.value.phone || "",
        isOwner: this.signUpForm.value.isOwner || false,
      }
      this.authService.signup(signup).subscribe({
        next: (response: User) => {
          alert("Signup successful, check your email for confirmation.")
          this.router.navigate(['login'])
        },
        error: (error) => {
          console.error('Signup failed:', error);
  
          const errorMessage = error?.error?.message || 'Signup failed. User with '+this.signUpForm.value.email+' email already exists.';
          alert(errorMessage);
        }
      });
    }else{
      if(this.signUpForm.hasError('passwordMismatch')){
        alert("Passwords must match!!")
      }else{
        alert("Some of your credentials aren't correct please check them again!!")
      }
    }
  }
}
