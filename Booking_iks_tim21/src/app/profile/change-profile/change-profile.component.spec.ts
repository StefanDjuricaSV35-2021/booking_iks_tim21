import { ComponentFixture, TestBed } from '@angular/core/testing';

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
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/infrastructure/material/material.module';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { MatFormFieldModule } from '@angular/material/form-field';

describe('ChangeProfileComponent', () => {
  let component: ChangeProfileComponent;
  let fixture: ComponentFixture<ChangeProfileComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;
  let route: ActivatedRoute;
  let userService: jasmine.SpyObj<UserService>;

  beforeEach(() => {
    authService = jasmine.createSpyObj('AuthService', ['isLoggedIn']);
    router = jasmine.createSpyObj('Router', ['navigate']);
    userService = jasmine.createSpyObj('UserService', ['getUserByEmail']);

    TestBed.configureTestingModule({
      declarations: [ChangeProfileComponent],
      providers: [
        { provide: AuthService, useValue: authService },
        { provide: Router, useValue: router },
        {
          provide: ActivatedRoute,
          useValue: { params: of(convertToParamMap({ userId: '2' })) },
        },
        { provide: UserService, useValue: userService },
        JwtHelperService,
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

    const mockUser: User = {
      id: 2,
      city: 'Berlin',
      country: 'Germany',
      email: 'owner@example.com',
      name: 'Bob',
      password: 'password',
      phone: '+49 30 9876 5432',
      street: '789 Oak St',
      surname: 'Jones',
      role: Role.OWNER,
      enabled: true,
      blocked: false,
    };

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

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
