import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservationsPageComponent } from './components/reservations-page/reservations-page.component';
import { ReservationComponent } from './components/reservation/reservation.component';
import {HomeModule} from "../home/home.module";



@NgModule({
  declarations: [
    ReservationsPageComponent,
    ReservationComponent
  ],
  imports: [
    CommonModule,
    HomeModule
  ],
  exports:[ReservationsPageComponent,ReservationComponent]})
export class ReservationRequestsModule { }
