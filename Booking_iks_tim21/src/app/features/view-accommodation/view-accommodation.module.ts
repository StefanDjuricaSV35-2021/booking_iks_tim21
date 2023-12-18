import { NgModule } from '@angular/core';
import { AccommodationDetailsComponent } from './components/accommodation-details/accommodation-details.component';
import {MatCardModule} from "@angular/material/card";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {NgForOf} from "@angular/common";
import {SharedModule} from "../../shared/shared.module";
import {MatNativeDateModule} from "@angular/material/core";




@NgModule({
  declarations: [
    AccommodationDetailsComponent
  ],
  imports: [
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgForOf,
    SharedModule,
  ],

})
export class ViewAccommodationModule { }
