import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterBarComponent } from './components/filter-bar/filter-bar.component';
import { AmenityFormComponent } from './components/amenity-form/amenity-form.component';
import { AccommodationTypeFormComponent } from './components/accommodation-type-form/accommodation-type-form.component';
import { PriceRangeFormComponent } from './components/price-range-form/price-range-form.component';
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatListModule} from "@angular/material/list";
import {MatRadioModule} from "@angular/material/radio";
import {FormsModule} from "@angular/forms";



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
    FormsModule
  ],
  exports:[FilterBarComponent]
})
export class FilterModule { }
