import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './layout/profile/profile.component';
import { AppComponent } from './app.component';
import {AccommodationDetailsComponent} from "./accommodation-details/accommodation-details.component";

const routes: Routes = [ { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'profile', component: ProfileComponent },
  { path: 'accommodation', component: AccommodationDetailsComponent }];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
