import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OwnerReviewComponent } from './components/owner-review/owner-review.component';
import { OwnerOwnerReviewPageComponent } from './components/owner-owner-review-page/owner-owner-review-page.component';
import { GuestOwnerReviewPageComponent } from './components/guest-owner-review-page/guest-owner-review-page.component';
import { FormsModule } from '@angular/forms';
import { AccommodationReviewComponent } from './components/accommodation-review/accommodation-review.component';
import { AccommodationReviewPageComponent } from './components/accommodation-review-page/accommodation-review-page.component';


@NgModule({
  declarations: [
    OwnerReviewComponent,
    OwnerOwnerReviewPageComponent,
    GuestOwnerReviewPageComponent,
    AccommodationReviewComponent,
    AccommodationReviewPageComponent,
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class ReviewModule { }
