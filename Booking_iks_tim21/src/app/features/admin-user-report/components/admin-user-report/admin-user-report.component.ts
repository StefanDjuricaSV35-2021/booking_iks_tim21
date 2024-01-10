import { Location } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { JwtHelperService } from '@auth0/angular-jwt';
import {
  ReservationDTO,
  ReservationStatus,
} from 'src/app/core/models/ReservationDTO';
import {
  ReservationRequestDTO,
  ReservationRequestStatus,
} from 'src/app/core/models/ReservationRequestDTO';
import { UserReportDTO } from 'src/app/core/models/UserReportDTO';
import { User } from 'src/app/core/models/user.model';
import { ReservationRequestService } from 'src/app/core/services/reservation-request/reservation-request-service';
import { ReservationService } from 'src/app/core/services/reservation/reservation-service';
import { UserReportService } from 'src/app/core/services/user-report/user-report.service';
import { UserService } from 'src/app/core/services/user/user-service';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';

@Component({
  selector: 'app-admin-user-report',
  templateUrl: './admin-user-report.component.html',
  styleUrls: ['./admin-user-report.component.css'],
})
export class AdminUserReportComponent {
  @Input() userReport: UserReportDTO;
  public reporterEmail: string;
  public reportedUser: User;
  public userEmail: string;
  public role: string;

  constructor(
    private snackBar: MatSnackBar,
    private userService: UserService,
    private location: Location,
    private authService: AuthService,
    private userReportService: UserReportService,
    private reservationService: ReservationService,
    private reservationRequestService: ReservationRequestService
  ) {}

  ngOnInit() {
    this.authService.userState.subscribe((result) => {
      this.role = result;
    });

    const jwtHelperService = new JwtHelperService();
    const userFromLocalStorage: any = localStorage.getItem('user');
    this.userEmail = jwtHelperService.decodeToken(userFromLocalStorage).sub;

    this.userService.getUser(this.userReport.reporterId).subscribe({
      next: (data: User) => {
        if (data != null && data.email != null) {
          this.reporterEmail = data.email;
        }

        this.userService.getUser(this.userReport.reportedId).subscribe({
          next: (data: User) => {
            this.reportedUser = data;
          },
        });
      },
    });
  }

  acceptReport() {
    this.userReportService.deleteUserReport(this.userReport.id).subscribe({
      error: (error) => {
        console.error(error);
      },
    });
    this.reportedUser.blocked = true;
    this.userService.update(this.reportedUser).subscribe({
      error: (error) => {
        console.error(error);
      },
    });

    this.reservationService
      .getCurrentReservations(this.userReport.reportedId)
      .subscribe({
        next: (reservations: ReservationDTO[]) => {
          reservations.forEach((reservation: ReservationDTO) => {
            if ((reservation.status as unknown as string) == 'Active') {
              reservation.status = ReservationStatus.Cancelled;
              this.reservationService.updateReservation(reservation).subscribe({
                error: (error) => {
                  console.error('Error updating reservation:', error);
                },
              });
            }
          });
        },
      });

    this.reservationRequestService
      .getUserRequests(this.userReport.reportedId)
      .subscribe({
        next: (reservationRequests: ReservationRequestDTO[]) => {
          reservationRequests.forEach(
            (reservationRequest: ReservationRequestDTO) => {
              if (
                (reservationRequest.status as unknown as string) == 'Declined'
              ) {
                reservationRequest.status = ReservationRequestStatus.Cancelled;

                this.reservationRequestService
                  .update(reservationRequest)
                  .subscribe({
                    error: (error) => {
                      console.error(
                        'Error updating reservation request:',
                        error
                      );
                    },
                  });
              }
            }
          );
        },
      });

    this.location.replaceState(this.location.path());
    window.location.reload();
  }

  rejectReport() {
    this.userReportService.deleteUserReport(this.userReport.id).subscribe({
      error: (error) => {
        console.error(error);
      },
    });
    this.location.replaceState(this.location.path());
    window.location.reload();
  }
}
