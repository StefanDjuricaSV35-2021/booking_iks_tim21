import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile/profile.component';
import { AppComponent } from './app.component';

import { LoginComponent } from './layout/login/login.component';
import { SignupComponent } from './layout/signup/signup.component';
import { ChangeProfileComponent } from './profile/change-profile/change-profile.component';
import { AccommodationDetailsComponent } from './accommodation-details/accommodation-details.component';
import { MainPageComponent } from './main-page/main-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/mainPage', pathMatch: 'full' },
  { path: 'profile', component: ProfileComponent },
  { path: 'changeProfile', component: ChangeProfileComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'accommodation/:id', component: AccommodationDetailsComponent },
  { path: 'mainPage', component: MainPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
