import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OwnerReviewComponent } from './components/owner-review/owner-review.component';
import { OwnerOwnerReviewPageComponent } from './components/owner-owner-review-page/owner-owner-review-page.component';
import { GuestOwnerReviewPageComponent } from './components/guest-owner-review-page/guest-owner-review-page.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    OwnerReviewComponent,
    OwnerOwnerReviewPageComponent,
    GuestOwnerReviewPageComponent,
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class ReviewModule { }
