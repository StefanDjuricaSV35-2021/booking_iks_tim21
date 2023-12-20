import { Component, Input, signal } from '@angular/core';
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
import { HttpParams } from '@angular/common/http';
import { formatDate, Time } from '@angular/common';
import { AccommodationDetailsService } from '../../../../core/services/accommodation-details/accommodation-details.service';
import { ConfirmationPageComponent } from '../confirmation-page/confirmation-page.component';
import { ReservationRequestDTO } from '../../../../core/models/ReservationRequestDTO';
import { ReservationRequestService } from '../../../../core/services/reservation-request/reservation-request-service';
import { TimeSlot } from '../../../../core/models/timeSlot.model';
import {AppSettings} from "../../../../shared/AppSettings";

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
    private serviceReq: ReservationRequestService
  ) {}
  ngOnInit(): void {
    this.initializeFields();
    this.initializeFormGroup();
    console.log("ovde sam");
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
        new Date(new Date(dateFromInput.value).setHours(0,0,0,0)),
        'yyyy-MM-dd',
        'en_US'
      );
      let dateTo = formatDate(
        new Date(new Date(dateToInput.value).setHours(0,0,0,0)),
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
    let req = this.extractFormData();

    this.serviceReq.createReservationReq(req).subscribe((data) => {
      console.log(data);
    });

    this.router.navigate(['/', 'reservation-confirmation']);
  }

  extractFormData() {
    let dateFrom = new Date(new Date(this.reservationForm.get('dateFrom')?.value).setHours(0,0,0,0));
    let dateTo = new Date(new Date(this.reservationForm.get('dateTo')?.value).setHours(0,0,0,0));

    let ts = new TimeSlot();
    ts.startDate = Math.floor(dateFrom.getTime() / AppSettings.unixMultiplier);
    ts.endDate = Math.floor(dateTo.getTime() / AppSettings.unixMultiplier);

    let req = new ReservationRequestDTO(
      7,
      this.acc.id,
      this.reservationForm.get('noGuests')?.value,
      this.price,
      ts,
      3
    );

    return req;
  }
}

export const ValidateDates: ValidatorFn = (fg: AbstractControl) => {
  const dateFromInput: string = fg.get('dateFrom')!.value;
  const dateToFormInput: string = fg.get('dateTo')!.value;

  let dateFrom = new Date(new Date(dateFromInput).setHours(0,0,0,0));
  let dateTo = new Date(new Date(dateToFormInput).setHours(0,0,0,0));

  return dateFromInput != null && dateToFormInput != null && dateFrom < dateTo
    ? null
    : { range: true };
};

export function ValidateAvailability(
  fg: FormGroup,
  dates: TimeSlot[]
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (dates == undefined) return { valid: false };
    let dateFrom = new Date(new Date(fg.get('dateFrom')?.value).setHours(0,0,0,0));
    let dateTo = new Date(new Date(fg.get('dateTo')?.value).setHours(0,0,0,0));

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
    let dateFrom = new Date(new Date(ts.startDate * AppSettings.unixMultiplier).setHours(0,0,0,0));
    let dateTo = new Date(new Date(ts.endDate * AppSettings.unixMultiplier).setHours(0,0,0,0));

    if (date >= dateFrom && date < dateTo) {
      return true;
    }
  }

  return false;
}
