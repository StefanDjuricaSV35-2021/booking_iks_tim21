import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthModule } from '../auth.module';
import { AuthService } from '../auth.service';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { Login } from '../model/login.model';
import { AuthResponse } from '../model/auth-resposne.model';
import {MatSnackBar} from "@angular/material/snack-bar";
import {User} from "../../../core/models/user.model";
import {UserService} from "../../../core/services/user/user-service";
import {NotificationService} from "../../../core/services/notification/notification.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router,
    private userService:UserService,
    private notifService:NotificationService) {

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
          sessionStorage.setItem('user', response.token);
          this.authService.setUser()
          this.router.navigate(['homePage'])
          this.setSessionParams()

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

  setSessionParams(){
    this.userService.getUserByEmail(this.loginForm.value.email!).subscribe({
      next: (data: User) => {
        let user = data;
        sessionStorage.setItem("userId",data.id.toString())
        this.notifService.openSocket()
      },
    });

  }


  signup() {
    this.router.navigate(['signup']);
  }

  onSubmit(){

  }
}
