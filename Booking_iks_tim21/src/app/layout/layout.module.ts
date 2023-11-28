import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { MaterialModule } from '../infrastructure/material/material.module';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [NavbarComponent, ProfileComponent],
  exports: [NavbarComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
  ],
})
export class LayoutModule {}
