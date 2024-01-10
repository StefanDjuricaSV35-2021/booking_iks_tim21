import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservationsPageComponent } from './components/reservations-page/reservations-page.component';
import { ReservationComponent } from './components/reservation/reservation.component';
import {HomeModule} from "../home/home.module";
import { ResReqFilterBarComponent } from './components/res-req-filter-bar/res-req-filter-bar.component';
import {MatRadioModule} from "@angular/material/radio";
import {MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    ReservationsPageComponent,
    ReservationComponent,
    ResReqFilterBarComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    HomeModule,
    MatRadioModule,
    MatInputModule
  ],
  exports:[ReservationsPageComponent,ReservationComponent]})
export class ReservationRequestsModule { }
