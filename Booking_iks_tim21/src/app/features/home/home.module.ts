import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './components/home-page/home-page.component';
import { SharedModule } from '../../shared/shared.module';
import { AccommodationPreviewComponent } from './components/accommodation-preview/accommodation-preview.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';

@NgModule({
  declarations: [HomePageComponent, AccommodationPreviewComponent],
  imports: [
    CommonModule,
    SharedModule,
    MatButtonModule,
    MatCardModule,
    RouterLink,
  ],
  exports: [AccommodationPreviewComponent],
})
export class HomeModule {}
