import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {OwnerReviewDTO} from "../../../../core/models/OwnerReviewDTO";
import {OwnerReviewService} from "../../../../core/services/owner-review/owner-review.service";
import {ReviewModule} from "../../review.module";
import { Location } from '@angular/common';
import {User} from "../../../../core/models/user.model";
import {UserService} from "../../../../core/services/user/user-service";
import {JwtHelperService} from "@auth0/angular-jwt";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-guest-owner-review-page',
  templateUrl: './guest-owner-review-page.component.html',
  styleUrls: ['./guest-owner-review-page.component.css']
})
export class GuestOwnerReviewPageComponent {
  public ownerId:number;
  public reviewerId:number;
  public ownerReviews: OwnerReviewDTO[];
  public averageGrade: number;
  public email:string = "Email not found";
  newReview: any = { rating: 1, description: '' };
  constructor(
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute,
    private ownerReviewService: OwnerReviewService,
    private userService: UserService,
    private location: Location,
  ) {}
  ngOnInit() {
    const jwtHelperService = new JwtHelperService();
    const userFromLocalStorage: any = sessionStorage.getItem('user');
    const userEmail: string =
      jwtHelperService.decodeToken(userFromLocalStorage).sub;
    this.userService.getUserByEmail(userEmail).subscribe({
      next: (data: User) => {
        this.reviewerId = data.id;
      },
    });

    let e = this.route.snapshot.paramMap.get('ownerId');
    if (e == null) {
      this.snackBar.open('Error wrong page path!!!', 'Close', {
        verticalPosition: 'top',
        horizontalPosition: 'center',
      });
      this.router.navigate(['homePage']);
    }else{
      this.ownerId = parseInt(e,10);
      if (isNaN(this.ownerId)) {
        console.log("Path is not a valid number.");
        this.router.navigate(['homePage']);
      }
    }

    this.userService.getUser(this.ownerId).subscribe({
      next: (data: User) => {
        if(data!=null && data.email!=null){
          this.email = data.email;
        }
      },
    });

    this.ownerReviewService.getOwnerReviews(this.ownerId).subscribe({
      next: (data: OwnerReviewDTO[]) => {
        this.ownerReviews = data;
        this.calculateAverage();
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  submitReview() {
    if(this.reviewerId == null || this.ownerId == null){
      console.log("Something went wrong with user ids.");
      this.router.navigate(['homePage']);
    }

    const ownerReview : OwnerReviewDTO = {
      id: 0,
      reviewerId: this.reviewerId,
      reviewedId: this.ownerId,
      comment: this.newReview.description,
      rating: this.newReview.rating,
      timePosted: Date.now()
    }


    this.ownerReviewService.createOwnerReview(ownerReview).subscribe({
      next: (data: OwnerReviewDTO) => {
        console.log(data);
        this.location.replaceState(this.location.path());
        window.location.reload();
      },error: (error: any) => {
        console.error('Can\'t create owner review since you don\'t have any reservations at that owner.', error);
        this.snackBar.open('Can\'t create owner review since you don\'t have any reservations at that owner.', 'Close', {
          verticalPosition: 'top',
          horizontalPosition: 'center',
        });
        return;
      },
    });


  }

  calculateAverage(){
    let sum = 0;
    for (let review of this.ownerReviews){
      sum+=review.rating;
    }
    if(sum == 0){
      this.averageGrade = 5;
      return;
    }
    this.averageGrade = this.roundUpToNearestHalf(sum/this.ownerReviews.length);
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
