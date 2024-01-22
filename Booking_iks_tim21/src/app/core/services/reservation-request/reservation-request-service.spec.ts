import { TestBed } from '@angular/core/testing';

import { ReservationRequestService } from './reservation-request-service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {AuthService} from "../../../infrastructure/auth/auth.service";
import {environment} from "../../../../env/env";
import {ReservationRequestDTO, ReservationRequestStatus} from "../../models/ReservationRequestDTO";
import {TimeSlot} from "../../models/timeSlot.model";
import {HttpClientModule} from "@angular/common/http";


function createMockedReq(): ReservationRequestDTO {
  let t2=new TimeSlot();
  t2.startDate=1706918400
  t2.endDate=1707264000

  let req=new ReservationRequestDTO(1,2,3,400,t2,ReservationRequestStatus.Waiting)

  return req;
}

describe('MakeReservationRequestService', () => {
  let service: ReservationRequestService;
  let httpController : HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ReservationRequestService],
    });

    service = TestBed.inject(ReservationRequestService);
    httpController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should create a request', () => {

   let mockReq=createMockedReq()

    service.createReservationReq(mockReq).subscribe((response: ReservationRequestDTO) => {
      expect(response).toEqual(mockReq);
    });

    const req = httpController.expectOne(environment.apiHost + 'reservationRequests');
    expect(req.request.method).toBe('POST');
    req.flush(mockReq);
  });
});
