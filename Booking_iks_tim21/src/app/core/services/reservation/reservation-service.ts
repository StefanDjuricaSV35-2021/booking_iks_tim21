import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../env/env';
import { ReservationRequestDTO } from '../../models/ReservationRequestDTO';
import { ReservationDTO } from '../../models/ReservationDTO';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient) {}

  public createReservation(
      resDTO: ReservationDTO
  ): Observable<ReservationDTO> {
    return this.http.post<ReservationDTO>(
      environment.apiHost + 'reservations',
      resDTO,
      { headers: this.headers }
    );
  }

  public findAll(): Observable<ReservationRequestDTO[]> {
    return this.http.get<ReservationRequestDTO[]>(
      environment.apiHost + 'reservations'
    );
  }

  public updateReservation(resDTO: ReservationDTO): Observable<ReservationDTO> {
    return this.http.put<ReservationDTO>(
      environment.apiHost + 'reservations',
      resDTO,
      { headers: this.headers }
    );
  }

  public getCurrentReservations(userId: number): Observable<ReservationDTO[]> {
    return this.http.get<ReservationDTO[]>(
      environment.apiHost + 'reservations/' + userId + '/currentReservations',
      { headers: this.headers }
    );
  }

  public getCurrentOwnersReservations(
    ownerId: number
  ): Observable<ReservationDTO[]> {
    return this.http.get<ReservationDTO[]>(
      environment.apiHost +
        'reservations/' +
        ownerId +
        '/currentOwnersReservations',
      { headers: this.headers }
    );
  }
}
