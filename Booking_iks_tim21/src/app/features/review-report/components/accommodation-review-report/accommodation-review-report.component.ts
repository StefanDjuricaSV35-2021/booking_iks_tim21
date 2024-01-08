import { Location } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AccommodationReviewDTO } from 'src/app/core/models/AccommodationReviewDTO';
import { ReviewReportDTO } from 'src/app/core/models/ReviewReportDTO';
import { User } from 'src/app/core/models/user.model';
import { AccommodationReviewService } from 'src/app/core/services/accommodation-review/accommodation-review-service';
import { OwnerReviewService } from 'src/app/core/services/owner-review/owner-review.service';
import { ReviewReportService } from 'src/app/core/services/review-report/review-report-service';
import { UserService } from 'src/app/core/services/user/user-service';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';

@Component({
  selector: 'app-accommodation-review-report',
  templateUrl: './accommodation-review-report.component.html',
  styleUrls: ['./accommodation-review-report.component.css'],
})
export class AccommodationReviewReportComponent {
  @Input() reviewReport: ReviewReportDTO;
  revv: AccommodationReviewDTO;
  public email: string = 'user not found';
  public userEmail: string;
  public role: string;
  ownerEmail: string;

  constructor(
    private snackBar: MatSnackBar,
    private service: UserService,
    private accommodationReviewService: AccommodationReviewService,
    private location: Location,
    private authService: AuthService,
    private reviewReportService: ReviewReportService
  ) {}

  ngOnInit() {
    this.authService.userState.subscribe((result) => {
      this.role = result;
    });

    const jwtHelperService = new JwtHelperService();
    const userFromLocalStorage: any = localStorage.getItem('user');
    this.userEmail = jwtHelperService.decodeToken(userFromLocalStorage).sub;

    this.accommodationReviewService
      .getAccommodationReview(this.reviewReport.reportedReviewId)
      .subscribe({
        next: (data: AccommodationReviewDTO) => {
          if (data == null) {
            return;
          }
          this.revv = data;
          this.service.getUser(this.revv.reviewerId).subscribe({
            next: (data: User) => {
              if (data != null && data.email != null) {
                this.email = data.email;
              }
            },
          });

          this.service.getUser(this.reviewReport.reporterId).subscribe({
            next: (data: User) => {
              if (data != null && data.email != null) {
                this.ownerEmail = data.email;
              }
            },
          });
        },
      });
  }
  formatDate(milliseconds: number): string {
    const date = new Date(milliseconds);

    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  getStarIcons(rating: number): string {
    const stars = '★'.repeat(rating) + '☆'.repeat(5 - rating);
    return stars;
  }

  acceptReport() {
    this.reviewReportService
      .deleteReviewReport(this.reviewReport.id)
      .subscribe({
        error: (error) => {
          console.error(error);
        },
      });
    this.accommodationReviewService
      .deleteAccommodationReview(this.revv.id)
      .subscribe({
        error: (error) => {
          console.error(error);
        },
      });
    this.location.replaceState(this.location.path());
    window.location.reload();
  }

  rejectReport() {
    this.reviewReportService
      .deleteReviewReport(this.reviewReport.id)
      .subscribe({
        error: (error) => {
          console.error(error);
        },
      });
    this.location.replaceState(this.location.path());
    window.location.reload();
  }
}
