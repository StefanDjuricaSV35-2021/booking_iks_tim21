import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OwnersAccommodationPreviewService } from '../owners-accommodation-preview/service/owners-accommodation-preview.service';
import { UserService } from 'src/app/profile/user.service';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { User } from 'src/app/profile/model/user.model';
import { JwtHelperService } from '@auth0/angular-jwt';
import {AccommodationPreviewDTO} from "../../features/home/components/accommodation-preview/model/accommodationPreviewDTO";

@Component({
  selector: 'app-owners-accommodations-page',
  templateUrl: './owners-accommodations-page.component.html',
  styleUrls: ['./owners-accommodations-page.component.css'],
})
export class OwnersAccommodationsPageComponent {
  public accommodations: AccommodationPreviewDTO[];

  user: User = {} as User;

  constructor(
    private service: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private accommodationService: OwnersAccommodationPreviewService
  ) {}

  ngOnInit(): void {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/mainPage']);
      return;
    }

    this.route.params.subscribe((params) => {
      const id = +params['userId'];

      const jwtHelperService = new JwtHelperService();
      const userFromLocalStorage: any = localStorage.getItem('user');
      const userEmail: string =
        jwtHelperService.decodeToken(userFromLocalStorage).sub;
      this.service.getUserByEmail(userEmail).subscribe({
        next: (data: User) => {
          this.user = data;

          this.accommodationService
            .findAllForOwner(this.user.id)
            .subscribe((data) => {
              this.accommodations = data;
            });
        },
      });
    });
  }
}
