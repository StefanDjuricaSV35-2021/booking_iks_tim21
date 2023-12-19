import {Component, Input, signal} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AccommodationDetailsDTO} from "../accommodation-details/model/AccommodationDetailsDTO";
import {HttpParams} from "@angular/common/http";
import {formatDate} from "@angular/common";
import {AccommodationDetailsService} from "../accommodation-details/service/accommodation-details.service";
import {ConfirmationPageComponent} from "../confirmation-page/confirmation-page.component";
import {ReservationRequestDTO} from "./model/ReservationRequestDTO";
import {MakeReservationService} from "./service/make-reservation.service";
import {TimeSlot} from "../../../../accommodation-creation/accommodation-creatino/model/timeSlot.model";

@Component({
  selector: 'app-make-reservation-bar',
  templateUrl: './make-reservation-bar.component.html',
  styleUrls: ['./make-reservation-bar.component.css']
})
export class MakeReservationBarComponent {

  @Input() acc:AccommodationDetailsDTO;
  dateFrom;
  dateTo;
  noGuests;
  price;

  reservationForm: FormGroup;
  constructor(private fb: FormBuilder,
              private route:ActivatedRoute,
              private service:AccommodationDetailsService,
              private router:Router,
              private serviceReq:MakeReservationService) {}
  ngOnInit(): void {

    this.initializeFields()


    this.reservationForm = this.fb.group({
      dateFrom: [this.dateFrom, [Validators.required]],
      dateTo: [this.dateTo, [Validators.required]],
      noGuests: [this.noGuests, [Validators.required]],

    },);
    this.reservationForm.setValidators([ValidateDates,ValidateAvailability(this.reservationForm,this.acc.dates!)])

  }

  initializeFields(){

    this.route.queryParams.subscribe(params => {

      this.dateFrom = params['dateFrom'];
      this.dateTo = params['dateTo'];
      this.noGuests = params['noGuests'];
      this.price = params['price'];


    });
  }

  saveForm(form: FormGroup) {



  }

  protected readonly ValidateDates = ValidateDates;
  protected readonly ValidateAvailability = ValidateAvailability;

  dateChange(arrivalVal: HTMLInputElement, departureVal: HTMLInputElement) {

    console.log("")
    let date1=formatDate(new Date(arrivalVal.value),'yyyy-MM-dd','en_US');
    let date2= formatDate(new Date(departureVal.value),'yyyy-MM-dd','en_US');

    if(this.reservationForm.valid){

      let p=new HttpParams()
        .set('dateFrom',date1)
        .set('dateTo',date2)
        .set('id',this.acc.id)
        .set('noGuests',this.reservationForm.get('noGuests')?.value)

      this.service.getPrice(p).subscribe(data => {
        this.price = data;
      });

    }else{
      this.price=undefined;
    }

  }

  protected readonly ConfirmationPageComponent = ConfirmationPageComponent;

  createRequest() {

    let date1=new Date(this.reservationForm.get('dateFrom')?.value)
    let date2= new Date(this.reservationForm.get('dateTo')?.value)

    let ts=new TimeSlot()
    ts.startDate=Math.floor(date1.getTime() / 1000)
    ts.endDate=Math.floor(date2.getTime() / 1000)


    let req=new ReservationRequestDTO(
      7,
      this.acc.id,
      this.reservationForm.get('noGuests')?.value,
      this.price,
      ts,
      3
    );

    this.serviceReq.createReservationReq(req).subscribe(data => {
      console.log(data);
    });

    this.router.navigate([ '/', 'reservation-confirmation' ]);


  }
}

export const ValidateDates: ValidatorFn = (fg: AbstractControl) => {


  const start:string = fg.get('dateFrom')!.value;
  const end:string = fg.get('dateTo')!.value;

  let date1=new Date(start);
  let date2=new Date(end);


  return start != null && end != null && (date1 < date2)
    ? null
    : { range: true };
};


export function ValidateAvailability(fg:FormGroup,dates: string[]): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {

    let dateFrom=fg.get('dateFrom')?.value
    let dateTo=fg.get('dateTo')?.value



    let dateFromO=new Date(dateFrom)
    let dateToO=new Date(dateTo)
    let valid=false;

    for (var d = dateFromO; d <= dateToO; d.setDate(d.getDate() + 1)) {
      valid=false;
      for (const dateRange of dates) {

        let dates=dateRange.split(";")
        let date1=new Date(Number(dates[0])*1000);
        let date2=new Date(Number(dates[1])*1000);

        if(d>=date1&&d<date2){
          valid=true;
          break;
        }

      }

      if(!valid){
        return { valid:false }
      }

    }
    return null
    };
}
