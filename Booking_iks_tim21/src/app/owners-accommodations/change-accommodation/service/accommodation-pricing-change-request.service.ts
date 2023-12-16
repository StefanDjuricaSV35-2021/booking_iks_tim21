import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/env/env';
import { AccommodationPricingChangeRequestDTO } from '../model/AccommodationPricingChangeRequestDTO';

@Injectable({
  providedIn: 'root',
})
export class AccommodationPricingChangeRequestService {
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient) {}

  public createAccommodationPricingChangeRequest(
    accommodationPricingChangeRequestDTO: AccommodationPricingChangeRequestDTO
  ): Observable<AccommodationPricingChangeRequestDTO> {
    return this.http.post<AccommodationPricingChangeRequestDTO>(
      environment.apiHost + 'accommodationPricingChangeRequests',
      accommodationPricingChangeRequestDTO,
      { headers: this.headers }
    );
  }
}
