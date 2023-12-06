import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { MaterialModule } from '../infrastructure/material/material.module';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { FooterComponent } from './footer/footer.component';
import { FormsModule } from '@angular/forms';
import { SignupComponent } from './signup/signup.component';

@NgModule({
  declarations: [NavbarComponent, FooterComponent, SignupComponent],
  exports: [NavbarComponent, FooterComponent],
  imports: [
    FormsModule,
    CommonModule,
    MaterialModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
  ],
})
export class LayoutModule {}
