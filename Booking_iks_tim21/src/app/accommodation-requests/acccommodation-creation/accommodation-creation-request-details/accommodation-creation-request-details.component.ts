import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil } from 'rxjs';
import { AccommodationDetailsDTO } from '../../../core/models/AccommodationDetailsDTO';
import { AccommodationDetailsService } from '../../../core/services/accommodation-details/accommodation-details.service';
import { AccommodationPricingService } from '../../../accommodation-creation/accommodation-creation/service/accommodationPricing.service';
import { AccommodationPricingDTO } from '../../../accommodation-creation/accommodation-creation/model/accommodationPricing.model';
import { MapComponent } from 'src/app/shared/components/map/map.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-accommodation-creation-request-details',
  templateUrl: './accommodation-creation-request-details.component.html',
  styleUrls: ['./accommodation-creation-request-details.component.css'],
})
export class AccommodationCreationRequestDetailsComponent {
  showButtons: boolean = false;
  selected: null | undefined;
  id: number;
  acc: AccommodationDetailsDTO;
  pricings: AccommodationPricingDTO[];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: AccommodationDetailsService,
    private pricingService: AccommodationPricingService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.showButtons = params['accommodationCreationRequests'] === 'true';
    });

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

  openMap() {
    this.dialog.open(MapComponent, {
      data: {
        location: this.acc.location,
      },
    });
  }

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
