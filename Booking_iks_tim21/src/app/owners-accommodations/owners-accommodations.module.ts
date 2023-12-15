import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OwnersAccommodationPreviewComponent } from './owners-accommodation-preview/owners-accommodation-preview.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing.module';
import { LayoutModule } from '@angular/cdk/layout';
import { ProfileModule } from '../profile/profile.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { OwnersAccommodationsPageComponent } from './owners-accommodations-page/owners-accommodations-page.component';
import { RouterModule } from '@angular/router';
import { OwnersAccommodationDetailsComponent } from './owners-accommodation-details/owners-accommodation-details.component';

@NgModule({
  declarations: [
    OwnersAccommodationPreviewComponent,
    OwnersAccommodationsPageComponent,
    OwnersAccommodationDetailsComponent,
  ],
  imports: [
    CommonModule,
    LayoutModule,
    ProfileModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    RouterModule,
  ],
})
export class OwnersAccommodationsModule {}
