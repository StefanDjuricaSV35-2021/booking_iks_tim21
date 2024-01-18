import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {
  MatDatepicker,
  MatDatepickerModule,
} from '@angular/material/datepicker';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { ProfileModule } from './profile/profile.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Interceptor } from './infrastructure/auth/interceptor';
import { OwnersAccommodationsModule } from './owners-accommodations/owners-accommodations.module';
import { MatIconModule } from '@angular/material/icon';
import { NgOptimizedImage } from '@angular/common';
import { SearchModule } from './features/search/search.module';
import { SharedModule } from './shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { RouterModule } from '@angular/router';
import { HomeModule } from './features/home/home.module';
import { ViewReserveAccommodationModule } from './features/view-reserve-accommodation/view-reserve-accommodation.module';
import { MatDialogModule } from '@angular/material/dialog';
import { AccommodationCreationComponent } from './accommodation-creation/accommodation-creation/accommodation-creation.component';
import { CoreModule } from './core/core.module';
import { AccommodationRequestsModule } from './accommodation-requests/accommodation-requests.module';
import { ReservationRequestsModule } from './features/reservation-requests/reservation-requests.module';
import { FavoriteAccommodationModule } from './features/favorite-accommodation/favorite-accommodation.module';
import { ReservationsModule } from './features/reservations/reservations.module';
import { ReviewModule } from './features/review/review.module';
import { ReviewReportModule } from './features/review-report/review-report.module';
import { AdminUserReportModule } from './features/admin-user-report/admin-user-report.module';
import { UserReportModule } from './features/user-report/user-report.module';
import {DaterangeReportComponent} from "./features/analytics/components/daterange-report/daterange-report.component";
import {AnalyticsModule} from "./features/analytics/analytics.module";
import {NotificationService} from "./core/services/notification/notification.service";
import {NotificationModule} from "./features/notification/notification.module";

@NgModule({
  declarations: [AppComponent, AccommodationCreationComponent],
  imports: [
    AnalyticsModule,
    CoreModule,
    ReactiveFormsModule,
    ViewReserveAccommodationModule,
    MatDialogModule,
    HomeModule,
    SearchModule,
    BrowserModule,
    AppRoutingModule,
    ProfileModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    OwnersAccommodationsModule,
    MatIconModule,
    NgOptimizedImage,
    SharedModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    RouterModule,
    AccommodationRequestsModule,
    ReservationRequestsModule,
    FavoriteAccommodationModule,
    ReservationsModule,
    ReviewModule,
    ReviewReportModule,
    AdminUserReportModule,
    UserReportModule,
    NotificationModule,
  ],
  providers: [
   NotificationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
