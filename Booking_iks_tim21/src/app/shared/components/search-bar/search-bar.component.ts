import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { formatDate } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AccommodationPreviewDTO } from '../../../core/models/accommodationPreviewDTO';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
})
export class SearchBarComponent {
  accommodationPreviews: AccommodationPreviewDTO;

  location: string;
  noGuests: number;
  dateFrom: string;
  dateTo: string;

  searchForm: FormGroup;
  formBuilder = new FormBuilder();
  date: FormControl;
  date2: FormControl;

  constructor(private router: Router, private route: ActivatedRoute) {}
  ngOnInit() {
    this.initializeFields();
    this.configureFormGroup();
  }

  initializeFields() {
    this.route.queryParams.subscribe((params) => {
      this.location = params['location'];
      this.dateFrom = params['dateFrom'];
      this.dateTo = params['dateTo'];
      this.noGuests = params['noGuests'];
    });
  }

  configureFormGroup() {
    this.searchForm = this.formBuilder.group({
      location: [new Date(new Date(this.dateTo).setHours(0,0,0,0)), Validators.required],
      noGuests: [Validators.pattern('^[0-9]*$'), Validators.required],
    });

    this.date = new FormControl(new Date(new Date(this.dateFrom)).setHours(0,0,0,0), Validators.required);
    this.date2 = new FormControl(new Date(new Date(this.dateTo).setHours(0,0,0,0)), Validators.required);
    this.searchForm.addControl('arrival', this.date);
    this.searchForm.addControl('departure', this.date2);
  }

  validateForm() {
    if (this.searchForm.invalid) {
      this.searchForm.get('location')?.markAsTouched();
      this.searchForm.get('noGuests')?.markAsTouched();
      this.searchForm.get('arrival')?.markAsTouched();
      this.searchForm.get('departure')?.markAsTouched();
      return;
    } else {
      this.router.navigate(['/search'], {
        queryParams: {
          location: this.location,
          dateFrom: this.dateFrom,
          dateTo: this.dateTo,
          noGuests: this.noGuests,
        },
      });
    }
  }

  arrivalChanged($event: HTMLInputElement) {
    this.dateFrom = formatDate(new Date(new Date($event.value).setHours(0,0,0,0)), 'yyyy-MM-dd', 'en_US');
  }
  departureChanged($event: HTMLInputElement) {
    this.dateTo = formatDate(new Date(new Date($event.value).setHours(0,0,0,0)), 'yyyy-MM-dd', 'en_US');
  }
}
