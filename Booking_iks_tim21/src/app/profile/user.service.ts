import { Injectable, importProvidersFrom } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../env/env';
import { Observable } from 'rxjs';
import { User } from './model/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpClient: HttpClient) {}

  getUser(id: number): Observable<User> {
    return this.httpClient.get<User>(environment.apiHost + 'users/' + id);
  }

  update(user: User): Observable<User> {
    return this.httpClient.put<User>(environment.apiHost + 'users', user);
  }

  delete(id: number) {
    return this.httpClient.delete<User>(environment.apiHost + 'users/' + id);
  }
}
