import {Component, Input} from '@angular/core';
import {formatDate, Location} from "@angular/common";
import {OwnerReviewDTO} from "../../../../core/models/OwnerReviewDTO";
import {ReviewModule} from "../../review.module";
import {UserService} from "../../../../core/services/user/user.service";
import {User} from "../../../../core/models/user.model";
import {JwtHelperService} from "@auth0/angular-jwt";
import {OwnerReviewService} from "../../../../core/services/owner-review/owner-review.service";
import {AuthService} from "../../../../infrastructure/auth/auth.service";
import {ReviewReportService} from "../../../../core/services/review-report/review-report-service";
import {ReviewReportDTO} from "../../../../core/models/ReviewReportDTO";
import {MatSnackBar} from "@angular/material/snack-bar";
@Component({
  selector: 'app-owner-review',
  templateUrl: './owner-review.component.html',
  styleUrls: ['./owner-review.component.css']
})
export class OwnerReviewComponent {
  @Input() revv : OwnerReviewDTO;
  public email:string = "user not found";
  public userEmail:string;
  public role:string;

  constructor(
    private snackBar: MatSnackBar,
    private service:UserService,
    private ownerReviewService: OwnerReviewService,
    private location: Location,
    private authService: AuthService,
    private reviewReportService:ReviewReportService,
  ) {
  }

  ngOnInit(){
    this.authService.userState.subscribe((result) => {
      this.role=result;
    });

    const jwtHelperService = new JwtHelperService();
    const userFromLocalStorage: any = localStorage.getItem('user');
    this.userEmail = jwtHelperService.decodeToken(userFromLocalStorage).sub;

    this.service.getUser(this.revv.reviewerId).subscribe({
      next: (data: User) => {
        if(data!=null && data.email!=null){
          this.email = data.email;
        }
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

  isCurrentUser():boolean{
    return this.userEmail == this.email && this.role == 'GUEST';
  }

  isCurrentUserOwner():boolean{
    return this.role == 'OWNER';
  }

  deleteReview(){
    this.ownerReviewService.deleteOwnerReview(this.revv.id).subscribe({
      error: (error) => {
        console.error(error);
      }
    });

    this.location.replaceState(this.location.path());
    window.location.reload();
  }

  reportReview(){
      let reviewReport:ReviewReportDTO={
        id : 0,
        reportedReviewId:this.revv.id,
        reporterId:this.revv.reviewedId,
      }

      this.reviewReportService.createOwnerReviewReport(reviewReport).subscribe({
        next: (data: ReviewReportDTO) => {
          this.snackBar.open("Review successfully reported!!", 'Close', {
            verticalPosition: 'top',
            horizontalPosition: 'center',
          });
        },
        error: (error) => {
          console.error(error);
        }
      });
  }
}
