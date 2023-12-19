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
import { MakeReservationBarComponent } from './components/make-reservation-bar/make-reservation-bar.component';
import {MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";





@NgModule({
  declarations: [
    AccommodationDetailsComponent,
    MapComponent,
    MakeReservationBarComponent
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
  ],

  exports: [
    MapComponent,
    AccommodationDetailsComponent
  ]
})
export class ViewAccommodationModule { }
