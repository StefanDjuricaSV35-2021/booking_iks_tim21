import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { MaterialModule } from '../infrastructure/material/material.module';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { FooterComponent } from './footer/footer.component';
import { FormsModule } from '@angular/forms';
import { UserNavbarComponent } from './navbar/user-navbar/user-navbar.component';
import { LoggedOutNavbarComponent } from './navbar/logged-out-navbar/logged-out-navbar.component';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    UserNavbarComponent,
    LoggedOutNavbarComponent,
  ],
  exports: [NavbarComponent, FooterComponent],
  imports: [
    FormsModule,
    CommonModule,
    MaterialModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
  ],
})
export class LayoutModule {}
