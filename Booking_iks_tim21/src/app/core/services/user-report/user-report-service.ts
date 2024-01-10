import { Injectable, importProvidersFrom } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../../../../env/env';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';
import { ActivationRequest } from '../../models/activationRequest.model';
import {ReviewReportDTO} from "../../models/ReviewReportDTO";
import {UserReportDTO} from "../../models/UserReportDTO";

@Injectable({
  providedIn: 'root',
})
export class UserReportService {
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient) {}

  public getUserReports(id: number): Observable<UserReportDTO[]> {
    return this.http.get<UserReportDTO[]>(
      environment.apiHost + 'reports/users'
    );
  }
  public getGuestsOwners(id: number): Observable<User[]> {
    return this.http.get<User[]>(
      environment.apiHost + 'reports/users/guest/' + id
    );
  }
  public getOwnersGuests(id: number): Observable<User[]> {
    return this.http.get<User[]>(
      environment.apiHost + 'reports/users/owner/' + id
    );
  }
  public createUserReport(
    userReportDTO: UserReportDTO
  ): Observable<UserReportDTO> {
    return this.http.post<UserReportDTO>(
      environment.apiHost + 'reports/users',
      userReportDTO,
      { headers: this.headers }
    );
  }

  public deleteUserReport(id: number): Observable<void> {
    return this.http.delete<void>(
      environment.apiHost + 'reports/users/' + id,
      { headers: this.headers }
    );
  }
}
