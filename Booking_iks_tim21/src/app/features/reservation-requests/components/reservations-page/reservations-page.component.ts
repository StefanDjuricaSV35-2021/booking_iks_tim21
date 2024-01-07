import { Component } from '@angular/core';
import {ReservationRequestService} from "../../../../core/services/reservation-request/reservation-request-service";
import {ReservationRequestDTO} from "../../../../core/models/ReservationRequestDTO";
import {AuthService} from "../../../../infrastructure/auth/auth.service";
import {ActivatedRoute, Route, Router} from "@angular/router";
import {JwtHelperService} from "@auth0/angular-jwt";
import {Role, User} from "../../../../core/models/user.model";
import {UserService} from "../../../../core/services/user/user-service";

@Component({
  selector: 'app-reservations-page',
  templateUrl: './reservations-page.component.html',
  styleUrls: ['./reservations-page.component.css']
})
export class ReservationsPageComponent {

  res:ReservationRequestDTO[]

  constructor(private serviceRes:ReservationRequestService,
              private service:UserService,
              private authService:AuthService,
              private router:Router,
              private route:ActivatedRoute
  ) {
  }

  ngOnInit(){
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

          if(Role[Role[data.role]]=="GUEST"){
            this.serviceRes.getUserRequests(data.id).subscribe(data=>{

              this.res=data;

            })
          }else{

            this.serviceRes.getOwnerRequests(data.id).subscribe(data=>{

              this.res=data;

            })

          }



        },
      });
    });
  }

}
