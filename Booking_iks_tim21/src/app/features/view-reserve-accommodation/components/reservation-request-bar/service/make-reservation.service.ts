import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AccommodationDetailsDTO} from "../../accommodation-details/model/AccommodationDetailsDTO";
import {Observable} from "rxjs";
import {environment} from "../../../../../../env/env";
import {ReservationRequestDTO} from "../model/ReservationRequestDTO";

@Injectable({
  providedIn: 'root'
})
export class MakeReservationService {

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient) {}

  public createReservationReq(
    resReqDTO: ReservationRequestDTO
  ):
    Observable<ReservationRequestDTO> {
    return this.http.post<ReservationRequestDTO>(
      environment.apiHost + 'reservationRequests',
      resReqDTO,
      { headers: this.headers }
    );
  }
}
