import { Component } from '@angular/core';
import {ReviewModule} from "../../review.module";
import {OwnerReviewDTO} from "../../../../core/models/OwnerReviewDTO";
import {ActivatedRoute, Router} from "@angular/router";
import {OwnerReviewService} from "../../../../core/services/owner-review/owner-review.service";
import {UserService} from "../../../../core/services/user/user.service";
import {Location} from "@angular/common";
import {JwtHelperService} from "@auth0/angular-jwt";
import {User} from "../../../../core/models/user.model";

@Component({
  selector: 'app-owner-owner-review-page',
  templateUrl: './owner-owner-review-page.component.html',
  styleUrls: ['./owner-owner-review-page.component.css']
})
export class OwnerOwnerReviewPageComponent {
  public ownerId:number;
  public ownerReviews: OwnerReviewDTO[];
  public averageGrade: number;
  public email:string = "Email not found";
  newReview: any = { rating: 1, description: '' };
  constructor(
    private ownerReviewService: OwnerReviewService,
    private userService: UserService,
  ) {}
  ngOnInit() {
    const jwtHelperService = new JwtHelperService();
    const userFromLocalStorage: any = localStorage.getItem('user');
    const userEmail: string =
      jwtHelperService.decodeToken(userFromLocalStorage).sub;
    this.userService.getUserByEmail(userEmail).subscribe({
      next: (data: User) => {
        this.ownerId = data.id;
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
