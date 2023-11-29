import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './layout/profile/profile.component';
import { AppComponent } from './app.component';
import { ChangeProfileComponent } from './layout/change-profile/change-profile.component';

const routes: Routes = [
  { path: 'profile', component: ProfileComponent },
  { path: 'changeProfile', component: ChangeProfileComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
