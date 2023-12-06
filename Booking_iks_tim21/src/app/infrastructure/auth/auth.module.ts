import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [LoginComponent],
  exports: [],
  imports: [
    FormsModule,
    CommonModule,
    MaterialModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
  ],
})
export class AuthModule {}
