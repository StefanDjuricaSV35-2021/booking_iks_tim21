import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FavoriteAccommodationDTO } from '../../models/FavoriteAccommodationDTO';
import { environment } from '../../../../env/env';
import { OwnerReviewDTO } from '../../models/OwnerReviewDTO';

@Injectable({
  providedIn: 'root',
})
export class OwnerReviewService {
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient) {}

  public getAllOwnerReviews(): Observable<OwnerReviewDTO[]> {
    return this.http.get<OwnerReviewDTO[]>(
      `${environment.apiHost}reviews/owners`
    );
  }

  public getOwnerReviews(ownerId: number): Observable<OwnerReviewDTO[]> {
    return this.http.get<OwnerReviewDTO[]>(
      `${environment.apiHost}reviews/owners/${ownerId}`
    );
  }

  public getOwnerReview(id: number): Observable<OwnerReviewDTO> {
    return this.http.get<OwnerReviewDTO>(
      `${environment.apiHost}reviews/owners/one/${id}`
    );
  }

  public createOwnerReview(
    ownerReviewDTO: OwnerReviewDTO
  ): Observable<OwnerReviewDTO> {
    return this.http.post<OwnerReviewDTO>(
      `${environment.apiHost}reviews/owners`,
      ownerReviewDTO,
      { headers: this.headers }
    );
  }

  public deleteOwnerReview(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiHost}reviews/owners/${id}`);
  }
}
