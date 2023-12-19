import { NgModule } from '@angular/core';
import {MatCardModule} from "@angular/material/card";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {NgForOf, NgIf} from "@angular/common";
import {SharedModule} from "../../shared/shared.module";
import {MatNativeDateModule} from "@angular/material/core";
import {AccommodationDetailsComponent} from "./components/accommodation-details/accommodation-details.component";
import { MapComponent } from './components/map/map.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import { MakeReservationBarComponent } from './components/reservation-request-bar/make-reservation-bar.component';
import {MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import { ConfirmationPageComponent } from './components/confirmation-page/confirmation-page.component';
import {RouterLink} from "@angular/router";





@NgModule({
  declarations: [
    AccommodationDetailsComponent,
    MapComponent,
    MakeReservationBarComponent,
    ConfirmationPageComponent
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
  ],

  exports: [
    ConfirmationPageComponent,
    MapComponent,
    AccommodationDetailsComponent
  ]
})
export class ViewReserveAccommodationModule { }
