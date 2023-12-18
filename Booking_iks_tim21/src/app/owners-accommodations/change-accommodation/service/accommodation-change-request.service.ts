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

  public findAllChangeRequests(): Observable<AccommodationChangeRequestDTO[]> {
    return this.http.get<AccommodationChangeRequestDTO[]>(
      environment.apiHost + 'accommodationChangeRequests'
    );
  }

  public updateAccommodationChangeRequest(
    changeRequest: AccommodationChangeRequestDTO
  ): Observable<AccommodationChangeRequestDTO> {
    return this.http.put<AccommodationChangeRequestDTO>(
      environment.apiHost + 'accommodationChangeRequests',
      changeRequest,
      { headers: this.headers }
    );
  }

  deleteAccommodationChangeRequest(id: number): Observable<void> {
    return this.http.delete<void>(
      environment.apiHost + 'accommodationChangeRequests/' + id
    );
  }

  public findById(id: number): Observable<AccommodationChangeRequestDTO> {
    return this.http.get<AccommodationChangeRequestDTO>(
      environment.apiHost + 'accommodationChangeRequests/' + id
    );
  }
}
