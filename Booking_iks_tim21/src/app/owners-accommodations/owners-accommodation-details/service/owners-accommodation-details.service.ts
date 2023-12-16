import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AccommodationDetailsDTO } from 'src/app/accommodation-details/model/AccommodationDetailsDTO';
import { environment } from 'src/env/env';

@Injectable({
  providedIn: 'root',
})
export class OwnersAccommodationDetailsService {
  constructor(private http: HttpClient) {}
  public findById(id: number): Observable<AccommodationDetailsDTO> {
    return this.http.get<AccommodationDetailsDTO>(
      environment.apiHost + 'accommodations/' + id
    );
  }
}
