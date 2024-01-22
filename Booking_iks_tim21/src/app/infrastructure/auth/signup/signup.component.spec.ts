import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { SignupComponent } from './signup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthModule } from '../auth.module';
import { AuthService } from '../auth.service';
import { of, throwError } from 'rxjs';
import { Role, User } from "../../../core/models/user.model";
import { NgZone } from '@angular/core';
import { LoginComponent } from "../login/login.component";
import { AppRoutingModule } from "../../../app-routing.module";

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  let authService: AuthService;
  let snackBar: MatSnackBar;
  let ngZone: NgZone;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SignupComponent, LoginComponent],
      imports: [
        AuthModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatCheckboxModule,
        MatButtonModule,
        MatSnackBarModule,
        HttpClientTestingModule,
        AppRoutingModule,
      ],
      providers: [AuthService, MatSnackBar],
    });
    ngZone = TestBed.inject(NgZone);
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    snackBar = TestBed.inject(MatSnackBar);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to login on logIn()', () => {
    const routerSpy = spyOn(component.getRouter(), 'navigate');
    component.logIn();
    expect(routerSpy).toHaveBeenCalledWith(['login']);
  });

  it('should show error snackbar when signup fails', async () => {
    fillFormWithValidValues(component);

    const signupError = 'Test signup error';
    spyOn(authService, 'signup').and.returnValue(throwError({ error: { message: signupError } }));
    spyOn(snackBar, 'open');

    await component.signUp();

    expect(snackBar.open).toHaveBeenCalledWith(signupError, 'Close', {
      verticalPosition: 'top',
      horizontalPosition: 'center',
    });
  });

  it('should show success snackbar when signup is successful', async () => {
    fillFormWithValidValues(component);

    const signupResponse: User = {
      id: 100,
      role: Role.GUEST,
      email: 'test@example.com',
      name: 'John',
      surname: 'Doe',
      country: 'Country',
      city: 'City',
      street: 'Street',
      phone: '123456789',
      enabled: false,
      blocked: false,
    };

    spyOn(authService, 'signup').and.returnValue(of(signupResponse));
    spyOn(snackBar, 'open');

    await component.signUp();

    expect(snackBar.open).toHaveBeenCalledWith('Signup successful, check your email for confirmation.', 'Close', {
      verticalPosition: 'top',
      horizontalPosition: 'center',
    });
  });

  it('should show password mismatch error when passwords do not match', fakeAsync(() => {
    fillFormWithValidValues(component);

    component.signUpForm.patchValue({
      password: 'password1',
      passwordRepeat: 'password2',
    });

    spyOn(snackBar, 'open');

    component.signUp();
    tick();

    expect(snackBar.open).toHaveBeenCalledWith('Passwords must match!!', 'Close', {
      verticalPosition: 'top',
      horizontalPosition: 'center',
    });
  }));

  it('should show general error when form is empty', fakeAsync(() => {
    spyOn(snackBar, 'open');

    component.signUp();
    tick();

    expect(snackBar.open).toHaveBeenCalledWith("Some of your credentials aren't correct please check them again!!", 'Close', {
      verticalPosition: 'top',
      horizontalPosition: 'center',
    });
  }));

  it('should show error when street is missing', fakeAsync(() => {
    fillFormWithValidValues(component);
    component.signUpForm.patchValue({
      street: '',
    });

    spyOn(snackBar, 'open');

    component.signUp();
    tick();

    expect(snackBar.open).toHaveBeenCalledWith("Some of your credentials aren't correct please check them again!!", 'Close', {
      verticalPosition: 'top',
      horizontalPosition: 'center',
    });
  }));

  it('should show error when city is missing', fakeAsync(() => {
    fillFormWithValidValues(component);
    component.signUpForm.patchValue({
      city: '',
    });
    spyOn(snackBar, 'open');

    component.signUp();
    tick();

    expect(snackBar.open).toHaveBeenCalledWith("Some of your credentials aren't correct please check them again!!", 'Close', {
      verticalPosition: 'top',
      horizontalPosition: 'center',
    });
  }));

  it('should show error when country is missing', fakeAsync(() => {
    fillFormWithValidValues(component);
    component.signUpForm.patchValue({
      country: '',
    });
    spyOn(snackBar, 'open');

    component.signUp();
    tick();

    expect(snackBar.open).toHaveBeenCalledWith("Some of your credentials aren't correct please check them again!!", 'Close', {
      verticalPosition: 'top',
      horizontalPosition: 'center',
    });
  }));

  it('should show error when name is missing', fakeAsync(() => {
    fillFormWithValidValues(component);
    component.signUpForm.patchValue({
      name: '',
    });
    spyOn(snackBar, 'open');

    component.signUp();
    tick();

    expect(snackBar.open).toHaveBeenCalledWith("Some of your credentials aren't correct please check them again!!", 'Close', {
      verticalPosition: 'top',
      horizontalPosition: 'center',
    });
  }));

  it('should show error when surname is missing', fakeAsync(() => {
    fillFormWithValidValues(component);
    component.signUpForm.patchValue({
      surname: '',
    });
    spyOn(snackBar, 'open');

    component.signUp();
    tick();

    expect(snackBar.open).toHaveBeenCalledWith("Some of your credentials aren't correct please check them again!!", 'Close', {
      verticalPosition: 'top',
      horizontalPosition: 'center',
    });
  }));

  it('should show error when phone is missing', fakeAsync(() => {
    fillFormWithValidValues(component);
    component.signUpForm.patchValue({
      phone: '',
    });
    spyOn(snackBar, 'open');

    component.signUp();
    tick();

    expect(snackBar.open).toHaveBeenCalledWith("Some of your credentials aren't correct please check them again!!", 'Close', {
      verticalPosition: 'top',
      horizontalPosition: 'center',
    });
  }));

  it('should show error when email is missing', fakeAsync(() => {
    fillFormWithValidValues(component);
    component.signUpForm.patchValue({
      email: '',
    });
    spyOn(snackBar, 'open');

    component.signUp();
    tick();

    expect(snackBar.open).toHaveBeenCalledWith("Some of your credentials aren't correct please check them again!!", 'Close', {
      verticalPosition: 'top',
      horizontalPosition: 'center',
    });
  }));

  it('should show error when email does not match email validators', fakeAsync(() => {
    fillFormWithValidValues(component);
    component.signUpForm.patchValue({
      email: 'invalidEmail',
    });
    spyOn(snackBar, 'open');

    component.signUp();
    tick();

    expect(snackBar.open).toHaveBeenCalledWith("Some of your credentials aren't correct please check them again!!", 'Close', {
      verticalPosition: 'top',
      horizontalPosition: 'center',
    });
  }));

  it('should show error when password and password repeat is missing', fakeAsync(() => {
    fillFormWithValidValues(component);
    component.signUpForm.patchValue({
      password: '',
      passwordRepeat: '',
    });
    spyOn(snackBar, 'open');

    component.signUp();
    tick();

    expect(snackBar.open).toHaveBeenCalledWith("Some of your credentials aren't correct please check them again!!", 'Close', {
      verticalPosition: 'top',
      horizontalPosition: 'center',
    });
  }));

  it('should show error when password and password repeat is shorter than 4 characters', fakeAsync(() => {
    fillFormWithValidValues(component);
    component.signUpForm.patchValue({
      password: '123',
      passwordRepeat: '123'
    });
    spyOn(snackBar, 'open');

    component.signUp();
    tick();

    expect(snackBar.open).toHaveBeenCalledWith("Some of your credentials aren't correct please check them again!!", 'Close', {
      verticalPosition: 'top',
      horizontalPosition: 'center',
    });
  }));


  it('should send data stream of wrong cases and check form validity', fakeAsync(() => {
    sendInvalidData();
    spyOn(snackBar, 'open');

    component.signUp();
    tick();

    expect(snackBar.open).toHaveBeenCalledWith("Some of your credentials aren't correct please check them again!!", 'Close', {
      verticalPosition: 'top',
      horizontalPosition: 'center',
    });
  }));

  function fillFormWithValidValues(component: SignupComponent): void {
    component.signUpForm.setValue({
      street: 'ValidStreet',
      city: 'ValidCity',
      country: 'ValidCountry',
      name: 'ValidName',
      surname: 'ValidSurname',
      phone: '1234567890',
      email: 'valid@example.com',
      password: 'ValidPassword',
      passwordRepeat: 'ValidPassword',
      isOwner: true,
    });
  }

  // Inside SignupComponent class
  function sendInvalidData(): void {
    component.signUpForm.setValue({
      street: '',
      city: '',
      country: '',
      name: '',
      surname: '',
      phone: '',
      email: '',
      password: '',
      passwordRepeat: '',
      isOwner: true,
    });
  }

});
