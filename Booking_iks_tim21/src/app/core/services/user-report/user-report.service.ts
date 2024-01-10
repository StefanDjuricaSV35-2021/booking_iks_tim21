import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserReportDTO } from '../../models/UserReportDTO';
import { environment } from 'src/env/env';

@Injectable({
  providedIn: 'root',
})
export class UserReportService {
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient) {}

  public getUserReports(): Observable<UserReportDTO[]> {
    return this.http.get<UserReportDTO[]>(
      environment.apiHost + 'reports/users'
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
    return this.http.delete<void>(environment.apiHost + 'reports/users/' + id);
  }
}
