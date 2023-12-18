import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/env/env';
import {AccommodationPreviewDTO} from "../../../features/home/components/accommodation-preview/model/accommodationPreviewDTO";

@Injectable({
  providedIn: 'root',
})
export class OwnersAccommodationPreviewService {
  constructor(private http: HttpClient) {}

  public findAllForOwner(
    ownerId: number
  ): Observable<AccommodationPreviewDTO[]> {
    return this.http.get<AccommodationPreviewDTO[]>(
      `${environment.apiHost}accommodations/${ownerId}/accommodations`
    );
  }
}
