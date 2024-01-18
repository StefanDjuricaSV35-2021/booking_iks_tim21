import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../../env/env";
import {NotificationDTO} from "../../models/NotificationDTO";

@Injectable({
  providedIn: 'root'
})
export class NotificationUserService {

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient) {}

  public getUserNotifications(userId: number): Observable<NotificationDTO[]> {
    return this.http.get<NotificationDTO[]>(
      environment.apiHost + 'notifications/' + userId
    );
  }

  public deleteNotifications(id: number): Observable<void> {
    return this.http.delete<void>(
      environment.apiHost + 'notifications/' + id,
      { headers: this.headers }
    );
  }


}
