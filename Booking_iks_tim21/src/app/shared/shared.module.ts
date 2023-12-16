import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SearchBarComponent} from "./components/search-bar/search-bar.component";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {RouterLink} from "@angular/router";
import { ImageSliderComponent } from './components/image-slider/image-slider.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatInputModule} from "@angular/material/input";



@NgModule({
  declarations: [SearchBarComponent, ImageSliderComponent],
    imports: [
        CommonModule,
        MatIconModule,
        MatButtonModule,
        RouterLink,
        FormsModule,
        MatDatepickerModule,
        MatInputModule,
        ReactiveFormsModule
    ],
    exports: [SearchBarComponent, ImageSliderComponent]
})
export class SharedModule { }
