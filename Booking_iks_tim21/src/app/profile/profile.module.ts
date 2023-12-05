import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangeProfileComponent } from './change-profile/change-profile.component';
import { ProfileComponent } from './profile/profile.component';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [ChangeProfileComponent, ProfileComponent],
  imports: [CommonModule, RouterModule, MatButtonModule, HttpClientModule],
})
export class ProfileModule {}
