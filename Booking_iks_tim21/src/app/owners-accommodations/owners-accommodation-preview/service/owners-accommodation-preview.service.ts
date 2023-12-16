import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { AccommodationPreviewDTO } from 'src/app/accommodation-preview/model/accommodationPreviewDTO';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { User } from 'src/app/profile/model/user.model';
import { UserService } from 'src/app/profile/user.service';
import { environment } from 'src/env/env';

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
