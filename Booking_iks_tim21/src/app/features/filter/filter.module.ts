import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterBarComponent } from './components/filter-bar/filter-bar.component';
import { AmenityFormComponent } from './components/amenity-form/amenity-form.component';
import { AccommodationTypeFormComponent } from './components/accommodation-type-form/accommodation-type-form.component';
import { PriceRangeFormComponent } from './components/price-range-form/price-range-form.component';
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatListModule} from "@angular/material/list";
import {MatRadioModule} from "@angular/material/radio";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatDatepickerModule} from "@angular/material/datepicker";



@NgModule({
  declarations: [
    FilterBarComponent,
    AmenityFormComponent,
    AccommodationTypeFormComponent,
    PriceRangeFormComponent
  ],
    imports: [
        CommonModule,
        MatCheckboxModule,
        MatListModule,
        MatRadioModule,
        FormsModule,
        MatInputModule,
        ReactiveFormsModule

    ],
  exports:[FilterBarComponent]
})
export class FilterModule { }
