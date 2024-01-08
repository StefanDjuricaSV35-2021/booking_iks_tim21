import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReviewReportPageComponent } from './components/review-report-page/review-report-page.component';
import { FormsModule } from '@angular/forms';
import { OwnerReviewReportComponent } from './components/owner-review-report/owner-review-report.component';
import { AccommodationReviewReportComponent } from './components/accommodation-review-report/accommodation-review-report.component';

@NgModule({
  declarations: [ReviewReportPageComponent, OwnerReviewReportComponent, AccommodationReviewReportComponent],
  imports: [CommonModule, FormsModule],
})
export class ReviewReportModule {}
