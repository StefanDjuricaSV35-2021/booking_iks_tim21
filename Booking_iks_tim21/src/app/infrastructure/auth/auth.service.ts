import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../env/env';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthResponse } from './model/auth-resposne.model';
import { Login } from './model/login.model';
import { SignUp } from './model/signup.model';
import { User } from 'src/app/profile/model/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  private jwtHelper: JwtHelperService = new JwtHelperService();

  user$ = new BehaviorSubject('');
  userState = this.user$.asObservable();

  constructor(private http: HttpClient) {
    this.user$.next(this.getRole());
  }

  signup(auth: SignUp):  Observable<User> {
    return this.http.post<User>(environment.apiHost + 'signup', auth, {
      headers: this.headers,
    });
  }

  login(auth: Login): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(environment.apiHost + 'signin', auth, {
      headers: this.headers,
    });
  }

  logout(): Observable<string> {
    return this.http.get(environment.apiHost + 'signOut', {
      responseType: 'text',
    });
  }

  getRole(): any {
    if (this.isLoggedIn()) {
      const accessToken: any = localStorage.getItem('user');
      console.log(accessToken);
      return this.jwtHelper.decodeToken(accessToken).role[0].authority;
    }
    return null;
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('user') != null;
  }

  setUser(): void {
    this.user$.next(this.getRole());
  }
}
