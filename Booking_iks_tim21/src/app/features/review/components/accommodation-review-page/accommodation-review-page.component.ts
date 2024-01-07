import { Component } from '@angular/core';
import {ReviewModule} from "../../review.module";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../../../core/services/user/user-service";
import {Location} from "@angular/common";
import {JwtHelperService} from "@auth0/angular-jwt";
import {User} from "../../../../core/models/user.model";
import {AccommodationReviewDTO} from "../../../../core/models/AccommodationReviewDTO";
import {AccommodationReviewService} from "../../../../core/services/accommodation-review/accommodation-review-service";
import {
  AccommodationDetailsService
} from "../../../../core/services/accommodation-details/accommodation-details.service";
import {AccommodationDetailsDTO} from "../../../../core/models/AccommodationDetailsDTO";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AuthService} from "../../../../infrastructure/auth/auth.service";

@Component({
  selector: 'app-accommodation-review-page',
  templateUrl: './accommodation-review-page.component.html',
  styleUrls: ['./accommodation-review-page.component.css']
})
export class AccommodationReviewPageComponent {
  public accommodationId:number;
  public userId:number;
  public role:string;
  public accommodationReviews: AccommodationReviewDTO[];
  public averageGrade: number;
  public name:string = "Email not found";
  newReview: any = { rating: 1, description: '' };
  constructor(
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute,
    private accommodationReviewService: AccommodationReviewService,
    private userService: UserService,
    private accommodationDetailsService:AccommodationDetailsService,
    private location: Location,
    private authService:AuthService,
  ) {}
  ngOnInit() {
    this.authService.userState.subscribe((result) => {
      this.role=result;
    });

    const jwtHelperService = new JwtHelperService();
    const userFromLocalStorage: any = localStorage.getItem('user');
    const userEmail: string =
      jwtHelperService.decodeToken(userFromLocalStorage).sub;
    this.userService.getUserByEmail(userEmail).subscribe({
      next: (data: User) => {
        this.userId = data.id;
      },
    });

    let e = this.route.snapshot.paramMap.get('accommodationId');
    if (e == null) {
      this.snackBar.open("Error wrong page path!!!", 'Close', {
        verticalPosition: 'top',
        horizontalPosition: 'center',
      });
      this.router.navigate(['homePage']);
    }else{
      this.accommodationId = parseInt(e,10);
      if (isNaN(this.accommodationId)) {
        console.log("Path is not a valid number.");
        this.router.navigate(['homePage']);
      }

      this.accommodationDetailsService.findById(this.accommodationId).subscribe({
        next: (data: AccommodationDetailsDTO) => {
          if(data!=null && data.name!=null){
            this.name = data.name;
          }
        },
      });

      this.accommodationReviewService.getAccommodationReviews(this.accommodationId).subscribe({
        next: (data: AccommodationReviewDTO[]) => {
          this.accommodationReviews = data;
          this.calculateAverage();
        },
        error: (error) => {
          console.error(error);
        }
      });
    }
  }

  submitReview() {
    if(this.userId == null || this.accommodationId == null){
      console.log("Something went wrong with user and accommodation ids.");
      this.router.navigate(['homePage']);
    }

    if(this.role != 'GUEST'){
      this.snackBar.open("Can\'t create accommodation review since you aren\'t a guest.", 'Close', {
        verticalPosition: 'top',
        horizontalPosition: 'center',
      });
    }

    const  accommodationReview : AccommodationReviewDTO = {
      id: 0,
      reviewerId: this.userId,
      accommodationId: this.accommodationId,
      comment: this.newReview.description,
      rating: this.newReview.rating,
      timePosted: Date.now()
    }


    this.accommodationReviewService.createAccommodationReview(accommodationReview).subscribe({
      next: (data: AccommodationReviewDTO) => {
        console.log(data);
        this.location.replaceState(this.location.path());
        window.location.reload();
      },error: (error: any) => {
        console.error('Can\'t create accommodation review since you don\'t have any reservations at that accommodation in the past 7 days.', error);
        this.snackBar.open("Can\'t create accommodation review since you don\'t have any reservations at that accommodation in the past 7 days.", 'Close', {
          verticalPosition: 'top',
          horizontalPosition: 'center',
        });
        return;
      },
    });

  }

  calculateAverage(){
    let sum = 0;
    for (let review of this.accommodationReviews){
      sum+=review.rating;
    }
    if(sum == 0){
      this.averageGrade = 5;
      return;
    }
    this.averageGrade = this.roundUpToNearestHalf(sum/this.accommodationReviews.length);
  }
  getStarIcons(rating: number): string {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    const stars = '<img src="../../assets/images/fullstar.svg"/>'.repeat(fullStars) +
      (hasHalfStar ? '<img src="../../assets/images/halfstar.svg"/>' : '') +
      '<img src="../../assets/images/star.svg"/>'.repeat(5 - fullStars - (hasHalfStar ? 1 : 0));

    return stars;
  }
  roundUpToNearestHalf(value: number): number {
    const maxAllowedValue = 5;
    const minAllowedValue = 0;
    const step = 0.5;

    value = Math.max(minAllowedValue, Math.min(maxAllowedValue, value));

    const roundedValue = Math.ceil(value / step) * step;

    return roundedValue;
  }
}
