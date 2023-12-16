import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AccommodationPreviewDTO } from '../model/accommodationPreviewDTO';
import { environment } from '../../../env/env';

@Injectable({
  providedIn: 'root',
})
export class AccommodationPreviewService {
  constructor(private http: HttpClient) {}
  public findAll(): Observable<AccommodationPreviewDTO[]> {
    return this.http.get<AccommodationPreviewDTO[]>(
      environment.apiHost + 'accommodations/previews'
    );
  }
}
