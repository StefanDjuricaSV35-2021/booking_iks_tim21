import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl, FormBuilder } from '@angular/forms';
import { AccommodationPricingDTO } from './model/accommodationPricing.model';
import { AppModule } from 'src/app/app.module';
import { AccommodationDetailsDTO } from 'src/app/accommodation-details/model/AccommodationDetailsDTO';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserService } from 'src/app/profile/user.service';
import { User } from 'src/app/profile/model/user.model';

enum Amenity {
  TV,
  WiFi,
  Parking,
  SmokeAlarm
}

enum AccommodationType {
  Room,
  House,
  Condo,
  Apartment
}

@Component({
  selector: 'app-accommodation-creatino',
  templateUrl: './accommodation-creatino.component.html',
  styleUrls: ['./accommodation-creatino.component.css']
})
export class AccommodationCreatinoComponent implements OnInit {
  
  pricingForm :FormGroup;
  dateForm:FormGroup;
  user:User;
  imageForm: FormGroup;

  constructor(
    private router: Router,
    private authService: AuthService,
    private service: UserService,
    private fb: FormBuilder,

  ){
    this.pricingForm = new FormGroup({
      street: new FormControl(null, [Validators.required]),
      city: new FormControl(null, [Validators.required]),
      country: new FormControl(null, [Validators.required]),
      name: new FormControl(null, [Validators.required]),
      accommodationType: new FormControl(null, [Validators.required]),
      minGuests: new FormControl(null, [Validators.required, Validators.min(1)]),
      maxGuests: new FormControl(null, [Validators.required, Validators.min(1)]),
      daysForCancellation: new FormControl(null, [Validators.required, Validators.min(1)]),
      description: new FormControl(null, [Validators.required]),
      priceType: new FormControl(null, [Validators.required]),
    });

    this.dateForm = new FormGroup({
      startDate: new FormControl(null, [Validators.required]),
      endDate: new FormControl(null, [Validators.required]),
      price: new FormControl(null, [Validators.required]),
    });

    this.imageForm = this.fb.group({
      image: ['']
    });
  }
  

  


  pricingList: AccommodationPricingDTO[] = [];

  accommodationTypes = this.getKeysFromEnum(AccommodationType);

  imageList: string[] = [];
  selectedFiles : string[]= [];
  selectedImage: string | null = null;
  selectedImageName:string | null = null;


  availableAmenities: string[] = this.getKeysFromEnum(Amenity);
  selectedAmenities: string[] = [];


  ngOnInit(){
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/mainPage']);
      return;
    }
  }

  addImage(): void {
    if (this.selectedImage && this.selectedImageName ) {//
      this.imageList.push(this.selectedImage);
      this.selectedFiles.push(this.selectedImageName);
      this.selectedImage = null;
      this.selectedImageName = null;
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
    this.selectedImageName=file.name;
    if (file) {
      this.convertImageToBase64(file);
    }
  }

  convertImageToBase64(file: File): void {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.selectedImage = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  addAmenity(amenity: string): void {
    this.availableAmenities = this.availableAmenities.filter(a => a !== amenity);
    this.selectedAmenities.push(amenity);
  }

  removeAmenity(amenity: string): void {
    this.selectedAmenities = this.selectedAmenities.filter(a => a !== amenity);
    this.availableAmenities.push(amenity);
  }


  validateDates(startDate: Date, endDate: Date, pricingList: AccommodationPricingDTO[]): boolean {
    if (startDate >= endDate) {
      alert("Start date must be before end date");
      return false;
    }
  
    for (const item of pricingList) {
      const existingStartDate = new Date(item.timeslot.startDate);
      const existingEndDate = new Date(item.timeslot.endDate);
  
      if ((startDate >= existingStartDate && startDate <= existingEndDate) ||
          (endDate >= existingStartDate && endDate <= existingEndDate) ||
          (startDate <= existingStartDate && endDate >= existingEndDate)) {
        alert("Date range overlaps with existing item");
        return false;
      }
    }
  
    return true;
  }

  addTimeSlot() {
    const formData = this.dateForm.value;

    if(formData.price!=undefined && formData.price!=null &&formData.startDate!=undefined && formData.startDate!=null &&formData.endDate!=undefined && formData.endDate!=null){
      const startDate: Date = new Date(formData.startDate);
      const endDate: Date = new Date(formData.endDate);
      const price: number = parseFloat(formData.price);

      if (this.validateDates(startDate, endDate, this.pricingList)) {
        const newItem = new AccommodationPricingDTO({
          accommodationId: 0,
          timeslot: {
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
    alert("Before adding a new pricing time slot you must fill out all of the form parameters");
  }
  

  removeItem(index: number) {
    this.pricingList.splice(index, 1);
  }


  private getKeysFromEnum(enumObj: any): string[] {
    return Object.keys(enumObj).filter(key => !isNaN(Number(enumObj[key])));
  }

  private getEnumFromKey(key: string, enumObj: any): any {
    return enumObj[key];
  }

  private getEnumFromKeys(keys: string[], enumObj: any): any {
    const result: any = {};
    keys.forEach((key) => {
      result[key] = enumObj[key];
    });
    return result;
  }

  
  createAccommodation(){
    // if(this.pricingForm.valid){

      const jwtHelperService = new JwtHelperService();
      const userFromLocalStorage: any = localStorage.getItem('user');
      const userEmail: string = jwtHelperService.decodeToken(userFromLocalStorage).sub;
      this.service.getUserByEmail(userEmail).subscribe({
        next: (data: User) => {
          this.user = data;
        },
      });
      console.log(this.user.id);
      // const formData = this.pricingForm.value;

      // if(this.imageList.length<=0){
      //   alert("Your accommodation needs at least 1 photo.");
      //   return;
      // }

      // if(this.selectedAmenities.length<=0){
      //   alert("Your accommodation needs at least 1 amenity.");
      //   return;
      // }
      
      // const accommodation:AccommodationDetailsDTO ={
      //   id:0,
      //   ownerId: this.user.id,
      //   name: formData.name,
      //   type: this.getEnumFromKey(formData.type, AccommodationType),
      //   location: formData.street+" "+formData.city+" "+formData.country,
      //   minGuests: formData.minGuests,
      //   maxGuests: formData.maxGuests,
      //   description: formData.description,
      //   amenities: this.getEnumFromKeys(this.selectedAmenities, Amenity),
      //   photos: new Set(this.imageList),
      //   daysForCancellation: formData.daysForCancellation,
      //   perNight: this.pricingForm.get('perNight')?.value || false,
      // }
      // console.log(accommodation);
    // }
    // alert("Before creating a new pricing time slot you must fill out all of the form parameters");
  }
}

export function doubleValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value;

    if (Validators.required(control) || Validators.nullValidator(control)) {
      return null; // Don't validate if the control is empty
    }

    if (isNaN(value) || !isFinite(value)) {
      return { 'double': true };
    }

    return null;
  };
}