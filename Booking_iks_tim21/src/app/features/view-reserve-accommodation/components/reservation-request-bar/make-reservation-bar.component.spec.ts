import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MakeReservationBarComponent} from './make-reservation-bar.component';
import {TimeSlot} from "../../../../core/models/timeSlot.model";
import {provideAnimations} from '@angular/platform-browser/animations';
import {ActivatedRoute, Router, RouterModule} from "@angular/router";
import {UserService} from "../../../../core/services/user/user-service";
import {NotificationService} from "../../../../core/services/notification/notification.service";
import {ReservationRequestService} from "../../../../core/services/reservation-request/reservation-request-service";
import {
  AccommodationDetailsService
} from "../../../../core/services/accommodation-details/accommodation-details.service";
import {ReactiveFormsModule} from "@angular/forms";
import {JwtHelperService, JwtModule} from "@auth0/angular-jwt";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {RouterTestingModule} from "@angular/router/testing";
import {MatButtonModule} from "@angular/material/button";
import {MaterialModule} from "../../../../infrastructure/material/material.module";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatFormFieldModule} from "@angular/material/form-field";
import {CommonModule} from "@angular/common";
import {ViewReserveAccommodationModule} from "../../view-reserve-accommodation.module";
import {of} from "rxjs";
import {AccommodationDetailsDTO, AccommodationType, Amenity} from "../../../../core/models/AccommodationDetailsDTO";
import {DebugElement} from "@angular/core";
import {By} from "@angular/platform-browser";
import {Role, User} from "../../../../core/models/user.model";
import {ReservationRequestDTO, ReservationRequestStatus} from "../../../../core/models/ReservationRequestDTO";


function createTimeSlotsArray(): TimeSlot[] {
  const timeSlots: TimeSlot[] = [];

  let t1=new TimeSlot();
  t1.startDate=1706745600
  t1.endDate=1707745600

  let t2=new TimeSlot();
  t2.startDate=1707745600
  t2.endDate=1709745600

  timeSlots.push(t1)
  timeSlots.push(t2)

  return timeSlots;
}

function createMockedReq(): ReservationRequestDTO {
  let t2=new TimeSlot();
  t2.startDate=1706918400
  t2.endDate=1707264000

  let req=new ReservationRequestDTO(1,2,3,400,t2,ReservationRequestStatus.Waiting)

  return req;
}

