import {Component, Input, signal} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators} from "@angular/forms";

@Component({
  selector: 'app-make-reservation-bar',
  templateUrl: './make-reservation-bar.component.html',
  styleUrls: ['./make-reservation-bar.component.css']
})
export class MakeReservationBarComponent {

  @Input() dateFrom;
  @Input() dateTo;
  @Input() noGuests;
  @Input() price;

  reservationForm: FormGroup;
  validateForm = signal<any | null>(null);
  constructor(private fb: FormBuilder) {}
  ngOnInit(): void {
    this.reservationForm = this.fb.group({
      dateFrom: [this.dateFrom, [Validators.required]],
      dateTo: [this.dateTo, [Validators.required]],
      noGuests: [this.noGuests, [Validators.required]],

    },
      {
      validator: ValidateDates
    });
  }

  saveForm(form: FormGroup) {
    console.log('Valid?', form.valid); // true or false
    console.log('Phone Number', form.value.phone);
  }

  protected readonly ValidateDates = ValidateDates;
}

export const ValidateDates: ValidatorFn = (fg: AbstractControl) => {

  console.log("aaaaa")

  const start:string = fg.get('dateFrom')!.value;
  const end:string = fg.get('dateTo')!.value;

  let date1=new Date(start);
  let date2=new Date(end);

  console.log((date1 < date2))

  return start != null && end != null && (date1 < date2)
    ? null
    : { range: true };
};
