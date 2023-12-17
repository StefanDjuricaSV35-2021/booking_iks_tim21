import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { AccommodationCreationRequestsComponent } from './accommodation-creation-requests/accommodation-creation-requests.component';
import { LayoutModule } from '@angular/cdk/layout';
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
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing.module';
import { AccommodationCreationRequestDetailsComponent } from './accommodation-creation-request-details/accommodation-creation-request-details.component';
import { AccommodationCreationRequestPreviewComponent } from './accommodation-creation-request-preview/accommodation-creation-request-preview.component';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    AccommodationCreationRequestsComponent,
    AccommodationCreationRequestDetailsComponent,
    AccommodationCreationRequestPreviewComponent,
  ],
  imports: [
    CommonModule,
    LayoutModule,
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
    MatSnackBarModule,
  ],
})
export class AccommodationRequestsModule {}
