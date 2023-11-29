import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './layout/profile/profile.component';
import { AppComponent } from './app.component';
import { LoginComponent } from './layout/login/login.component';

const routes: Routes = [{ path: 'profile', component: ProfileComponent},{ path: 'login', component: LoginComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
