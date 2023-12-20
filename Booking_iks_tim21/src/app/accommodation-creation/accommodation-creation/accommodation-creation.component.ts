import { Component, OnInit } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
  ValidatorFn,
  AbstractControl,
  FormBuilder,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserService } from 'src/app/core/services/user/user.service';
import { User } from 'src/app/core/models/user.model';
import { AccommodationDetailsService } from '../../core/services/accommodation-details/accommodation-details.service';
import { AccommodationDetailsDTO } from '../../core/models/AccommodationDetailsDTO';
import { FileUploadService } from '../../core/services/file-upload/fileUpload.service';
import { HttpEvent, HttpEventType, HttpResponse } from '@angular/common/http';
import { AccommodationPricingService } from 'src/app/core/services/accommodation-pricing/accommodationPricing.service';
import {AccommodationPricingDTO} from "../../core/models/accommodationPricing.model";

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
  selector: 'app-accommodation-creation',
  templateUrl: './accommodation-creation.component.html',
  styleUrls: ['./accommodation-creation.component.css'],
})
export class AccommodationCreationComponent implements OnInit {
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
    private fileUploadService: FileUploadService
  ) {
    this.pricingForm = this.fb.group({
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

    this.dateForm = this.fb.group({
      startDate: new FormControl(null, [Validators.required]),
      endDate: new FormControl(null, [Validators.required]),
      price: new FormControl(null, [Validators.required]),
    });

    this.imageForm = this.fb.group({
      image: [''],
    });
  }

  pricingList: AccommodationPricingDTO[] = [];

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
      this.selectedFileNames.push(this.selectedFile.name);
      this.selectedFiles.push(this.selectedFile);
      this.selectedFile = null;
      this.imagePreview = null;
    }
  }

  removeImage(image: string): void {
    const index = this.selectedFileNames.indexOf(image);

    if (index !== -1) {
      this.selectedFileNames.splice(index, 1);
      this.selectedFiles.splice(index, 1);
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
        this.pricingForm.reset();
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

  createAccommodation() {
    if (this.pricingForm.valid) {
      const formData = this.pricingForm.value;

      if (this.selectedFileNames.length <= 0) {
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

      const form: FormData = new FormData();

      this.selectedFiles.forEach((file) => {
        form.append('images', file, file.name);
      });

      this.fileUploadService.upload(form).subscribe({
        next: (data: HttpEvent<string[]>) => {
          if (data.type === HttpEventType.UploadProgress) {
            const percentDone = Math.round((100 * data.loaded) / data.total!);
            console.log(`File is ${percentDone}% uploaded.`);
          } else if (data instanceof HttpResponse) {
            console.log('File is completely uploaded!');
          }
        },
        error: (error: any) => {
          console.error('Error uploading file:', error);
          return;
        },
      });

      const accommodation: AccommodationDetailsDTO = {
        id: 0,
        ownerId: this.user.id,
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
        enabled: false,
        dates:[]
      };
      this.accommodationService.createAccommodation(accommodation).subscribe({
        next: (data: AccommodationDetailsDTO) => {
          this.pricingList.forEach((pricing) => {
            pricing.accommodationId = data.id;
            this.accommodationPricingService
              .createAccommodationPricing(pricing)
              .subscribe({
                next: (data: AccommodationPricingDTO) => {
                  console.log(data);
                },
                error: (error) => {
                  console.error(
                    'Failed to create accommodation pricing:',
                    error
                  );

                  const errorMessage =
                    error?.error?.message ||
                    'Failed to create accommodation pricing.';
                  alert(errorMessage);
                  return;
                },
              });
          });
          alert(
            'Successfuly added your accommodation. You will be notified once the admin approves your accommodation.'
          );
          this.router.navigate(['/homePage']);
        },
        error: (error) => {
          console.log(accommodation);
          console.error('Failed to create accommodation:', error);
          const errorMessage =
            error?.error?.message || 'Failed to create accommodation.';
          alert(errorMessage);
        },
      });
    } else {
      alert(
        'Before creating a new accommodation you must fill out all of the form parameters'
      );
    }
  }
}

export function doubleValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value;

    if (Validators.required(control) || Validators.nullValidator(control)) {
      return null;
    }

    if (isNaN(value) || !isFinite(value)) {
      return { double: true };
    }

    return null;
  };
}
