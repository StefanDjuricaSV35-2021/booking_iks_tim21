import { Component, Input } from '@angular/core';
import {
  ReservationRequestDTO,
  ReservationRequestStatus,
} from '../../../../core/models/ReservationRequestDTO';
import { UserService } from '../../../../core/services/user/user-service';
import { AccommodationDetailsService } from '../../../../core/services/accommodation-details/accommodation-details.service';
import { formatDate } from '@angular/common';
import { ReservationService } from '../../../../core/services/reservation/reservation-service';

import { AppSettings } from '../../../../shared/AppSettings';
import { TimeSlot } from '../../../../core/models/timeSlot.model';
import { AccommodationPricingService } from '../../../../core/services/accommodation-pricing/accommodationPricing.service';
import { AccommodationPricingDTO } from '../../../../core/models/accommodationPricing.model';
import { ReservationRequestService } from '../../../../core/services/reservation-request/reservation-request-service';
import { AuthService } from '../../../../infrastructure/auth/auth.service';
import {
  ReservationDTO,
  ReservationStatus,
} from '../../../../core/models/ReservationDTO';
import {
  NotificationDTO,
  NotificationType,
} from 'src/app/core/models/NotificationDTO';
import { NotificationService } from 'src/app/core/services/notification/notification.service';
import { ReservationRefreshService } from 'src/app/core/services/reservation/refresh-reservation-service';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css'],
})
export class ReservationComponent {
  @Input() res: ReservationRequestDTO;
  role: string;
  id: number;
  accName: string;
  userName: string;
  dateFrom: string;
  dateTo: string;
  status: string;
  noGuests: string;
  price: string;
  cancels:number;

  constructor(
    private userService: UserService,
    private accommodationService: AccommodationDetailsService,
    private reservationService: ReservationService,
    private pricingService: AccommodationPricingService,
    private reqService: ReservationRequestService,
    private authService: AuthService,
    private notifService: NotificationService,
    private reservationRefreshService: ReservationRefreshService
  ) {}

  ngOnInit() {
    this.authService.userState.subscribe((result) => {
      this.role = result;
    });

    this.userService.getUser(this.res.userId).subscribe((data) => {
      this.userName = data.name!;
    });

    this.accommodationService
      .findById(this.res.accommodationId)
      .subscribe((data) => {
        this.accName = data.name!;
      });

    this.reqService.getUserCancels(this.res.userId).subscribe((data) => {
      this.cancels = data!;
    });

    this.dateFrom = formatDate(
      new Date(
        new Date(
          this.res.timeSlot.startDate * AppSettings.unixMultiplier
        ).setHours(0, 0, 0, 0)
      ),
      'yyyy-MM-dd',
      'en_US'
    );
    this.dateTo = formatDate(
      new Date(
        new Date(
          this.res.timeSlot.endDate * AppSettings.unixMultiplier
        ).setHours(0, 0, 0, 0)
      ),
      'yyyy-MM-dd',
      'en_US'
    );

    this.status =
      ReservationRequestStatus[ReservationRequestStatus[this.res.status]];
  }
  accept() {
    this.res.status = ReservationRequestStatus.Accepted;
    this.status = 'Accepted';
    let res = new ReservationDTO(
      this.res.userId,
      this.res.accommodationId,
      this.res.guestsNumber,
      this.res.price,
      this.res.timeSlot,
      ReservationStatus.Active
    );
    // this.reservationService.createReservation(res).subscribe((data) => {
    //   console.log(data);
    // });
    this.updateRequests();
    this.sendNotificationAccepted();
  }

  updateRequests() {
    this.reqService.update(this.res).subscribe((data) => {
      this.reservationRefreshService.refreshReservations();
    });
  }

  deleteDates(
    dateFrom: string,
    dateTo: string,
    pricings: AccommodationPricingDTO[]
  ) {
    let date1 = new Date(new Date(dateFrom).setHours(0, 0, 0, 0));
    let date2 = new Date(new Date(dateTo).setHours(0, 0, 0, 0));

    for (const ps of pricings) {
      let ts = ps.timeSlot;
      let dateFromm = new Date(
        new Date(ts.startDate * AppSettings.unixMultiplier).setHours(0, 0, 0, 0)
      );
      let dateToo = new Date(
        new Date(ts.endDate * AppSettings.unixMultiplier).setHours(0, 0, 0, 0)
      );

      let newDateF: Date | undefined = undefined;
      let newDateT: Date | undefined = undefined;

      for (var d = date1; d <= date2; d.setDate(d.getDate() + 1)) {
        if (d >= dateFromm && d <= dateToo) {
          if (newDateT == undefined) {
            newDateT = new Date(new Date(d).setHours(0, 0, 0, 0));
          } else {
            newDateF = new Date(new Date(d).setHours(0, 0, 0, 0));
          }
        }
      }

      if (newDateT != undefined && newDateF == undefined) {
        newDateF = dateToo;
      }

      if (newDateT == undefined && newDateF == undefined) {
        continue;
      }

      if (newDateT != dateFromm) {
        let p = new AccommodationPricingDTO();

        let ts = new TimeSlot();
        ts.startDate =
          Math.floor(dateFromm.getTime() / AppSettings.unixMultiplier) +
          3600000 / AppSettings.unixMultiplier;
        ts.endDate =
          newDateT!.getTime() / AppSettings.unixMultiplier +
          3600000 / AppSettings.unixMultiplier;

        p.timeSlot = ts;
        p.accommodationId = ps.accommodationId;
        p.price = ps.price;

        console.log(p.timeSlot.startDate);
        console.log(p.timeSlot.endDate);

        this.pricingService
          .createAccommodationPricing(p)
          .subscribe((date) => {});
      }

      if (newDateF != dateToo) {
        let p = new AccommodationPricingDTO();

        let ts = new TimeSlot();
        ts.startDate =
          Math.floor(newDateF!.getTime() / AppSettings.unixMultiplier) +
          3600000 / AppSettings.unixMultiplier;
        ts.endDate =
          Math.floor(dateToo.getTime() / AppSettings.unixMultiplier) +
          3600000 / AppSettings.unixMultiplier;

        p.timeSlot = ts;
        p.accommodationId = ps.accommodationId;
        p.price = ps.price;

        this.pricingService
          .createAccommodationPricing(p)
          .subscribe((date) => {});
      }
      this.pricingService.delete(ps.id!).subscribe((data) => {});
    }
  }

  decline() {
    this.status = 'Declined';
    this.res.status = ReservationRequestStatus.Declined;
    this.updateRequests();
    this.sendNotificationDeclined();
  }
  cancel() {
    this.status = 'Cancelled';
    this.res.status = ReservationRequestStatus.Cancelled;
    this.updateRequests();
  }

  sendNotificationAccepted() {
    let notification = new NotificationDTO(
      NotificationType.RESERVATION_REQUEST_RESPONSE,
      'Your reservation request has been accepted',
      this.res.userId
    );
    this.notifService.sendNotification(notification);
  }
  sendNotificationDeclined() {
    let notification = new NotificationDTO(
      NotificationType.RESERVATION_REQUEST_RESPONSE,
      'Your reservation request has been declined',
      this.res.userId
    );
    this.notifService.sendNotification(notification);
  }
  protected readonly ReservationRequestStatus = ReservationRequestStatus;
}
