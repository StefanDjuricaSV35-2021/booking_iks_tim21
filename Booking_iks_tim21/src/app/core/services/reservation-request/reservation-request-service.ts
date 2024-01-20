import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../env/env';
import { ReservationRequestDTO } from '../../models/ReservationRequestDTO';

@Injectable({
  providedIn: 'root',
})
export class ReservationRequestService {
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient) {}

  public createReservationReq(
    resReqDTO: ReservationRequestDTO
  ): Observable<ReservationRequestDTO> {
    return this.http.post<ReservationRequestDTO>(
      environment.apiHost + 'reservationRequests',
      resReqDTO,
      { headers: this.headers }
    );
  }

  public findAll(): Observable<ReservationRequestDTO[]> {
    return this.http.get<ReservationRequestDTO[]>(
      environment.apiHost + 'reservationRequests'
    );
  }

  public update(res: ReservationRequestDTO): Observable<ReservationRequestDTO> {
    return this.http.put<ReservationRequestDTO>(
      environment.apiHost + 'reservationRequests',
      res
    );
  }

  public getUserRequests(id: number): Observable<ReservationRequestDTO[]> {
    return this.http.get<ReservationRequestDTO[]>(
      environment.apiHost + 'reservationRequests/' + id + '/reservationRequests'
    );
  }
  public getOwnerRequests(id: number): Observable<ReservationRequestDTO[]> {
    return this.http.get<ReservationRequestDTO[]>(
      environment.apiHost +
        'reservationRequests/' +
        id +
        '/ownerReservationRequests'
    );
  }
}
