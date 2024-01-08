import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReviewReportPageComponent } from './components/review-report-page/review-report-page.component';
import { FormsModule } from '@angular/forms';
import { OwnerReviewReportComponent } from './components/owner-review-report/owner-review-report.component';

@NgModule({
  declarations: [ReviewReportPageComponent, OwnerReviewReportComponent],
  imports: [CommonModule, FormsModule],
})
export class ReviewReportModule {}
