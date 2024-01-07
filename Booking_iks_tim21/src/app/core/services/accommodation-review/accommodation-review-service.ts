import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../../env/env";
import {ReservationRequestDTO} from "../../models/ReservationRequestDTO";
import {AccommodationReviewDTO} from "../../models/AccommodationReviewDTO";

@Injectable({
  providedIn: 'root'
})
export class AccommodationReviewService {

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient) {}

  public createAccommodationReview(
    accommodationReviewDTO: AccommodationReviewDTO
  ):
    Observable<AccommodationReviewDTO> {
    return this.http.post<AccommodationReviewDTO>(
      environment.apiHost + 'reviews/accommodations',
      accommodationReviewDTO,
      { headers: this.headers }
    );
  }

  public findAll(): Observable<AccommodationReviewDTO[]> {
    return this.http.get<AccommodationReviewDTO[]>(
      environment.apiHost + 'reviews/accommodations'
    );
  }

  public getAccommodationReviews(id:number): Observable<AccommodationReviewDTO[]> {
    return this.http.get<AccommodationReviewDTO[]>(
      environment.apiHost +"reviews/accommodations/"+ id
    );
  }

  public deleteAccommodationReviews(id: number): Observable<void> {
    return this.http.delete<void>(
      environment.apiHost + 'reviews/accommodations/'+id,
      { headers: this.headers }
    );
  }

}
