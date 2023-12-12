import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../model/user.model';
import { ActivatedRoute, Router } from '@angular/router';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-change-profile',
  templateUrl: './change-profile.component.html',
  styleUrls: ['./change-profile.component.css'],
})
export class ChangeProfileComponent implements OnInit {
  user: User = {} as User;

  changeProfileForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private service: UserService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.changeProfileForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      surname: new FormControl('', [Validators.required]),
      street: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      country: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.minLength(6)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.minLength(5)]),
      repeatPassword: new FormControl('', [Validators.minLength(5)]),
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = +params['userId'];
      // hardcoded to get user with id 7, for now.
      this.service.getUser(7).subscribe({
        next: (data: User) => {
          this.user = data;
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
      password: this.user.password,
      repeatPassword: this.user.password,
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
          this.router.navigate(['/profile']);
        },
        error: (error) => {},
      });
    } else if (passwordMatchError) {
      this.snackBar.open('Passwords do not match', 'Close', {
        verticalPosition: 'top',
        horizontalPosition: 'center',
      });
    }
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

    if (password && repeatPassword && password !== repeatPassword) {
      repeatPasswordControl.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    } else {
      repeatPasswordControl.setErrors(null);
      return null;
    }
  }
}
