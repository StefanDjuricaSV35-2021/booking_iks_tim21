import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile/profile.component';

import { LoginComponent } from './infrastructure/auth/login/login.component';
import { SignupComponent } from './infrastructure/auth/signup/signup.component';
import { ChangeProfileComponent } from './profile/change-profile/change-profile.component';
import { ActivateAccountComponent } from './infrastructure/auth/signup/activate.account/activate.account.component';
import { OwnersAccommodationsPageComponent } from './owners-accommodations/owners-accommodations-page/owners-accommodations-page.component';
import { OwnersAccommodationDetailsComponent } from './owners-accommodations/owners-accommodation-details/owners-accommodation-details.component';
import { SearchResultsComponent } from './features/search/components/search-results-page/search-results.component';
import { AccommodationCreatinoComponent } from './accommodation-creation/accommodation-creatino/accommodation-creatino.component';
import { ChangeAccommodationComponent } from './owners-accommodations/change-accommodation/change-accommodation.component';
import { AccommodationCreationRequestsComponent } from './accommodation-requests/acccommodation-creation/accommodation-creation-requests/accommodation-creation-requests.component';
import { AccommodationCreationRequestDetailsComponent } from './accommodation-requests/acccommodation-creation/accommodation-creation-request-details/accommodation-creation-request-details.component';
import { AccommodationUpdatingRequestsComponent } from './accommodation-requests/accommodation-updating/accommodation-updating-requests/accommodation-updating-requests.component';
import { AccommodationUpdatingRequestsDetailsComponent } from './accommodation-requests/accommodation-updating/accommodation-updating-requests-details/accommodation-updating-requests-details.component';
import {HomePageComponent} from "./features/home/components/home-page/home-page.component";
import {AccommodationDetailsComponent} from "./features/view-accommodation/components/accommodation-details/accommodation-details.component";

const routes: Routes = [
  { path: '', redirectTo: '/homePage', pathMatch: 'full' },
  { path: 'profile', component: ProfileComponent },
  { path: 'changeProfile', component: ChangeProfileComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'search', component: SearchResultsComponent },
  { path: 'accommodation/:id', component: AccommodationDetailsComponent },
  { path: 'homePage', component: HomePageComponent },
  { path: 'activate', component: ActivateAccountComponent },
  { path: 'activate/:email', component: ActivateAccountComponent },
  {
    path: 'ownersAccommodations',
    component: OwnersAccommodationsPageComponent,
  },
  {
    path: 'ownersAccommodation/:id',
    component: OwnersAccommodationDetailsComponent,
  },
  { path: 'changeAccommodation/:id', component: ChangeAccommodationComponent },

  { path: 'accommodation_create', component: AccommodationCreatinoComponent },
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
