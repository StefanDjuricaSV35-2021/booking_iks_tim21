import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Role, User } from '../model/user.model';
import { ActivatedRoute, Router } from '@angular/router';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-change-profile',
  templateUrl: './change-profile.component.html',
  styleUrls: ['./change-profile.component.css'],
})
export class ChangeProfileComponent implements OnInit {
  user: User = {} as User;
  role: string = '';

  changeProfileForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private service: UserService,
    private router: Router,
    private snackBar: MatSnackBar,
    private authService: AuthService
  ) {
    this.changeProfileForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      surname: new FormControl('', [Validators.required]),
      street: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      country: new FormControl('', [Validators.required]),
      phone: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.minLength(5)]),
      repeatPassword: new FormControl('', [Validators.minLength(5)]),
    });
  }

  ngOnInit(): void {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/mainPage']);
      return;
    }

    this.route.params.subscribe((params) => {
      const id = +params['userId'];

      const jwtHelperService = new JwtHelperService();
      const userFromLocalStorage: any = localStorage.getItem('user');
      const userEmail: string =
        jwtHelperService.decodeToken(userFromLocalStorage).sub;
      this.service.getUserByEmail(userEmail).subscribe({
        next: (data: User) => {
          this.user = data;
          this.role = this.user.role as unknown as string;

          this.populateForm();
        },
      });
    });
  }

  populateForm() {
    this.changeProfileForm.patchValue({
      name: this.user.name,
      surname: this.user.surname,
      street: this.user.street,
      city: this.user.city,
      country: this.user.country,
      phone: this.user.phone,
      email: this.user.email,
      password: '',
      repeatPassword: '',
    });
  }

  saveChanges() {
    // Call the passwordMatchValidator before saving changes
    const passwordMatchError = this.passwordMatchValidator(
      this.changeProfileForm
    );

    if (this.changeProfileForm.valid && !passwordMatchError) {
      const formData = this.changeProfileForm.value;
      const updatedUser: User = {
        id: this.user.id,
        role: this.user.role,
        email: formData.email,
        password: formData.password,
        name: formData.name,
        surname: formData.surname,
        country: formData.country,
        city: formData.city,
        street: formData.street,
        phone: formData.phone,
        enabled: true,
      };

      this.service.update(updatedUser).subscribe({
        next: (updatedUser: User) => {
          if (updatedUser.email == this.user.email) {
            this.router.navigate(['/profile']);
          } else {
            this.snackBar.open(
              'Yous successfully changed your profile, please log in again',
              'Close',
              {
                verticalPosition: 'top',
                horizontalPosition: 'center',
              }
            );

            localStorage.removeItem('user');
            this.router.navigate(['/mainPage']);
            window.location.reload();
          }
        },
        error: (error) => {
          this.snackBar.open(
            'Failed to change profile, another account uses the same email',
            'Close',
            {
              verticalPosition: 'top',
              horizontalPosition: 'center',
            }
          );
        },
      });
    } else if (passwordMatchError) {
      this.snackBar.open('Passwords do not match', 'Close', {
        verticalPosition: 'top',
        horizontalPosition: 'center',
      });
    }
  }

  deleteProfile() {
    this.service.delete(this.user.id).subscribe({
      next: (_) => {
        localStorage.removeItem('user');
        this.router.navigate(['/mainPage']);
        window.location.reload();
      },
      error: (error) => {
        if (this.role == 'GUEST') {
          this.snackBar.open(
            'Failed to delete profile, you still have active reservations',
            'Close',
            {
              verticalPosition: 'top',
              horizontalPosition: 'center',
            }
          );
        } else {
          this.snackBar.open(
            'Failed to delete profile, your accommodations still have active reservations',
            'Close',
            {
              verticalPosition: 'top',
              horizontalPosition: 'center',
            }
          );
        }
      },
    });
  }

  passwordMatchValidator(
    formGroup: FormGroup
  ): { [key: string]: boolean } | null {
    const passwordControl = formGroup.get('password');
    const repeatPasswordControl = formGroup.get('repeatPassword');

    if (!passwordControl || !repeatPasswordControl) {
      // Controls are not defined, return null or handle the error accordingly.
      return null;
    }

    const password = passwordControl.value;
    const repeatPassword = repeatPasswordControl.value;

    if ((password || repeatPassword) && password !== repeatPassword) {
      repeatPasswordControl.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    } else {
      repeatPasswordControl.setErrors(null);
      return null;
    }
  }
}
