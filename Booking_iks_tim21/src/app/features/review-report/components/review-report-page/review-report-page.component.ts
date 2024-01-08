import { Component } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ReviewReportDTO } from 'src/app/core/models/ReviewReportDTO';
import { ReviewReportService } from 'src/app/core/services/review-report/review-report-service';
import { UserService } from 'src/app/core/services/user/user-service';

@Component({
  selector: 'app-review-report-page',
  templateUrl: './review-report-page.component.html',
  styleUrls: ['./review-report-page.component.css'],
})
export class ReviewReportPageComponent {
  public ownerReviewReports: ReviewReportDTO[];
  constructor(
    private revievReportService: ReviewReportService,
    private userService: UserService
  ) {}
  ngOnInit() {
    this.revievReportService.findAll().subscribe({
      next: (data: ReviewReportDTO[]) => {
        this.ownerReviewReports = data;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
