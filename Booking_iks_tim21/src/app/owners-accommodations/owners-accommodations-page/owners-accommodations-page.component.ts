import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user/user-service';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { User } from 'src/app/core/models/user.model';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AccommodationPreviewDTO } from '../../core/models/accommodationPreviewDTO';
import { AccommodationPreviewService } from 'src/app/core/services/accommodation-preview/accommodation-preview.service';

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
    private accommodationService: AccommodationPreviewService
  ) {}

  ngOnInit(): void {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/homePage']);
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
