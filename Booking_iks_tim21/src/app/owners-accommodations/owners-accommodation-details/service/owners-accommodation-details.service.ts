import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/env/env';
import {
  AccommodationDetailsDTO
} from "../../../core/models/AccommodationDetailsDTO";

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
