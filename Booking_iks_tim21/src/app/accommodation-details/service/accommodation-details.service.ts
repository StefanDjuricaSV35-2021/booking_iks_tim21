import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AccommodationPreviewDTO } from '../../accommodation-preview/model/accommodationPreviewDTO';
import { environment } from '../../../env/env';
import { AccommodationDetailsDTO } from '../model/AccommodationDetailsDTO';

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
}
