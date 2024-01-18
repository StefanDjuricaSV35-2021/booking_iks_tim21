import { Injectable, importProvidersFrom } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../env/env';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';
import { ActivationRequest } from '../../models/activationRequest.model';
import {NotificationType} from "../../models/NotificationDTO";
import {NotificationTypeUpdateRequest} from "../../models/NotificationTypeUpdateRequest";

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

  getUserByEmail(email: string): Observable<User> {
    return this.httpClient.get<User>(
      environment.apiHost + 'users/email/' + email
    );
  }

  activateAccount(email: string): Observable<User> {
    return this.httpClient.get<User>(
      environment.apiHost + 'users/activate/account/' + email
    );
  }

  getActivationRequest(email: string): Observable<ActivationRequest> {
    return this.httpClient.get<ActivationRequest>(
      environment.apiHost + 'users/activate/' + email
    );
  }
  getUserNotificationTypes(email: string): Observable<NotificationType[]> {
    return this.httpClient.get<NotificationType[]>(
      environment.apiHost + 'users/notification/' + email
    );
  }

  updateUserNotificationTypes(request: NotificationTypeUpdateRequest): Observable<User> {
    return this.httpClient.put<User>(environment.apiHost + 'users/notification', request);
  }
}
