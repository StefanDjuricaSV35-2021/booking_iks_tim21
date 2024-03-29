import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import {
  AccommodationChangeRequestDTO,
  RequestStatus,
} from 'src/app/core/models/AccommodationChangeRequestDTO';
import { AccommodationPricingChangeRequestDTO } from 'src/app/core/models/AccommodationPricingChangeRequestDTO';
import { AccommodationChangeRequestService } from 'src/app/core/services/accommodation-request/accommodation-change-request.service';
import { AccommodationPricingChangeRequestService } from 'src/app/core/services/accommodation-request/accommodation-pricing-change-request.service';
import { AccommodationDetailsService } from '../../../core/services/accommodation-details/accommodation-details.service';
import { AccommodationDetailsDTO } from '../../../core/models/AccommodationDetailsDTO';
import { MatDialog } from '@angular/material/dialog';
import { MapComponent } from 'src/app/shared/components/map/map.component';

@Component({
  selector: 'app-accommodation-updating-requests-details',
  templateUrl: './accommodation-updating-requests-details.component.html',
  styleUrls: ['./accommodation-updating-requests-details.component.css'],
})
export class AccommodationUpdatingRequestsDetailsComponent {
  selected: null | undefined;
  id: number;
  accommodationChangeRequest: AccommodationChangeRequestDTO;
  pricings: AccommodationPricingChangeRequestDTO[];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: AccommodationChangeRequestService,
    private pricingService: AccommodationPricingChangeRequestService,
    private accommodationService: AccommodationDetailsService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id')!;

    this.service.findById(this.id).subscribe((data) => {
      this.accommodationChangeRequest = data;
      this.pricingService
        .getPricingChangeRequestsForAccommodationChangeRequest(
          this.accommodationChangeRequest.id
        )
        .subscribe((data) => {
          this.pricings = data;
        });
    });
  }

  openMap() {
    this.dialog.open(MapComponent, {
      data: {
        location: this.accommodationChangeRequest.location,
      },
    });
  }

  protected readonly Array = Array;

  protected readonly encodeURIComponent = encodeURIComponent;

  acceptRequest() {
    const accommodationDetails: AccommodationDetailsDTO = {
      id: this.accommodationChangeRequest.accommodationId,
      ownerId: this.accommodationChangeRequest.ownerId || 0,
      name: this.accommodationChangeRequest.name || '',
      type: this.accommodationChangeRequest.type,
      location: this.accommodationChangeRequest.location || '',
      minGuests: this.accommodationChangeRequest.minGuests || 0,
      maxGuests: this.accommodationChangeRequest.maxGuests || 0,
      description: this.accommodationChangeRequest.description || '',
      amenities: this.accommodationChangeRequest.amenities || [],
      photos: this.accommodationChangeRequest.photos || [],
      daysForCancellation:
        this.accommodationChangeRequest.daysForCancellation || 0,
      perNight: this.accommodationChangeRequest.perNight || false,
      autoAccepting:this.accommodationChangeRequest.autoAccepting,
      enabled: true,
    };

    this.accommodationService
      .updateAccommodation(accommodationDetails)
      .subscribe({
        next: (updatedAccommodation: AccommodationDetailsDTO) => {
          this.pricingService
            .updateAccommodationPricings(updatedAccommodation.id, this.pricings)
            .subscribe({
              next: () => {
                console.log('Pricing request updated successfully');
              },
              error: (error) => {
                console.error('Failed to update pricing request');
              },
            });

          this.service
            .deleteAccommodationChangeRequest(
              this.accommodationChangeRequest.id
            )
            .subscribe({
              next: () => {},
              error: (error) => {},
            });

          this.snackBar.open('Accommodation updated successfully', 'Close', {
            verticalPosition: 'top',
            horizontalPosition: 'center',
          });
          this.router.navigate(['/accommodationUpdatingRequests']);
        },
        error: (error) => {
          this.snackBar.open('Failed to update accommodation', 'Close', {
            verticalPosition: 'top',
            horizontalPosition: 'center',
          });
        },
      });
  }

  declineRequest() {
    this.service
      .deleteAccommodationChangeRequest(this.accommodationChangeRequest.id)
      .subscribe({
        next: () => {
          this.snackBar.open('Request declined successfully', 'Close', {
            verticalPosition: 'top',
            horizontalPosition: 'center',
          });
          this.router.navigate(['/accommodationUpdatingRequests']);
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
