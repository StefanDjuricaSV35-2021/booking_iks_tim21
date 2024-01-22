import { Component, Input } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccommodationDetailsDTO } from '../../../../core/models/AccommodationDetailsDTO';
import { formatDate } from '@angular/common';
import { AccommodationDetailsService } from '../../../../core/services/accommodation-details/accommodation-details.service';
import { ReservationRequestService } from '../../../../core/services/reservation-request/reservation-request-service';
import { TimeSlot } from '../../../../core/models/timeSlot.model';
import { AppSettings } from '../../../../shared/AppSettings';
import { User } from '../../../../core/models/user.model';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserService } from '../../../../core/services/user/user-service';
import { NotificationService } from '../../../../core/services/notification/notification.service';
import {
  NotificationDTO,
  NotificationType,
} from '../../../../core/models/NotificationDTO';
import {
  ReservationDTO,
  ReservationStatus,
} from '../../../../core/models/ReservationDTO';
import {
  ReservationRequestDTO,
  ReservationRequestStatus,
} from '../../../../core/models/ReservationRequestDTO';

@Component({
  selector: 'app-make-reservation-bar',
  templateUrl: './make-reservation-bar.component.html',
  styleUrls: ['./make-reservation-bar.component.css'],
})
export class MakeReservationBarComponent {
  @Input() acc: AccommodationDetailsDTO;
  dateFrom;
  dateTo;
  noGuests;
  price;

  reservationForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private accService: AccommodationDetailsService,
    private router: Router,
    private serviceReq: ReservationRequestService,
    private service: UserService,
    private notifService: NotificationService
  ) {}
  ngOnInit(): void {
    this.initializeFields();
    this.initializeFormGroup();
  }

  initializeFields() {
    this.route.queryParams.subscribe((params) => {
      this.dateFrom = params['dateFrom'];
      this.dateTo = params['dateTo'];
      this.noGuests = params['noGuests'];
      this.price = params['price'];
    });
  }

  initializeFormGroup() {
    this.reservationForm = this.fb.group({
      dateFrom: [this.dateFrom, [Validators.required]],
      dateTo: [this.dateTo, [Validators.required]],
      noGuests: [
        this.noGuests,
        [
          Validators.required,
          Validators.min(this.acc.minGuests),
          Validators.max(this.acc.maxGuests),
        ],
      ],
    });

    this.reservationForm.setValidators([
      ValidateDates,
      ValidateAvailability(this.reservationForm, this.acc.dates!),
    ]);
  }

  updatePrice(
    dateFromInput: HTMLInputElement,
    dateToInput: HTMLInputElement,
    noGuestsInput: HTMLInputElement
  ) {
    if (this.reservationForm.valid) {
      let dateFrom = formatDate(
        new Date(new Date(dateFromInput.value).setHours(0, 0, 0, 0)),
        'yyyy-MM-dd',
        'en_US'
      );
      let dateTo = formatDate(
        new Date(new Date(dateToInput.value).setHours(0, 0, 0, 0)),
        'yyyy-MM-dd',
        'en_US'
      );
      let id = this.acc.id;
      let noGuests = noGuestsInput.value;

      this.accService
        .getPrice(id, dateFrom, dateTo, noGuests)
        .subscribe((data) => {
          this.price = data;
        });
    } else {
      this.price = undefined;
    }
  }
  submitRequest() {
    this.extractFormData();
    this.router.navigate(['/', 'reservation-confirmation']);
  }

  extractFormData() {
    let dateFrom = new Date(
      new Date(this.reservationForm.get('dateFrom')?.value).setHours(0, 0, 0, 0)
    );
    let dateTo = new Date(
      new Date(this.reservationForm.get('dateTo')?.value).setHours(0, 0, 0, 0)
    );

    let ts = new TimeSlot();
    ts.startDate =
      Math.floor(dateFrom.getTime() / AppSettings.unixMultiplier) +
      3600000 / AppSettings.unixMultiplier;
    ts.endDate =
      Math.floor(dateTo.getTime() / AppSettings.unixMultiplier) +
      3600000 / AppSettings.unixMultiplier;

    this.route.params.subscribe((params) => {
      this.route.params.subscribe((params) => {
        const jwtHelperService = new JwtHelperService();
        const userFromLocalStorage: any = sessionStorage.getItem('user');
        let userEmail = jwtHelperService.decodeToken(userFromLocalStorage).sub;
        this.service.getUserByEmail(userEmail).subscribe({
          next: (data: User) => {
            let user = data;

            this.sendReservationRequest(user.id, ts);
          },
        });
      });
    });
  }

  sendReservationRequest(userId: number, ts: TimeSlot) {
    let req = new ReservationRequestDTO(
      userId,
      this.acc.id,
      this.reservationForm.get('noGuests')?.value,
      this.price,
      ts,
      ReservationRequestStatus.Waiting
    );

    this.serviceReq.createReservationReq(req).subscribe((data) => {
      this.sendNotification();
    });
  }

  sendNotification() {
    let notification = new NotificationDTO(
      NotificationType.RESERVATION_REQUEST,
      'You have a new reservation request',
      this.acc.ownerId
    );
    this.notifService.sendNotification(notification);
  }
}

export const ValidateDates: ValidatorFn = (fg: AbstractControl) => {
  const dateFromInput: string = fg.get('dateFrom')!.value;
  const dateToFormInput: string = fg.get('dateTo')!.value;


  let dateFrom = new Date(new Date(dateFromInput).setHours(0, 0, 0, 0));
  let dateTo = new Date(new Date(dateToFormInput).setHours(0, 0, 0, 0));
  let ver=(dateFromInput != null) && (dateToFormInput != null) && (dateFrom < dateTo);
  if( (dateFromInput != null) && (dateToFormInput != null) && (dateFrom < dateTo)){
    return null;
  }else{
    return { range: true };
  }
};

export function ValidateAvailability(
  fg: FormGroup,
  dates: TimeSlot[]
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (dates == undefined) return { valid: false };
    let dateFrom = new Date(
      new Date(fg.get('dateFrom')?.value).setHours(0, 0, 0, 0)
    );
    let dateTo = new Date(
      new Date(fg.get('dateTo')?.value).setHours(0, 0, 0, 0)
    );

    let inTimeSlots = checkIfDateRangeInTimeSlots(dateFrom, dateTo, dates);

    if (inTimeSlots) {
      return null;
    } else {
      return { valid: false };
    }
  };
}

export function checkIfDateRangeInTimeSlots(
  dateFrom: Date,
  dateTo: Date,
  timeSlots: TimeSlot[]
) {
  for (var d = dateFrom; d <= dateTo; d.setDate(d.getDate() + 1)) {
    let inDates = checkIfDateInTimeSlots(d, timeSlots);

    if (!inDates) {
      return false;
    }
  }

  return true;
}

export function checkIfDateInTimeSlots(date: Date, timeSlots: TimeSlot[]) {
  for (const ts of timeSlots) {
    let dateFrom = new Date(
      new Date(ts.startDate * AppSettings.unixMultiplier).setHours(0, 0, 0, 0)
    );
    let dateTo = new Date(
      new Date(ts.endDate * AppSettings.unixMultiplier).setHours(0, 0, 0, 0)
    );

    if (date >= dateFrom && date <= dateTo) {
      return true;
    }
  }

  return false;
}
