import {Component, signal} from '@angular/core';
import {ReservationRequestService} from "../../../../core/services/reservation-request/reservation-request-service";
import {ReservationRequestDTO, ReservationRequestStatus} from "../../../../core/models/ReservationRequestDTO";
import {AuthService} from "../../../../infrastructure/auth/auth.service";
import {ActivatedRoute, Route, Router} from "@angular/router";
import {JwtHelperService} from "@auth0/angular-jwt";
import {Role, User} from "../../../../core/models/user.model";
import {UserService} from "../../../../core/services/user/user-service";
import {
  AccommodationDetailsService
} from "../../../../core/services/accommodation-details/accommodation-details.service";



@Component({
  selector: 'app-reservations-page',
  templateUrl: './reservations-page.component.html',
  styleUrls: ['./reservations-page.component.css']
})
export class ReservationsPageComponent {

  status:ReservationRequestStatus|undefined=undefined;
  name:string="";
  showedReq:ReservationRequestDTO[]
  allReq:ReservationRequestDTO[]

  constructor(private accommodationService:AccommodationDetailsService,
              private serviceRes:ReservationRequestService,
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

              this.allReq=data;
              this.showedReq=data;

            })
          }else{

            this.serviceRes.getOwnerRequests(data.id).subscribe(data=>{

              this.allReq=data;
              this.showedReq=data;

            })

          }



        },
      });
    });
  }

  changeStatus($event: string | undefined) {

    console.log($event)
    if($event==undefined){
      this.status=undefined;
    }else {
      this.status = ReservationRequestStatus[$event];
    }

  }

  changeName($event: string) {

    this.name=$event;

  }

  filterRequests() {

    this.filterByName(this.allReq);

  }

  filterByName(reqqs:ReservationRequestDTO[]){

    if (this.name == "") {
      this.filterByStatus(reqqs)
      return
    }

    let req:ReservationRequestDTO[]=[];

    let iterations = reqqs.length;

    for (const reqq of reqqs) {

      this.accommodationService.findById(reqq.accommodationId).subscribe((data) =>{

        if(data.name.toLowerCase().includes(this.name.toLowerCase())){
          req.push(reqq)
        }

        if (!--iterations)
          console.log(req)
          this.filterByStatus(req)

      })

    }

  }

  filterByStatus(reqs:ReservationRequestDTO[]) {

    if (this.status == undefined) {
      this.showedReq=reqs;
      return
    }

    let reqss:ReservationRequestDTO[]=[];

    for (const reqq of reqs) {
      console.log(ReservationRequestStatus[reqq.status])
      console.log(ReservationRequestStatus[this.status!])
      if(reqq.status.toString()===ReservationRequestStatus[this.status!]){
        reqss.push(reqq)
      }
    }
    console.log(reqss)

    this.showedReq=reqss;

  }
}
