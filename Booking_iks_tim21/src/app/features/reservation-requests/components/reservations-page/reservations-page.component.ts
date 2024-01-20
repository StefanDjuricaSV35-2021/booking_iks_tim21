import { Component, signal } from '@angular/core';
import { ReservationRequestService } from '../../../../core/services/reservation-request/reservation-request-service';
import {
  ReservationRequestDTO,
  ReservationRequestStatus,
} from '../../../../core/models/ReservationRequestDTO';
import { AuthService } from '../../../../infrastructure/auth/auth.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Role, User } from '../../../../core/models/user.model';
import { UserService } from '../../../../core/services/user/user-service';
import { AccommodationDetailsService } from '../../../../core/services/accommodation-details/accommodation-details.service';
import { ReservationRefreshService } from 'src/app/core/services/reservation/refresh-reservation-service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-reservations-page',
  templateUrl: './reservations-page.component.html',
  styleUrls: ['./reservations-page.component.css'],
})
export class ReservationsPageComponent {
  status: ReservationRequestStatus | undefined = undefined;
  name: string = '';
  showedReq: ReservationRequestDTO[];
  allReq: ReservationRequestDTO[];
  loggedInUser: User;

  constructor(
    private accommodationService: AccommodationDetailsService,
    private serviceRes: ReservationRequestService,
    private service: UserService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private reservationRefreshService: ReservationRefreshService
  ) {}

  ngOnInit() {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/homePage']);
      return;
    }
    this.route.params.subscribe((params) => {
      const id = +params['userId'];

      const jwtHelperService = new JwtHelperService();
      const userFromLocalStorage: any = sessionStorage.getItem('user');
      const userEmail: string =
        jwtHelperService.decodeToken(userFromLocalStorage).sub;
      this.service.getUserByEmail(userEmail).subscribe({
        next: (data: User) => {
          this.loggedInUser = data;
          this.loadReservations(data);
        },
      });
    });

    this.reservationRefreshService.getRefreshObservable().subscribe(() => {
      this.loadReservations(this.loggedInUser);
    });
  }

  loadReservations(data: User) {
    if (Role[Role[data.role]] == 'GUEST') {
      this.serviceRes.getUserRequests(data.id).subscribe((data) => {
        this.allReq = data;
        this.showedReq = data;
      });
    } else {
      this.serviceRes.getOwnerRequests(data.id).subscribe((data) => {
        this.allReq = data;
        this.showedReq = data;
      });
    }
  }

  changeStatus($event: string | undefined) {
    if ($event == undefined) {
      this.status = undefined;
    } else {
      this.status = ReservationRequestStatus[$event];
    }
  }

  changeName($event: string) {
    this.name = $event;
  }

  filterRequests() {
    this.filterByName(this.allReq);
  }

  filterByName(reqqs: ReservationRequestDTO[]) {
    if (this.name == '') {
      this.filterByStatus(reqqs);
      return;
    }

    let req: ReservationRequestDTO[] = [];

    let iterations = reqqs.length;

    for (const reqq of reqqs) {
      this.accommodationService
        .findById(reqq.accommodationId)
        .subscribe((data) => {
          if (data.name.toLowerCase().includes(this.name.toLowerCase())) {
            req.push(reqq);
          }

          if (!--iterations) this.filterByStatus(req);
        });
    }
  }

  filterByStatus(reqs: ReservationRequestDTO[]) {
    if (this.status == undefined) {
      this.showedReq = reqs;
      return;
    }

    let reqss: ReservationRequestDTO[] = [];

    for (const reqq of reqs) {
      if (reqq.status.toString() === ReservationRequestStatus[this.status!]) {
        reqss.push(reqq);
      }
    }

    this.showedReq = reqss;
  }
}
