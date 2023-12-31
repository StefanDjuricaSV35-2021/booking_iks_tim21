import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
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
import { ChangeAccommodationComponent } from './change-accommodation/change-accommodation.component';
import { SearchModule } from '../features/search/search.module';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { AccommodationPreviewComponent } from '../features/home/components/accommodation-preview/accommodation-preview.component';
import { HomeModule } from '../features/home/home.module';

@NgModule({
  declarations: [
    OwnersAccommodationsPageComponent,
    ChangeAccommodationComponent,
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
    HomeModule,
  ],
})
export class OwnersAccommodationsModule {}
