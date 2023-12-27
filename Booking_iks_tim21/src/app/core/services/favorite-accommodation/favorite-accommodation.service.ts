import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../env/env';
import { FavoriteAccommodationDTO } from '../../models/FavoriteAccommodationDTO'; // Import DTO as per your project structure

@Injectable({
  providedIn: 'root',
})
export class FavoriteAccommodationService {
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient) {}

  public getFavoriteAccommodations(): Observable<FavoriteAccommodationDTO[]> {
    return this.http.get<FavoriteAccommodationDTO[]>(
      `${environment.apiHost}favorite/accommodations`
    );
  }

  public getUsersFavoriteAccommodations(
    userId: number
  ): Observable<FavoriteAccommodationDTO[]> {
    return this.http.get<FavoriteAccommodationDTO[]>(
      `${environment.apiHost}favorite/accommodations/user/${userId}`
    );
  }

  public getFavoriteAccommodation(
    id: number
  ): Observable<FavoriteAccommodationDTO> {
    return this.http.get<FavoriteAccommodationDTO>(
      `${environment.apiHost}favorite/accommodations/${id}`
    );
  }

  public saveFavoriteAccommodation(
    favoriteAccommodationDTO: FavoriteAccommodationDTO
  ): Observable<FavoriteAccommodationDTO> {
    return this.http.post<FavoriteAccommodationDTO>(
      `${environment.apiHost}favorite/accommodations`,
      favoriteAccommodationDTO,
      { headers: this.headers }
    );
  }

  public updateFavoriteAccommodation(
    favoriteAccommodationDTO: FavoriteAccommodationDTO
  ): Observable<FavoriteAccommodationDTO> {
    return this.http.put<FavoriteAccommodationDTO>(
      `${environment.apiHost}favorite/accommodations`,
      favoriteAccommodationDTO,
      { headers: this.headers }
    );
  }

  public deleteFavoriteAccommodation(id: number): Observable<void> {
    return this.http.delete<void>(
      `${environment.apiHost}favorite/accommodations/${id}`
    );
  }
}
