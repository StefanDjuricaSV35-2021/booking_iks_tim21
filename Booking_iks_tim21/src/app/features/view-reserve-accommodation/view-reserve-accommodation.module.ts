import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NgForOf, NgIf } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { MatNativeDateModule } from '@angular/material/core';
import { AccommodationDetailsComponent } from './components/accommodation-details/accommodation-details.component';
import { MapComponent } from '../../shared/components/map/map.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MakeReservationBarComponent } from './components/reservation-request-bar/make-reservation-bar.component';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ConfirmationPageComponent } from './components/confirmation-page/confirmation-page.component';
import { RouterLink } from '@angular/router';
import { AvailabilityCalendarComponent } from './components/availability-calendar/availability-calendar.component';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [
    AvailabilityCalendarComponent,
    AccommodationDetailsComponent,
    MakeReservationBarComponent,
    ConfirmationPageComponent,
    AvailabilityCalendarComponent,
  ],
  imports: [
    LeafletModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgForOf,
    SharedModule,
    MatDialogModule,
    NgIf,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    RouterLink,
    MatSnackBarModule,
  ],

  exports: [ConfirmationPageComponent, AccommodationDetailsComponent],
})
export class ViewReserveAccommodationModule {}
