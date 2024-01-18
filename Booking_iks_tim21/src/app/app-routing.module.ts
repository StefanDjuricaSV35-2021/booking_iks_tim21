import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile/profile.component';

import { LoginComponent } from './infrastructure/auth/login/login.component';
import { SignupComponent } from './infrastructure/auth/signup/signup.component';
import { ChangeProfileComponent } from './profile/change-profile/change-profile.component';
import { ActivateAccountComponent } from './infrastructure/auth/signup/activate.account/activate.account.component';
import { OwnersAccommodationsPageComponent } from './owners-accommodations/owners-accommodations-page/owners-accommodations-page.component';
import { SearchResultsComponent } from './features/search/components/search-results-page/search-results.component';
import { ChangeAccommodationComponent } from './owners-accommodations/change-accommodation/change-accommodation.component';
import { AccommodationCreationRequestsComponent } from './accommodation-requests/acccommodation-creation/accommodation-creation-requests/accommodation-creation-requests.component';
import { AccommodationCreationRequestDetailsComponent } from './accommodation-requests/acccommodation-creation/accommodation-creation-request-details/accommodation-creation-request-details.component';
import { AccommodationUpdatingRequestsComponent } from './accommodation-requests/accommodation-updating/accommodation-updating-requests/accommodation-updating-requests.component';
import { AccommodationUpdatingRequestsDetailsComponent } from './accommodation-requests/accommodation-updating/accommodation-updating-requests-details/accommodation-updating-requests-details.component';
import { HomePageComponent } from './features/home/components/home-page/home-page.component';
import { AccommodationDetailsComponent } from './features/view-reserve-accommodation/components/accommodation-details/accommodation-details.component';
import { ConfirmationPageComponent } from './features/view-reserve-accommodation/components/confirmation-page/confirmation-page.component';
import { AccommodationCreationComponent } from './accommodation-creation/accommodation-creation/accommodation-creation.component';
import { ReservationsPageComponent } from './features/reservation-requests/components/reservations-page/reservations-page.component';
import { FavoriteAccommodationsPageComponent } from './features/favorite-accommodation/components/favorite-accommodations-page/favorite-accommodations-page.component';
import { OwnersReservationsPageComponent } from './features/reservations/components/owners-reservations-page/owners-reservations-page.component';
import { GuestsReservationsPageComponent } from './features/reservations/components/guests-reservations-page/guests-reservations-page.component';
import { GuestOwnerReviewPageComponent } from './features/review/components/guest-owner-review-page/guest-owner-review-page.component';
import { OwnerOwnerReviewPageComponent } from './features/review/components/owner-owner-review-page/owner-owner-review-page.component';
import { AccommodationReviewPageComponent } from './features/review/components/accommodation-review-page/accommodation-review-page.component';
import { ReviewReportPageComponent } from './features/review-report/components/review-report-page/review-report-page.component';
import { AdminUserReportPageComponent } from './features/admin-user-report/components/admin-user-report-page/admin-user-report-page.component';
import { UserReportPageComponent } from './features/user-report/user-report-page/user-report-page.component';
import {ReportPageComponent} from "./features/analytics/components/report-page/report-page.component";
import {NotificationPageComponent} from "./features/notification/notification-page/notification-page.component";

const routes: Routes = [
  { path: '', redirectTo: '/homePage', pathMatch: 'full' },
  { path: 'profile', component: ProfileComponent },
  { path: 'analytics', component: ReportPageComponent },
  { path: 'changeProfile', component: ChangeProfileComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'search', component: SearchResultsComponent },
  { path: 'reservationRequests', component: ReservationsPageComponent },
  { path: 'reservationsGuest', component: GuestsReservationsPageComponent },
  { path: 'reservationsOwner', component: OwnersReservationsPageComponent },
  { path: 'accommodation/:id', component: AccommodationDetailsComponent },
  { path: 'homePage', component: HomePageComponent },
  { path: 'activate', component: ActivateAccountComponent },
  { path: 'activate/:email', component: ActivateAccountComponent },
  { path: 'guestOwnerReview', component: GuestOwnerReviewPageComponent },
  {
    path: 'guestOwnerReview/:ownerId',
    component: GuestOwnerReviewPageComponent,
  },
  { path: 'accommodationReview', component: AccommodationReviewPageComponent },
  {
    path: 'accommodationReview/:accommodationId',
    component: AccommodationReviewPageComponent,
  },
  { path: 'ownerOwnerReview', component: OwnerOwnerReviewPageComponent },
  { path: 'reservation-confirmation', component: ConfirmationPageComponent },
  { path: 'reviewReports', component: ReviewReportPageComponent },
  { path: 'adminUserReports', component: AdminUserReportPageComponent },
  {
    path: 'ownersAccommodations',
    component: OwnersAccommodationsPageComponent,
  },
  {
    path: 'ownersAccommodation/:id',
    component: AccommodationDetailsComponent,
  },
  { path: 'changeAccommodation/:id', component: ChangeAccommodationComponent },

  { path: 'accommodation_create', component: AccommodationCreationComponent },
  {
    path: 'accommodationCreationRequests',
    component: AccommodationCreationRequestsComponent,
  },
  {
    path: 'accommodationCreationRequest/:id',
    component: AccommodationCreationRequestDetailsComponent,
  },
  {
    path: 'accommodationUpdatingRequests',
    component: AccommodationUpdatingRequestsComponent,
  },
  {
    path: 'accommodationUpdatingRequest/:id',
    component: AccommodationUpdatingRequestsDetailsComponent,
  },
  {
    path: 'favoriteAccommodations',
    component: FavoriteAccommodationsPageComponent,
  },
  {
    path: 'userReport',
    component: UserReportPageComponent,
  },
  {
    path: 'notifications',
    component: NotificationPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
