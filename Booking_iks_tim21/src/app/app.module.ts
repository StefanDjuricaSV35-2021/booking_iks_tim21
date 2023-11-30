import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatDatepicker, MatDatepickerModule} from "@angular/material/datepicker";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from './layout/layout.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AccommodationDetailsComponent } from './accommodation-details/accommodation-details.component';
import {MatCardModule} from "@angular/material/card";
import {MatNativeDateModule} from "@angular/material/core";
import { MainPageComponent } from './main-page/main-page.component';
import {MatButtonModule} from "@angular/material/button";

@NgModule({
  declarations: [AppComponent, AccommodationDetailsComponent, MainPageComponent],
    imports: [BrowserModule, AppRoutingModule, LayoutModule, BrowserAnimationsModule, MatCardModule, MatDatepickerModule, MatNativeDateModule, MatButtonModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
