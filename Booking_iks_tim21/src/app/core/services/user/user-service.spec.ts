import { TestBed } from '@angular/core/testing';
import { UserService } from './user-service';

import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Role, User } from '../../models/user.model';

describe('UserService', () => {
  let service: UserService;
  let httpController: HttpTestingController;

  let url = 'http://localhost:8080/api/v1/auth/users';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(UserService);
    httpController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get user by email', () => {
    const email = 'owner@example.com';
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

    service.getUserByEmail(email).subscribe((user) => {
      expect(user).toEqual(mockUser);
    });

    const req = httpController.expectOne(`${url}/email/${email}`);
    expect(req.request.method).toEqual('GET');
    req.flush(mockUser);
  });

  it('should update user', () => {
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

    service.update(mockUser).subscribe((user) => {
      expect(user).toEqual(mockUser);
    });

    const req = httpController.expectOne(`${url}`);
    expect(req.request.method).toEqual('PUT');
    req.flush(mockUser);
  });

  it('should delete user', () => {
    const userId = 1;

    service.delete(userId).subscribe();

    const req = httpController.expectOne(`${url}/${userId}`);
    expect(req.request.method).toEqual('DELETE');
    req.flush({});
  });
});
