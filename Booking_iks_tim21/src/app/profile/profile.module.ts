import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangeProfileComponent } from './change-profile/change-profile.component';
import { ProfileComponent } from './profile/profile.component';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../infrastructure/material/material.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';

@NgModule({
  declarations: [ChangeProfileComponent, ProfileComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    HttpClientModule,
    ReactiveFormsModule,
    MaterialModule,
    MatSnackBarModule,
    MatFormFieldModule,
    JwtModule,
  ],
  providers: [],
})
export class ProfileModule {}
