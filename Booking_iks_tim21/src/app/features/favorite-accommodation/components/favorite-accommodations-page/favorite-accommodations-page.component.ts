import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { FavoriteAccommodationDTO } from 'src/app/core/models/FavoriteAccommodationDTO';
import { AccommodationPreviewDTO } from 'src/app/core/models/accommodationPreviewDTO';
import { User } from 'src/app/core/models/user.model';
import { AccommodationPreviewService } from 'src/app/core/services/accommodation-preview/accommodation-preview.service';
import { FavoriteAccommodationService } from 'src/app/core/services/favorite-accommodation/favorite-accommodation.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';

@Component({
  selector: 'app-favorite-accommodations-page',
  templateUrl: './favorite-accommodations-page.component.html',
  styleUrls: ['./favorite-accommodations-page.component.css'],
})
export class FavoriteAccommodationsPageComponent {
  public accommodations: AccommodationPreviewDTO[] = [];
  public favorites: FavoriteAccommodationDTO[] = [];
  loggedInUser: User = {} as User;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private accommodationService: AccommodationPreviewService,
    private favoriteAccommodationService: FavoriteAccommodationService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/homePage']);
      return;
    }

    const jwtHelperService = new JwtHelperService();
    const userFromLocalStorage: any = localStorage.getItem('user');
    const userEmail: string =
      jwtHelperService.decodeToken(userFromLocalStorage).sub;

    this.userService.getUserByEmail(userEmail).subscribe({
      next: (data: User) => {
        this.loggedInUser = data;

        this.favoriteAccommodationService
          .getUsersFavoriteAccommodations(this.loggedInUser.id)
          .subscribe((data) => {
            this.favorites = data;
            for (const fav of this.favorites) {
              this.accommodationService
                .findById(fav.accommodationId)
                .subscribe((data) => {
                  this.accommodations.push(data);
                });
            }
          });
      },
    });
  }

  removeFavoriteAccommodaiton(accommodationId: number) {
    for (const fav of this.favorites) {
      if (accommodationId == fav.accommodationId) {
        this.favoriteAccommodationService
          .deleteFavoriteAccommodation(fav.favoriteAccommodationId)
          .subscribe({
            next: (_) => {
              window.location.reload();
            },
            error: (error) => {
              this.snackBar.open(
                'Failed to delete saved accommodation',
                'Close',
                {
                  verticalPosition: 'top',
                  horizontalPosition: 'center',
                }
              );
            },
          });
      }
    }
  }
}
