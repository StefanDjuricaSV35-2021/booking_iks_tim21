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

const routes: Routes = [
  { path: '', redirectTo: '/homePage', pathMatch: 'full' },
  { path: 'profile', component: ProfileComponent },
  { path: 'changeProfile', component: ChangeProfileComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'search', component: SearchResultsComponent },
  { path: 'reservationRequests', component: ReservationsPageComponent },
  { path: 'accommodation/:id', component: AccommodationDetailsComponent },
  { path: 'homePage', component: HomePageComponent },
  { path: 'activate', component: ActivateAccountComponent },
  { path: 'activate/:email', component: ActivateAccountComponent },
  { path: 'reservation-confirmation', component: ConfirmationPageComponent },
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
