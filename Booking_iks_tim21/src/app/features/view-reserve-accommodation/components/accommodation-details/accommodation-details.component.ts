import { Component, Input } from '@angular/core';
import {
  MatCalendarCellCssClasses,
  MatDatepickerModule,
} from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { AccommodationDetailsDTO } from '../../../../core/models/AccommodationDetailsDTO';
import { ActivatedRoute } from '@angular/router';
import { AccommodationDetailsService } from '../../../../core/services/accommodation-details/accommodation-details.service';
import { SharedModule } from '../../../../shared/shared.module';
import { MatDialog } from '@angular/material/dialog';
import { MapComponent } from '../../../../shared/components/map/map.component';
import { AuthService } from '../../../../infrastructure/auth/auth.service';
import { UserService } from '../../../../core/services/user/user.service';
import { Role, User } from 'src/app/core/models/user.model';
import { FavoriteAccommodationDTO } from 'src/app/core/models/FavoriteAccommodationDTO';
import { FavoriteAccommodationService } from 'src/app/core/services/favorite-accommodation/favorite-accommodation.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-accommodation-details-page',
  templateUrl: './accommodation-details.component.html',
  styleUrls: ['./accommodation-details.component.css'],
})
export class AccommodationDetailsComponent {
  @Input() showForOwner: boolean = false;
  @Input() showForAnybody: boolean = false;
  @Input() showForGuest: boolean = false;

  selected: null | undefined;
  id: number;
  acc: AccommodationDetailsDTO;
  ownerName: string;
  favorites: FavoriteAccommodationDTO[];
  loggedInUser: User;

  constructor(
    private route: ActivatedRoute,
    private service: AccommodationDetailsService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    public authService: AuthService,
    public userService: UserService,
    public favoriteAccommodationService: FavoriteAccommodationService
  ) {}
  ngOnInit(): void {
    this.setUpNgIf();
    this.id = +this.route.snapshot.paramMap.get('id')!;
    this.service.findById(this.id).subscribe((data) => {
      this.acc = data;

      this.userService.getUser(this.acc.ownerId).subscribe((data) => {
        this.ownerName = data.name!;
      });
    });

    this.authService.userState.subscribe((result) => {
      if (result == 'GUEST') {
        this.showForAnybody = true;
      }
    });

    const jwtHelperService = new JwtHelperService();
    const userFromLocalStorage: any = localStorage.getItem('user');
    const userEmail: string =
      jwtHelperService.decodeToken(userFromLocalStorage).sub;
    this.userService.getUserByEmail(userEmail).subscribe({
      next: (data: User) => {
        this.loggedInUser = data;
      },
    });
  }

  openMap() {
    this.dialog.open(MapComponent, {
      data: {
        location: this.acc.location,
      },
    });
  }

  setUpNgIf() {
    if (this.authService.getRole() == Role.GUEST) {
      this.showForGuest = true;
    }

    this.route.queryParams.subscribe((params) => {
      this.showForOwner = params['showForOwner'] === 'true';
      this.showForAnybody = params['showForAnybody'] === 'true';
    });
  }

  addToFavorites() {
    const jwtHelperService = new JwtHelperService();
    const userFromLocalStorage: any = localStorage.getItem('user');
    const userEmail: string =
      jwtHelperService.decodeToken(userFromLocalStorage).sub;

    this.userService.getUserByEmail(userEmail).subscribe({
      next: (data: User) => {
        this.loggedInUser = data;

        this.favoriteAccommodationService
          .getUsersFavoriteAccommodations(this.loggedInUser.id)
          .subscribe((favorites) => {
            for (const fav of favorites) {
              if (fav.accommodationId == this.id) {
                this.snackBar.open('Accommodation is already saved', 'Close', {
                  verticalPosition: 'top',
                  horizontalPosition: 'center',
                });
                return;
              }
            }

            const newFavorite: FavoriteAccommodationDTO = {
              favoriteAccommodationId: 0,
              accommodationId: this.id,
              userId: this.loggedInUser.id,
            };

            this.favoriteAccommodationService
              .saveFavoriteAccommodation(newFavorite)
              .subscribe({
                next: (fav: FavoriteAccommodationDTO) => {
                  this.snackBar.open(
                    'Accommodation added to favorites',
                    'Close',
                    {
                      verticalPosition: 'top',
                      horizontalPosition: 'center',
                    }
                  );
                },
                error: (error) => {
                  this.snackBar.open(
                    'Failed to add accommodation to favorites',
                    'Close',
                    {
                      verticalPosition: 'top',
                      horizontalPosition: 'center',
                    }
                  );
                },
              });
          });
      },
    });
  }

  protected readonly Array = Array;

  protected readonly encodeURIComponent = encodeURIComponent;
}
