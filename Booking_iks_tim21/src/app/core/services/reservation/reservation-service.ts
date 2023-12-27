import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../../env/env";
import {ReservationRequestDTO} from "../../models/ReservationRequestDTO";

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient) {}


  public createReservation(
    resReqDTO: ReservationRequestDTO
  ):
    Observable<ReservationRequestDTO> {
    return this.http.post<ReservationRequestDTO>(
      environment.apiHost + 'reservations',
      resReqDTO,
      { headers: this.headers }
    );
  }

  public findAll(): Observable<ReservationRequestDTO[]> {
    return this.http.get<ReservationRequestDTO[]>(
      environment.apiHost + 'reservations'
    );
  }
}
