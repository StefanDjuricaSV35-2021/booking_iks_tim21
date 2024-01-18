import { formatDate } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AccommodationDetailsDTO } from 'src/app/core/models/AccommodationDetailsDTO';
import {
  NotificationDTO,
  NotificationType,
} from 'src/app/core/models/NotificationDTO';
import {
  ReservationDTO,
  ReservationStatus,
} from 'src/app/core/models/ReservationDTO';
import {
  ReservationRequestDTO,
  ReservationRequestStatus,
} from 'src/app/core/models/ReservationRequestDTO';
import { AccommodationPricingDTO } from 'src/app/core/models/accommodationPricing.model';
import { TimeSlot } from 'src/app/core/models/timeSlot.model';
import { Role, User } from 'src/app/core/models/user.model';
import { AccommodationDetailsService } from 'src/app/core/services/accommodation-details/accommodation-details.service';
import { AccommodationPricingService } from 'src/app/core/services/accommodation-pricing/accommodationPricing.service';
import { NotificationService } from 'src/app/core/services/notification/notification.service';
import { ReservationRequestService } from 'src/app/core/services/reservation-request/reservation-request-service';
import { ReservationService } from 'src/app/core/services/reservation/reservation-service';
import { UserService } from 'src/app/core/services/user/user-service';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { AppSettings } from 'src/app/shared/AppSettings';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css'],
})
export class ReservationComponent {
  @Input() reservation: ReservationDTO;
  role: string;
  id: number;
  accommodation: AccommodationDetailsDTO;
  accName: string;
  userName: string;
  dateFrom: string;
  dateTo: string;
  status: string;
  noGuests: string;
  price: string;
  canBeCancelled: boolean = false;
  daysDifference: number;

  constructor(
    private userService: UserService,
    private accommodationService: AccommodationDetailsService,
    private reservationService: ReservationService,
    private authService: AuthService,
    private notifService: NotificationService
  ) {}

  ngOnInit() {
    this.authService.userState.subscribe((result) => {
      this.role = result;
    });

    this.userService.getUser(this.reservation.userId).subscribe((data) => {
      this.userName = data.name!;
    });

    this.accommodationService
      .findById(this.reservation.accommodationId)
      .subscribe((data) => {
        this.accommodation = data;
        this.accName = data.name!;

        const currentDate = new Date();
        const reservationStartDate = new Date(
          this.reservation.timeSlot.startDate * AppSettings.unixMultiplier
        );

        this.daysDifference =
          Math.floor(
            (reservationStartDate.getTime() - currentDate.getTime()) /
              (24 * 60 * 60 * 1000)
          ) + 1;

        this.canBeCancelled =
          this.daysDifference >= this.accommodation.daysForCancellation;
      });

    this.dateFrom = formatDate(
      new Date(
        new Date(
          this.reservation.timeSlot.startDate * AppSettings.unixMultiplier
        ).setHours(0, 0, 0, 0)
      ),
      'dd-MM-yyy',
      'en_US'
    );
    this.dateTo = formatDate(
      new Date(
        new Date(
          this.reservation.timeSlot.endDate * AppSettings.unixMultiplier
        ).setHours(0, 0, 0, 0)
      ),
      'dd-MM-yyy',
      'en_US'
    );
    this.status = ReservationStatus[ReservationStatus[this.reservation.status]];
  }

  updateReservations() {
    this.reservationService
      .updateReservation(this.reservation)
      .subscribe((data) => {});
  }

  cancel() {
    this.status = 'Cancelled';
    this.reservation.status = ReservationStatus.Cancelled;
    this.updateReservations();
    this.sendNotificationCanceled();
  }

  sendNotificationCanceled() {
    let notification = new NotificationDTO(
      NotificationType.RESERVATION_CANCELLATION,
      'Your request has been cancelled',
      this.accommodation.ownerId
    );
    this.notifService.sendNotification(notification);
  }

  protected readonly ReservationRequestStatus = ReservationRequestStatus;
}
