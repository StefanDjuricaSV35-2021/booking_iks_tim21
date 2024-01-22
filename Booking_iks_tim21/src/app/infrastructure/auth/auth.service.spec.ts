import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {AuthService} from "./auth.service";
import {SignUp} from "./model/signup.model";
import {Role, User} from "../../core/models/user.model";
import {environment} from "../../../env/env";

describe('AuthService', () => {
  let authService : AuthService;
  let httpController : HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService],
    });

    authService = TestBed.inject(AuthService);
    httpController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpController.verify();
  });

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });

  it('should sign up a user', () => {
    const email = 'owner@example.com';

    const signUpData: SignUp = {
      street: 'ValidStreet',
      city :'ValidCity',
      country: 'ValidCountry',
      name :'ValidName',
      surname: 'ValidSurname',
      phone :'1234567890',
      email :'valid@example.com',
      password : 'ValidPassword',
      isOwner :true, };

    const mockUser: User = {
      id: 1,
      role: Role.OWNER,
      email:  "valid@example.com",
      password : "ValidPassword",
      name : "ValidName",
      surname:  "ValidSurname",
      country:  "ValidCountry",
      city:  "ValidCity",
      street:  "ValidStreet",
      phone:  "1234567890",
      enabled : false,
      blocked:  false
    };

    authService.signup(signUpData).subscribe((user: User) => {
      expect(user).toEqual(mockUser);
    });

    const req = httpController.expectOne(environment.apiHost + 'signup');
    expect(req.request.method).toBe('POST');
    req.flush(mockUser);
  });
});
