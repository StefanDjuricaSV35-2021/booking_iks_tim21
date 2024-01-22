import { ComponentFixture, TestBed, tick } from '@angular/core/testing';

import { ChangeProfileComponent } from './change-profile.component';
import {
  ActivatedRoute,
  Router,
  RouterModule,
  convertToParamMap,
} from '@angular/router';
import { of } from 'rxjs';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { UserService } from 'src/app/core/services/user/user-service';
import { RouterTestingModule } from '@angular/router/testing';
import { Role, User } from 'src/app/core/models/user.model';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/infrastructure/material/material.module';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';

describe('ChangeProfileComponent', () => {
  let component: ChangeProfileComponent;
  let fixture: ComponentFixture<ChangeProfileComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;
  let route: ActivatedRoute;
  let userService: jasmine.SpyObj<UserService>;
  let snackBar: jasmine.SpyObj<MatSnackBar>;

  const mockUser: User = {
    id: 2,
    city: 'Berlin',
    country: 'Germany',
    email: 'owner@example.com',
    name: 'Bob',
    password: 'password',
    phone: '123456789',
    street: '789 Oak St',
    surname: 'Jones',
    role: Role.OWNER,
    enabled: true,
    blocked: false,
  };

  beforeEach(() => {
    authService = jasmine.createSpyObj('AuthService', ['isLoggedIn']);
    router = jasmine.createSpyObj('Router', ['navigate']);
    userService = jasmine.createSpyObj('UserService', [
      'getUserByEmail',
      'delete',
      'update',
    ]);
    snackBar = jasmine.createSpyObj('MatSnackBar', ['open']);
    TestBed.configureTestingModule({
      declarations: [ChangeProfileComponent],
      providers: [
        { provide: AuthService, useValue: authService },
        { provide: Router, useValue: router },
        {
          provide: ActivatedRoute,
          useValue: { params: of(convertToParamMap({ userId: '2' })) },
        },
        { provide: MatSnackBar, useValue: snackBar },
        { provide: UserService, useValue: userService },
        JwtHelperService,
        HttpClient,
      ],
      imports: [
        RouterTestingModule,
        RouterModule,
        MatButtonModule,
        HttpClientModule,
        ReactiveFormsModule,
        MaterialModule,
        MatSnackBarModule,
        MatFormFieldModule,
        JwtModule,
        CommonModule,
      ],
    });
    fixture = TestBed.createComponent(ChangeProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should redirect to home page if not logged in', () => {
    authService.isLoggedIn.and.returnValue(false);
    component.ngOnInit();
    expect(router.navigate).toHaveBeenCalledWith(['/homePage']);
  });

  it('should handle getting user by email', () => {
    authService.isLoggedIn.and.returnValue(true);

    spyOn(JwtHelperService.prototype, 'decodeToken').and.returnValue({
      sub: 'owner@example.com',
    });

    userService.getUserByEmail.and.returnValue(of(mockUser));

    route = {
      params: of(convertToParamMap({ userId: '2' })),
    } as any;

    component.ngOnInit();

    expect(userService.getUserByEmail).toHaveBeenCalledOnceWith(
      'owner@example.com'
    );
    expect(component.user).toEqual(mockUser);
    expect(component.role).toBeGreaterThanOrEqual(2);
  });

  it(`form should be invalid, because of empty fields`, () => {
    const formControls = component.changeProfileForm.controls;

    formControls['name'].setValue('');
    formControls['surname'].setValue('');
    formControls['street'].setValue('');
    formControls['city'].setValue('');
    formControls['country'].setValue('');
    formControls['phone'].setValue('');
    formControls['email'].setValue('');
    formControls['password'].setValue('');
    formControls['repeatPassword'].setValue('');

    expect(component.changeProfileForm.valid).toBeFalsy();
  });

  it('form should be invalid when passwords do not match', () => {
    const formControls = component.changeProfileForm.controls;
    formControls['password'].setValue('password1');
    formControls['repeatPassword'].setValue('password2');

    expect(component.changeProfileForm.valid).toBeFalsy();
  });

  it('form should be invalid when passwords are less than 5 characters', () => {
    const formControls = component.changeProfileForm.controls;
    formControls['password'].setValue('123');
    formControls['repeatPassword'].setValue('123');

    expect(component.changeProfileForm.valid).toBeFalsy();
  });

  it('form should be invalid when phone are is than 6 characters', () => {
    const formControls = component.changeProfileForm.controls;
    formControls['phone'].setValue('12345');

    expect(component.changeProfileForm.valid).toBeFalsy();
  });

  it('form should be invalid when email is not valid', () => {
    const formControls = component.changeProfileForm.controls;
    formControls['email'].setValue('123');

    expect(component.changeProfileForm.valid).toBeFalsy();
  });

  it('should populate form with user data on ngOnInit, and be valid', () => {
    authService.isLoggedIn.and.returnValue(true);

    spyOn(JwtHelperService.prototype, 'decodeToken').and.returnValue({
      sub: 'owner@example.com',
    });

    userService.getUserByEmail.and.returnValue(of(mockUser));

    route = {
      params: of(convertToParamMap({ userId: '2' })),
    } as any;

    component.ngOnInit();

    expect(userService.getUserByEmail).toHaveBeenCalledOnceWith(
      'owner@example.com'
    );
    expect(component.user).toEqual(mockUser);

    expect(component.changeProfileForm.value).toEqual({
      name: 'Bob',
      surname: 'Jones',
      street: '789 Oak St',
      city: 'Berlin',
      country: 'Germany',
      phone: '123456789',
      email: 'owner@example.com',
      password: '',
      repeatPassword: '',
    });

    expect(component.changeProfileForm.valid).toBeTruthy();
  });

  it('should update user profile and navigate to /profile on success', () => {
    authService.isLoggedIn.and.returnValue(true);

    spyOn(JwtHelperService.prototype, 'decodeToken').and.returnValue({
      sub: 'owner@example.com',
    });

    userService.getUserByEmail.and.returnValue(of(mockUser));

    route = {
      params: of(convertToParamMap({ userId: '2' })),
    } as any;

    component.ngOnInit();

    const updatedUser: User = {
      id: 2,
      city: 'NewCity',
      country: 'NewCountry',
      email: 'owner@example.com',
      name: 'NewName',
      password: 'newPassword',
      phone: '987654321',
      street: 'NewStreet',
      surname: 'NewSurname',
      role: Role.OWNER,
      enabled: true,
      blocked: false,
    };

    userService.update.and.returnValue(of(updatedUser));

    component.changeProfileForm.patchValue({
      name: 'NewName',
      surname: 'NewSurname',
      street: 'NewStreet',
      city: 'NewCity',
      country: 'NewCountry',
      phone: '987654321',
      email: 'owner@example.com',
      password: 'newPassword',
      repeatPassword: 'newPassword',
    });

    component.saveChanges();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.submitted).toBeTruthy();
      expect(userService.update).toHaveBeenCalledWith(updatedUser);
      expect(router.navigate).toHaveBeenCalledWith(['/profile']);
    });
  });

  it('should navigate to /homePage and log out when email is changed', () => {
    authService.isLoggedIn.and.returnValue(true);

    spyOn(JwtHelperService.prototype, 'decodeToken').and.returnValue({
      sub: 'owner@example.com',
    });

    userService.getUserByEmail.and.returnValue(of(mockUser));

    route = {
      params: of(convertToParamMap({ userId: '2' })),
    } as any;

    component.ngOnInit();

    const updatedUser: User = {
      id: 2,
      city: 'NewCity',
      country: 'NewCountry',
      email: 'newemail@example.com',
      name: 'NewName',
      password: 'newPassword',
      phone: '987654321',
      street: 'NewStreet',
      surname: 'NewSurname',
      role: Role.OWNER,
      enabled: true,
      blocked: false,
    };

    userService.update.and.returnValue(of(updatedUser));

    component.changeProfileForm.patchValue({
      name: 'NewName',
      surname: 'NewSurname',
      street: 'NewStreet',
      city: 'NewCity',
      country: 'NewCountry',
      phone: '987654321',
      email: 'newemail@example.com',
      password: 'newPassword',
      repeatPassword: 'newPassword',
    });

    component.saveChanges();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.submitted).toBeTruthy();
      expect(userService.update).toHaveBeenCalledWith(updatedUser);
      expect(router.navigate).toHaveBeenCalledWith(['/homePage']);
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(snackBar.open).toHaveBeenCalled();
      });
    });
  });

  it('should delete profile and navigate to home page on success', () => {
    authService.isLoggedIn.and.returnValue(true);

    spyOn(JwtHelperService.prototype, 'decodeToken').and.returnValue({
      sub: 'owner@example.com',
    });

    userService.getUserByEmail.and.returnValue(of(mockUser));

    route = {
      params: of(convertToParamMap({ userId: '2' })),
    } as any;

    component.ngOnInit();

    expect(userService.getUserByEmail).toHaveBeenCalledOnceWith(
      'owner@example.com'
    );
    expect(component.user).toBeDefined();
    expect(component.user.id).toEqual(mockUser.id);

    userService.delete.and.returnValue(of(mockUser));

    component.deleteProfile();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(userService.delete).toHaveBeenCalledWith(mockUser.id);
      expect(router.navigate).toHaveBeenCalledWith(['/homePage']);
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
