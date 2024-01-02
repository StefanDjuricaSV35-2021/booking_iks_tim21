import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OwnersReservationsPageComponent } from './components/owners-reservations-page/owners-reservations-page.component';
import { GuestsReservationsPageComponent } from './components/guests-reservations-page/guests-reservations-page.component';
import { ReservationComponent } from './components/reservation/reservation.component';
import { HomeModule } from '../home/home.module';
import { RouterLink } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    ReservationComponent,
    OwnersReservationsPageComponent,
    GuestsReservationsPageComponent,
  ],
  imports: [CommonModule, HomeModule, RouterLink, MatSnackBarModule],
})
export class ReservationsModule {}
