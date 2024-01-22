import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AccommodationDetailsDTO } from '../../models/AccommodationDetailsDTO';
import { environment } from '../../../../env/env';
import { Params } from '@angular/router';
import { AccommodationPreviewDTO } from '../../models/accommodationPreviewDTO';

@Injectable({
  providedIn: 'root',
})
export class AccommodationDetailsService {
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient) {}

  public createAccommodation(
    accommodationDetails: AccommodationDetailsDTO
  ): Observable<AccommodationDetailsDTO> {
    return this.http.post<AccommodationDetailsDTO>(
      environment.apiHost + 'accommodations',
      accommodationDetails,
      { headers: this.headers }
    );
  }

  public updateAccommodation(
    accommodationDetails: AccommodationDetailsDTO
  ): Observable<AccommodationDetailsDTO> {
    return this.http.put<AccommodationDetailsDTO>(
      environment.apiHost + 'accommodations',
      accommodationDetails,
      { headers: this.headers }
    );
  }

  deleteAccommodation(id: number): Observable<void> {
    return this.http.delete<void>(environment.apiHost + 'accommodations/' + id);
  }

  public findById(id: number): Observable<AccommodationDetailsDTO> {
    return this.http.get<AccommodationDetailsDTO>(
      environment.apiHost + 'accommodations/' + id
    );
  }

  public getPrice(
    id: number,
    dateFrom: string,
    dateTo: string,
    noGuests: string
  ): Observable<number> {
    let params = new HttpParams()
      .set('dateFrom', dateFrom)
      .set('dateTo', dateTo)
      .set('id', id)
      .set('noGuests', noGuests);

    return this.http.get<number>(
      environment.apiHost + 'accommodations/price',
      { params: params }
    );
  }
}
