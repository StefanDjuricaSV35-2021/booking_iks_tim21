import { TestBed } from '@angular/core/testing';

import { AccommodationDetailsService } from './accommodation-details.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {AuthService} from "../../../infrastructure/auth/auth.service";
import {SignUp} from "../../../infrastructure/auth/model/signup.model";
import {Role, User} from "../../models/user.model";
import {environment} from "../../../../env/env";

describe('AccommodationDetailsService', () => {
  let service: AccommodationDetailsService;
  let httpController : HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AccommodationDetailsService],
    });

    service = TestBed.inject(AccommodationDetailsService);
    httpController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a price', () => {

    let id=1
    let dateFrom=new Date("2/1/2024")
    let dateTo=new Date("2/2/2024")
    let guests=3;


    service.getPrice(id,"2024/02/01","2024/02/02","3").subscribe((price: number) => {
      expect(price).toEqual(300);
    });

    const req = httpController.expectOne(environment.apiHost + 'accommodations/price?dateFrom=2024/02/01&dateTo=2024/02/02&id=1&noGuests=3');
    expect(req.request.method).toBe('GET');
    req.flush(300);
  });


});
