import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ReservationDTO } from 'src/app/core/models/ReservationDTO';
import { Role, User } from 'src/app/core/models/user.model';
import { ReservationService } from 'src/app/core/services/reservation/reservation-service';
import { UserService } from 'src/app/core/services/user/user-service';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';

@Component({
  selector: 'app-guests-reservations-page',
  templateUrl: './guests-reservations-page.component.html',
  styleUrls: ['./guests-reservations-page.component.css'],
})
export class GuestsReservationsPageComponent {
  res: ReservationDTO[];

  constructor(
    private reservationService: ReservationService,
    private service: UserService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/homePage']);
      return;
    }

    this.route.params.subscribe((params) => {
      const id = +params['userId'];

      const jwtHelperService = new JwtHelperService();
      const userFromLocalStorage: any = localStorage.getItem('user');
      const userEmail: string =
        jwtHelperService.decodeToken(userFromLocalStorage).sub;
      this.service.getUserByEmail(userEmail).subscribe({
        next: (data: User) => {
          if (Role[Role[data.role]] == 'GUEST') {
            this.reservationService
              .getCurrentReservations(data.id)
              .subscribe((data) => {
                this.res = data;
              });
          } else {
            this.snackBar.open('Logged in user is not a guest', 'Close', {
              verticalPosition: 'top',
              horizontalPosition: 'center',
            });
            if (!this.authService.isLoggedIn()) {
              this.router.navigate(['/homePage']);
              return;
            }
          }
        },
      });
    });
  }
}
