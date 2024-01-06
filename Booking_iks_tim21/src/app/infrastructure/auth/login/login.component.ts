import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthModule } from '../auth.module';
import { AuthService } from '../auth.service';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { Login } from '../model/login.model';
import { AuthResponse } from '../model/auth-resposne.model';
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router) {

  }

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(4)]),
  })


  ngOnInit() {}

  login(): void {

    if(this.loginForm.valid) {
      const login: Login = {
        email: this.loginForm.value.email || "",
        password: this.loginForm.value.password || ""
      }
      this.authService.login(login).subscribe({
        next: (response: AuthResponse) => {
          localStorage.setItem('user', response.token);
          this.authService.setUser()
          this.router.navigate(['homePage'])
        },
        error: (error) => {
          console.error('Login failed:', error);

          const errorMessage = error?.error?.message || 'Login failed. Please try again.';
          this.snackBar.open(errorMessage, 'Close', {
            verticalPosition: 'top',
            horizontalPosition: 'center',
          });
        }
      });
    }
  }


  signup() {
    this.router.navigate(['signup']);
  }

  onSubmit(){

  }
}
