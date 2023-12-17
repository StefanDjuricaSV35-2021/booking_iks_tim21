import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil } from 'rxjs';
import { AccommodationPricingDTO } from 'src/app/accommodation-creation/accommodation-creatino/model/accommodationPricing.model';
import { AccommodationPricingService } from 'src/app/accommodation-creation/accommodation-creatino/service/accommodationPricing.service';
import { AccommodationDetailsDTO } from 'src/app/accommodation-details/model/AccommodationDetailsDTO';
import { AccommodationDetailsService } from 'src/app/accommodation-details/service/accommodation-details.service';

@Component({
  selector: 'app-accommodation-creation-request-details',
  templateUrl: './accommodation-creation-request-details.component.html',
  styleUrls: ['./accommodation-creation-request-details.component.css'],
})
export class AccommodationCreationRequestDetailsComponent {
  selected: null | undefined;
  id: number;
  acc: AccommodationDetailsDTO;
  pricings: AccommodationPricingDTO[];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: AccommodationDetailsService,
    private pricingService: AccommodationPricingService,
    private snackBar: MatSnackBar
  ) {}
  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id')!;

    this.service.findById(this.id).subscribe((data) => {
      this.acc = data;
      this.pricingService
        .getActivePricingsForAccommodation(this.acc.id)
        .subscribe((data) => {
          this.pricings = data;
        });
    });
  }
  protected readonly Array = Array;

  acceptRequest() {
    this.acc.enabled = true;
    this.service.updateAccommodation(this.acc).subscribe({
      next: (updatedAccommodation: AccommodationDetailsDTO) => {
        this.snackBar.open('Accommodation created successfully', 'Close', {
          verticalPosition: 'top',
          horizontalPosition: 'center',
        });
        this.router.navigate(['/accommodationCreationRequests']);
      },
      error: (error) => {
        this.snackBar.open('Failed to create accommodation', 'Close', {
          verticalPosition: 'top',
          horizontalPosition: 'center',
        });
      },
    });
  }

  declineRequest() {
    this.service.deleteAccommodation(this.acc.id).subscribe({
      next: () => {
        this.snackBar.open('Request declined successfully', 'Close', {
          verticalPosition: 'top',
          horizontalPosition: 'center',
        });
        this.router.navigate(['/accommodationCreationRequests']);
      },
      error: (error) => {
        this.snackBar.open('Failed to decline request', 'Close', {
          verticalPosition: 'top',
          horizontalPosition: 'center',
        });
      },
    });
  }
}
