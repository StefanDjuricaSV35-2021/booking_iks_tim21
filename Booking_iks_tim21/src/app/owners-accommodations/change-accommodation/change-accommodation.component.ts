import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AccommodationPricingDTO } from 'src/app/accommodation-creation/accommodation-creatino/model/accommodationPricing.model';
import { AccommodationPricingService } from 'src/app/accommodation-creation/accommodation-creatino/service/accommodationPricing.service';
import { AccommodationDetailsDTO } from 'src/app/accommodation-details/model/AccommodationDetailsDTO';
import { AccommodationDetailsService } from 'src/app/accommodation-details/service/accommodation-details.service';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { User } from 'src/app/profile/model/user.model';
import { UserService } from 'src/app/profile/user.service';
import {
  AccommodationChangeRequestDTO,
  RequestStatus,
} from './model/AccommodationChangeRequestDTO';
import { AccommodationChangeRequestService } from './service/accommodation-change-request.service';
import { AccommodationPricingChangeRequestService } from './service/accommodation-pricing-change-request.service';
import { AccommodationPricingChangeRequestDTO } from './model/AccommodationPricingChangeRequestDTO';

enum Amenity {
  TV,
  WiFi,
  Parking,
  SmokeAlarm,
}

enum AccommodationType {
  Room,
  House,
  Condo,
  Apartment,
}

@Component({
  selector: 'app-change-accommodation',
  templateUrl: './change-accommodation.component.html',
  styleUrls: ['./change-accommodation.component.css'],
})
export class ChangeAccommodationComponent {
  accommodationId: number;
  accommodation: AccommodationDetailsDTO;
  pricingForm: FormGroup;
  dateForm: FormGroup;
  user: User;
  imageForm: FormGroup;

  constructor(
    private router: Router,
    private authService: AuthService,
    private service: UserService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private accommodationService: AccommodationDetailsService,
    private accommodationPricingService: AccommodationPricingService,
    private accommodationChangeRequestService: AccommodationChangeRequestService,
    private accommodationPricingChangeRequestService: AccommodationPricingChangeRequestService
  ) {
    this.pricingForm = new FormGroup({
      street: new FormControl(null, [Validators.required]),
      city: new FormControl(null, [Validators.required]),
      country: new FormControl(null, [Validators.required]),
      name: new FormControl(null, [Validators.required]),
      accommodationType: new FormControl(null, [Validators.required]),
      minGuests: new FormControl(null, [
        Validators.required,
        Validators.min(1),
      ]),
      maxGuests: new FormControl(null, [
        Validators.required,
        Validators.min(1),
      ]),
      daysForCancellation: new FormControl(null, [
        Validators.required,
        Validators.min(1),
      ]),
      description: new FormControl(null, [Validators.required]),
      priceType: new FormControl(null, [Validators.required]),
    });

    this.dateForm = new FormGroup({
      startDate: new FormControl(null, [Validators.required]),
      endDate: new FormControl(null, [Validators.required]),
      price: new FormControl(null, [Validators.required]),
    });

    this.imageForm = this.fb.group({
      image: [''],
    });
  }

  pricingList: AccommodationPricingDTO[] = [];
  pricingChangeRequestList: AccommodationPricingChangeRequestDTO[] = [];

  accommodationTypes = this.getKeysFromEnum(AccommodationType);

  availableAmenities: string[] = this.getKeysFromEnum(Amenity);
  selectedAmenities: string[] = [];

