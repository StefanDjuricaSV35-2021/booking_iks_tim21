import { TestBed } from '@angular/core/testing';
import {ReservationRequestService} from "../reservation-request/reservation-request-service";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {ReservationService} from "./reservation-service";


describe('MakeReservationService', () => {
  let serviceRes: ReservationService;
  let httpController : HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ReservationService],
    });

    serviceRes = TestBed.inject(ReservationService);
    httpController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpController.verify();
  });


  it('should be created', () => {
    expect(true).toBeTruthy();
  });
});