describe('MakeReservationBarComponent', () => {
  let component: MakeReservationBarComponent;
  let fixture: ComponentFixture<MakeReservationBarComponent>;
 // let formBuilderSpy: jasmine.SpyObj<FormBuilder>;
  let activatedRouteSpy: Partial<ActivatedRoute>;
  let accServiceSpy: jasmine.SpyObj<AccommodationDetailsService>;
  let router: jasmine.SpyObj<Router>;
  let serviceReqSpy: jasmine.SpyObj<ReservationRequestService>;
  let userServiceSpy: jasmine.SpyObj<UserService>;
  let notifServiceSpy: jasmine.SpyObj<NotificationService>;
  let searchBtn: DebugElement;


  const mockAvailableDates: TimeSlot[] = createTimeSlotsArray()
  const mockedAccommodation:AccommodationDetailsDTO={
    id: 2,
    ownerId: 123,
    name: 'Mock Accommodation',
    type: AccommodationType.Apartment, // Replace with the actual type
    location: 'Mock Location',
    minGuests: 2,
    maxGuests: 4,
    description: 'Mock Description',
    amenities: ['WiFi', 'Kitchen'] as unknown as Amenity[], // Replace with the actual type
    photos: ['mock-photo1.jpg', 'mock-photo2.jpg'],
    daysForCancellation: 7,
    perNight: true,
    enabled: true,
    autoAccepting: true,
    dates: mockAvailableDates,
  };

  const mockReservationRequestDTO=createMockedReq();


  const mockUser: User = {
    id: 1,
    role: Role.GUEST, // Replace with an actual Role value
    email: 'test@example.com',
    password: 'password123',
    name: 'John',
    surname: 'Doe',
    country: 'USA',
    city: 'New York',
    street: '123 Main Street',
    phone: '123-456-7890',
    enabled: true,
    blocked: false,
  };

  beforeEach(() => {
    activatedRouteSpy = {
      params: of({ userId: '123' }), // Mock route parameters
      queryParams: of({ filter: 'someFilter' }), // Mock query parameters
    };
    //formBuilderSpy = jasmine.createSpyObj('FormBuilder', ['group']);
     accServiceSpy = jasmine.createSpyObj('AccommodationDetailsService', ['getPrice']);
    const bla = jasmine.createSpyObj('Router', ['navigate']);
     serviceReqSpy = jasmine.createSpyObj('ReservationRequestService', ['createReservationReq']);
     userServiceSpy = jasmine.createSpyObj('UserService', ['getUserByEmail']);
     notifServiceSpy = jasmine.createSpyObj('NotificationService', ['sendNotification']);

    TestBed.configureTestingModule({
      declarations: [MakeReservationBarComponent],
      providers : [
        provideAnimations(),
        //{ provide: FormBuilder, useValue: formBuilderSpy },
        { provide: ActivatedRoute, useValue: activatedRouteSpy },
        { provide: AccommodationDetailsService, useValue: accServiceSpy },
        { provide: Router, useValue: bla },
        { provide: ReservationRequestService, useValue: serviceReqSpy },
        { provide: UserService, useValue: userServiceSpy },
        { provide: NotificationService, useValue: notifServiceSpy },
        JwtHelperService,
        HttpClient,
      ],
      imports: [

        RouterTestingModule,
        RouterModule,
        MatButtonModule,
        HttpClientModule,
        ReactiveFormsModule,
        MaterialModule,
        MatSnackBarModule,
        MatFormFieldModule,
        JwtModule,
        CommonModule,
        ViewReserveAccommodationModule
      ],
    });
    fixture = TestBed.createComponent(MakeReservationBarComponent);
    component = fixture.componentInstance;
    component.acc=mockedAccommodation;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`form should be invalid, because of empty fields`, () => {

    const formControls = component.reservationForm.controls;


    formControls['dateFrom'].setValue("");
    formControls['dateTo'].setValue("");
    formControls['noGuests'].setValue('');

    expect(component.reservationForm.valid).toBeFalsy();
  });

  it(`form should be invalid, because of wrong dates`, () => {

    const formControls = component.reservationForm.controls;

    let dateFrom:Date =new Date( "5/7/2024")
    let dateTo:Date =new Date("5/3/2024")

    formControls['dateFrom'].setValue(dateFrom);
    formControls['dateTo'].setValue(dateTo);
    formControls['noGuests'].setValue(3);

    expect(component.reservationForm.valid).toBeFalsy();
  });

  it(`form should be invalid, because start date is before end date`, () => {

    const formControls = component.reservationForm.controls;

    let dateFrom:Date =new Date( "2/7/2024")
    let dateTo:Date =new Date("2/3/2024")

    formControls['dateFrom'].setValue(dateFrom);
    formControls['dateTo'].setValue(dateTo);
    formControls['noGuests'].setValue(3);

    expect(component.reservationForm.valid).toBeFalsy();
  });

  it('form should be invalid because of wrong number of guests', () => {

    const formControls = component.reservationForm.controls;

    let dateFrom:Date =new Date( "2/3/2024")
    let dateTo:Date =new Date("2/7/2024")

    formControls['dateFrom'].setValue(dateFrom);
    formControls['dateTo'].setValue(dateTo);
    formControls['noGuests'].setValue(22);

    expect(component.reservationForm.valid).toBeFalsy();
  });


  it('form should be valid', () => {

    const formControls = component.reservationForm.controls;

    let dateFrom:Date =new Date( "2/3/2024")
    let dateTo:Date =new Date("2/7/2024")

    formControls['dateFrom'].setValue(dateFrom);
    formControls['dateTo'].setValue(dateTo);
    formControls['noGuests'].setValue(3);

    expect(component.reservationForm.valid).toBeTruthy();
  });

  it('should create redirect to success page after button click', () => {
    const formControls = component.reservationForm.controls;
    let dateFrom: Date = new Date("2/3/2024")
    let dateTo: Date = new Date("2/7/2024")
    spyOn(JwtHelperService.prototype, 'decodeToken').and.returnValue({
      sub: 'test@example.com',
    });
    userServiceSpy.getUserByEmail.and.returnValue(of(mockUser));
    serviceReqSpy.createReservationReq.and.returnValue(of(mockReservationRequestDTO))
    accServiceSpy.getPrice.and.returnValue(of(400));


    formControls['dateFrom'].setValue(dateFrom);
    formControls['dateTo'].setValue(dateTo);
    formControls['noGuests'].setValue(3);
    expect(component.reservationForm.valid).toBeTruthy();

    fixture.detectChanges();
    const inputElement: HTMLInputElement = fixture.nativeElement.querySelector('#guests-input');
    inputElement.dispatchEvent(new Event('change'));

    const buttonElement = fixture.debugElement.query(By.css('#search-btn')).nativeElement;
    buttonElement.click();

    expect(router.navigate).toHaveBeenCalledWith(['/', 'reservation-confirmation']);
    expect(serviceReqSpy.createReservationReq).toHaveBeenCalledWith(mockReservationRequestDTO);

  });
});
