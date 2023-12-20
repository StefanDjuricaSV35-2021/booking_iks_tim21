import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/env/env';
import { AccommodationPricingChangeRequestDTO } from '../../models/AccommodationPricingChangeRequestDTO';

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

  public findAllPricingChangeRequests(): Observable<
    AccommodationPricingChangeRequestDTO[]
  > {
    return this.http.get<AccommodationPricingChangeRequestDTO[]>(
      environment.apiHost + 'accommodationPricingChangeRequests'
    );
  }

  getPricingChangeRequestsForAccommodationChangeRequest(
    id: number
  ): Observable<AccommodationPricingChangeRequestDTO[]> {
    return this.http.get<AccommodationPricingChangeRequestDTO[]>(
      `${environment.apiHost}accommodationPricingChangeRequests/all/${id}`
    );
  }

  public updatePricingChangeRequest(
    pricingChangeRequest: AccommodationPricingChangeRequestDTO
  ): Observable<AccommodationPricingChangeRequestDTO> {
    return this.http.put<AccommodationPricingChangeRequestDTO>(
      environment.apiHost + 'accommodationPricingChangeRequests',
      pricingChangeRequest,
      { headers: this.headers }
    );
  }

  deletePricingChangeRequest(id: number): Observable<void> {
    return this.http.delete<void>(
      environment.apiHost + 'accommodationPricingChangeRequests/' + id
    );
  }

  public findById(
    id: number
  ): Observable<AccommodationPricingChangeRequestDTO> {
    return this.http.get<AccommodationPricingChangeRequestDTO>(
      environment.apiHost + 'accommodationPricingChangeRequests/' + id
    );
  }

  public updateAccommodationPricings(
    accommodationId: number,
    accommodationPricingChangeRequestDTOS: AccommodationPricingChangeRequestDTO[]
  ): Observable<void> {
    return this.http.delete<void>(
      `${environment.apiHost}accommodationPricingChangeRequests/update/${accommodationId}`,
      {
        headers: this.headers,
        body: accommodationPricingChangeRequestDTOS,
      }
    );
  }
}
