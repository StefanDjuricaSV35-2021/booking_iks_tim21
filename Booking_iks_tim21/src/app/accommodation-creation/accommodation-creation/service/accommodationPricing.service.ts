import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/env/env';
import { AccommodationPricingDTO } from '../model/accommodationPricing.model';

@Injectable({
  providedIn: 'root',
})
export class AccommodationPricingService {
  private apiUrl = environment.apiHost + 'pricings';

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient) {}

  createAccommodationPricing(
    accommodationPricingDTO: AccommodationPricingDTO
  ): Observable<AccommodationPricingDTO> {
    console.log(this.apiUrl);
    return this.http.post<AccommodationPricingDTO>(
      this.apiUrl,
      accommodationPricingDTO,
      { headers: this.headers }
    );
  }

  getActivePricingsForAccommodation(
    accommodationId: number
  ): Observable<AccommodationPricingDTO[]> {
    return this.http.get<AccommodationPricingDTO[]>(
      `${environment.apiHost}pricings/${accommodationId}/activeAccommodationPricings`
    );
  }
}
