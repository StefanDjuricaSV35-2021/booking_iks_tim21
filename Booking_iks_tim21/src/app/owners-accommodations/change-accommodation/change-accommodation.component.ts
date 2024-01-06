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
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { User } from 'src/app/core/models/user.model';
import { UserService } from 'src/app/core/services/user/user.service';
import {
  AccommodationChangeRequestDTO,
  RequestStatus,
} from '../../core/models/AccommodationChangeRequestDTO';
import { AccommodationChangeRequestService } from '../../core/services/accommodation-request/accommodation-change-request.service';
import { AccommodationPricingChangeRequestService } from '../../core/services/accommodation-request/accommodation-pricing-change-request.service';
import { AccommodationPricingChangeRequestDTO } from '../../core/models/AccommodationPricingChangeRequestDTO';
import { AccommodationDetailsDTO } from '../../core/models/AccommodationDetailsDTO';
import { AccommodationDetailsService } from '../../core/services/accommodation-details/accommodation-details.service';
import { AccommodationPricingDTO } from '../../core/models/accommodationPricing.model';
import { FileUploadService } from 'src/app/core/services/file-upload/fileUpload.service';
import { HttpEvent, HttpEventType, HttpResponse } from '@angular/common/http';
import { AccommodationPricingService } from 'src/app/core/services/accommodation-pricing/accommodationPricing.service';

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
    private accommodationPricingChangeRequestService: AccommodationPricingChangeRequestService,
    private fileUploadService: FileUploadService
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
    this.selectedFileNames = this.accommodation.photos;
    for (const amenity of this.accommodation.amenities as unknown as string[]) {
      this.addAmenity(amenity);
    }
    this.pricingForm.reset;
  }

  selectedFileNames: string[] = [];
  selectedFiles: File[] = [];
  selectedFile: File | null = null;
  imagePreview: string | null = null;

  onFileSelected(event: any): void {
    const file = event.target.files[0] as File;
    if (file && this.isImageFile(file)) {
      this.selectedFile = file;
      this.imagePreview = URL.createObjectURL(file);
    } else {
      alert('Selected file must be an image.');
    }
  }

  addImage(): void {
    if (this.selectedFile) {
      this.selectedFileNames.unshift(this.selectedFile.name);
      this.selectedFiles.unshift(this.selectedFile);
      this.selectedFile = null;
      this.imagePreview = null;
    }
  }

  removeImage(image: string): void {
    const index = this.selectedFileNames.indexOf(image);

    if (index !== -1) {
      this.selectedFileNames.splice(index, 1);
      if (index < this.selectedFiles.length) {
        this.selectedFiles.splice(index, 1);
      }
    }
  }

  isImageFile(file: File): boolean {
    const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif'];
    const fileExtension = file.name.split('.').pop()?.toLowerCase();
    return allowedExtensions.includes(fileExtension || '');
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
      const existingStartDate = new Date(new Date(item.timeSlot.startDate).setHours(0,0,0,0));
      const existingEndDate = new Date(new Date(item.timeSlot.endDate).setHours(0,0,0,0));

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
      const startDate: Date = new Date(new Date(formData.startDate).setHours(0,0,0,0));
      const endDate: Date = new Date(new Date(formData.endDate).setHours(0,0,0,0));
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

      const form: FormData = new FormData();

      this.selectedFiles.forEach((file) => {
        form.append('images', file, file.name);
      });

      this.fileUploadService.upload(form).subscribe({
        next: (data: HttpEvent<string[]>) => {
          if (data.type === HttpEventType.UploadProgress) {
            const percentDone = Math.round((100 * data.loaded) / data.total!);
          } else if (data instanceof HttpResponse) {
          }
        },
        error: (error: any) => {
          console.error('Error uploading file:', error);
          return;
        },
      });

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
        photos: this.selectedFileNames,
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
