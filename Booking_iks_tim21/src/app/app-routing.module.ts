import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile/profile.component';
import { AppComponent } from './app.component';

import { LoginComponent } from './infrastructure/auth/login/login.component';
import { SignupComponent } from './infrastructure/auth/signup/signup.component';
import { ChangeProfileComponent } from './profile/change-profile/change-profile.component';
import { AccommodationDetailsComponent } from './accommodation-details/accommodation-details.component';
import { MainPageComponent } from './main-page/main-page.component';
import { ActivateAccountComponent } from './infrastructure/auth/signup/activate.account/activate.account.component';
import { AccommodationCreatinoComponent } from './accommodation-creation/accommodation-creatino/accommodation-creatino.component';

const routes: Routes = [
  { path: '', redirectTo: '/mainPage', pathMatch: 'full' },
  { path: 'profile', component: ProfileComponent },
  { path: 'changeProfile', component: ChangeProfileComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'accommodation/:id', component: AccommodationDetailsComponent },
  { path: 'mainPage', component: MainPageComponent },
  { path: 'activate', component: ActivateAccountComponent },
  { path: 'activate/:email', component: ActivateAccountComponent },
  { path: 'accommodation_create', component: AccommodationCreatinoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