  ngOnInit() {
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
        },
      });
    });

    this.accommodationId = +this.route.snapshot.paramMap.get('id')!;

    this.accommodationPricingService
      .getActivePricingsForAccommodation(this.accommodationId)
      .subscribe((data) => {
        this.pricingList = data;
      });

    this.accommodationService
      .findById(this.accommodationId)
      .subscribe((data) => {
        this.accommodation = data;
        this.populateForm();
      });
  }

  populateForm() {
    this.pricingForm.patchValue({
      street: this.accommodation.location.split(',')[0],
      city: this.accommodation.location.split(',')[1],
      country: this.accommodation.location.split(',')[2],
      name: this.accommodation.name,
      accommodationType: this.accommodation.type.toString(),
      minGuests: this.accommodation.minGuests,
      maxGuests: this.accommodation.maxGuests,
      daysForCancellation: this.accommodation.daysForCancellation,
      description: this.accommodation.description,
      priceType: this.accommodation.perNight ? 'night' : 'guest',
    });

    for (const amenity of this.accommodation.amenities as unknown as string[]) {
      this.addAmenity(amenity);
    }
    this.pricingForm.reset;

    //this.imageList = this.accommodation.photos || [];

    for (const photo of this.accommodation.photos) {
      this.imageList.push(photo);
    }
    this.resetSelectedImage();
  }

  imageList: string[] = [];
  selectedFiles: string[] = [];
  selectedImage: string | null = null;
  selectedImageName: string | null = null;

  addImage(): void {
    if (this.selectedImage && this.selectedImageName) {
      this.imageList.push(this.selectedImage);
      this.selectedFiles.push(this.selectedImageName);
      this.resetSelectedImage();
    }
  }

  removeImage(image: string): void {
    const index = this.imageList.indexOf(image);
    if (index !== -1) {
      this.imageList.splice(index, 1);
      this.selectedFiles.splice(index, 1);
    }
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedImageName = file.name;

      this.convertImageToBase64(file)
        .then((base64Image: string) => {
          this.selectedImage = base64Image;
        })
        .catch((error) => {
          console.error('Error converting image to base64:', error);
        });
    }
  }

  convertImageToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        resolve(e.target.result);
      };

      reader.onerror = (error) => {
        reject(error);
      };

      reader.readAsDataURL(file);
    });
  }

  resetSelectedImage(): void {
    this.selectedImage = null;
    this.selectedImageName = null;
  }

  addAmenity(amenity: string): void {
    this.availableAmenities = this.availableAmenities.filter(
      (a) => a !== amenity
    );
    this.selectedAmenities.push(amenity);
  }

  removeAmenity(amenity: string): void {
    this.selectedAmenities = this.selectedAmenities.filter(
      (a) => a !== amenity
    );
    this.availableAmenities.push(amenity);
  }

  validateDates(
    startDate: Date,
    endDate: Date,
    pricingList: AccommodationPricingDTO[]
  ): boolean {
    if (startDate >= endDate) {
      alert('Start date must be before end date');
      return false;
    }

    for (const item of pricingList) {
      const existingStartDate = new Date(item.timeSlot.startDate);
      const existingEndDate = new Date(item.timeSlot.endDate);

      if (
        (startDate >= existingStartDate && startDate <= existingEndDate) ||
        (endDate >= existingStartDate && endDate <= existingEndDate) ||
        (startDate <= existingStartDate && endDate >= existingEndDate)
      ) {
        alert('Date range overlaps with existing item');
        return false;
      }
    }

    return true;
  }

  addTimeSlot() {
    const formData = this.dateForm.value;

    if (
      formData.price != undefined &&
      formData.price != null &&
      formData.startDate != undefined &&
      formData.startDate != null &&
      formData.endDate != undefined &&
      formData.endDate != null
    ) {
      const startDate: Date = new Date(formData.startDate);
      const endDate: Date = new Date(formData.endDate);
      const price: number = parseFloat(formData.price);

      if (this.validateDates(startDate, endDate, this.pricingList)) {
        const newItem = new AccommodationPricingDTO({
          accommodationId: 0,
          timeSlot: {
            startDate: startDate.getTime(),
            endDate: endDate.getTime(),
          },
          price: price,
        });
        this.pricingList.push(newItem);
      }
      return;
    }
    alert(
      'Before adding a new pricing time slot you must fill out all of the form parameters'
    );
  }

  removeItem(index: number) {
    this.pricingList.splice(index, 1);
  }

  private getKeysFromEnum(enumObj: any): string[] {
    return Object.keys(enumObj).filter((key) => !isNaN(Number(enumObj[key])));
  }

  private getEnumFromKeys(keys: string[], enumObj: any): any {
    const result: any[] = [];

    keys.forEach((key) => {
      result.push(enumObj[key]);
    });

    return result;
  }

  createAccommodationChangeRequest() {
    if (this.pricingForm.valid) {
      const formData = this.pricingForm.value;

      if (this.imageList.length <= 0) {
        alert('Your accommodation needs at least 1 photo.');
        return;
      }

      if (this.selectedAmenities.length <= 0) {
        alert('Your accommodation needs at least 1 amenity.');
        return;
      }

      if (formData.minGuests > formData.maxGuests) {
        alert(
          'Your minimum guest number needs to be lower than your maximum guest number.'
        );
        return;
      }

      for (const pricingItem of this.pricingList) {
        let newItem: AccommodationPricingChangeRequestDTO = {
          id: 0,
          accommodationChangeRequestId: 0,
          status: RequestStatus.PENDING,
          accommodationId: this.accommodation.id,
          timeSlot: {
            startDate: pricingItem.timeSlot.startDate,
            endDate: pricingItem.timeSlot.endDate,
          },
          price: pricingItem.price,
        };

        this.pricingChangeRequestList.push(newItem);
      }

      const accommodationChangeRequest: AccommodationChangeRequestDTO = {
        id: 0,
        requestCreationDate: Date.now(),
        status: RequestStatus.PENDING,
        accommodationId: this.accommodation.id,
        ownerId: this.accommodation.ownerId,
        name: formData.name,
        type: this.getEnumFromKeys(
          [formData.accommodationType],
          AccommodationType
        )[0],
        location:
          formData.street + ',' + formData.city + ',' + formData.country,
        minGuests: formData.minGuests,
        maxGuests: formData.maxGuests,
        description: formData.description,
        amenities: this.getEnumFromKeys(this.selectedAmenities, Amenity),
        // photos: this.imageList,
        photos: [],
        daysForCancellation: formData.daysForCancellation,
        perNight: this.pricingForm.get('perNight')?.value || false,
        enabled: true,
      };
      this.accommodationChangeRequestService
        .createAccommodationChangeRequest(accommodationChangeRequest)
        .subscribe({
          next: (data: AccommodationChangeRequestDTO) => {
            this.pricingChangeRequestList.forEach((pricingChangeRequest) => {
              pricingChangeRequest.accommodationChangeRequestId = data.id;
              this.accommodationPricingChangeRequestService
                .createAccommodationPricingChangeRequest(pricingChangeRequest)
                .subscribe({
                  next: (data: AccommodationPricingChangeRequestDTO) => {
                    console.log(data);
                  },
                  error: (error) => {
                    console.error(
                      'Failed to create accommodation pricing change request:',
                      error
                    );

                    const errorMessage =
                      error?.error?.message ||
                      'Failed to create accommodation pricing change request';
                    alert(errorMessage);
                    return;
                  },
                });

              alert(
                'Successfuly added your accommodation change request. You will be notified once the admin approves your accommodation.'
              );
            });
          },
          error: (error) => {
            console.log(accommodationChangeRequest);
            console.error(
              'Failed to create accommodation change request:',
              error
            );
            const errorMessage =
              error?.error?.message ||
              'Failed to create accommodation change request.';
            alert(errorMessage);
          },
        });
    } else {
      alert(
        'Before creating a new pricing time slot you must fill out all of the form parameters'
      );
    }
    this.router.navigate(['/ownersAccommodation/' + this.accommodation.id]);
  }
}

export function doubleValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value;

    if (Validators.required(control) || Validators.nullValidator(control)) {
      return null; // Don't validate if the control is empty
    }

    if (isNaN(value) || !isFinite(value)) {
      return { double: true };
    }

    return null;
  };
}
