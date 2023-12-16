import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/env/env';
import { AccommodationChangeRequestDTO } from '../model/AccommodationChangeRequestDTO';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AccommodationChangeRequestService {
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient) {}

  public createAccommodationChangeRequest(
    accommodationChangeRequestDTO: AccommodationChangeRequestDTO
  ): Observable<AccommodationChangeRequestDTO> {
    return this.http.post<AccommodationChangeRequestDTO>(
      environment.apiHost + 'accommodationChangeRequests',
      accommodationChangeRequestDTO,
      { headers: this.headers }
    );
  }
}
