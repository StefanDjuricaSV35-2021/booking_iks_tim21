import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { AccommodationCreationRequestsComponent } from './accommodation-creation-requests/accommodation-creation-requests.component';
import { LayoutModule } from '@angular/cdk/layout';
import { ProfileModule } from '../profile/profile.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { SearchModule } from '../features/search/search.module';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { AccommodationPreviewComponent } from './accommodation-preview/accommodation-preview.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing.module';
import { OwnersAccommodationsModule } from '../owners-accommodations/owners-accommodations.module';

@NgModule({
  declarations: [
    AccommodationCreationRequestsComponent,
    AccommodationPreviewComponent,
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
    SearchModule,
    MatIconModule,
    NgOptimizedImage,
    SharedModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatInputModule,
    BrowserModule,
    AppRoutingModule,
    OwnersAccommodationsModule,
  ],
})
export class AccommodationRequestsModule {}
