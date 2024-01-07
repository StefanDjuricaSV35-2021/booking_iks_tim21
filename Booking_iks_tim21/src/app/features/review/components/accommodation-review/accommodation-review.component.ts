import {Component, Input} from '@angular/core';
import {ReviewModule} from "../../review.module";
import {AccommodationReviewDTO} from "../../../../core/models/AccommodationReviewDTO";
import {JwtHelperService} from "@auth0/angular-jwt";
import {User} from "../../../../core/models/user.model";
import {MatSnackBar} from "@angular/material/snack-bar";
import {UserService} from "../../../../core/services/user/user-service";
import {Location} from "@angular/common";
import {AuthService} from "../../../../infrastructure/auth/auth.service";
import {AccommodationReviewService} from "../../../../core/services/accommodation-review/accommodation-review-service";

@Component({
  selector: 'app-accommodation-review',
  templateUrl: './accommodation-review.component.html',
  styleUrls: ['./accommodation-review.component.css']
})
export class AccommodationReviewComponent {
  @Input() revv : AccommodationReviewDTO;
  public email:string = "user not found";
  public userEmail:string;
  public role:string;

  constructor(
    private service:UserService,
    private accommodationReviewService: AccommodationReviewService,
    private location: Location,
    private authService: AuthService,
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

  deleteReview(){
    this.accommodationReviewService.deleteAccommodationReviews(this.revv.id).subscribe({
      error: (error) => {
        console.error(error);
      }
    });

    this.location.replaceState(this.location.path());
    window.location.reload();
  }
}
