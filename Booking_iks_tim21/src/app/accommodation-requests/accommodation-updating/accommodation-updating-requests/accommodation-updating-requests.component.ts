import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccommodationPreviewDTO } from 'src/app/accommodation-preview/model/accommodationPreviewDTO';
import { AccommodationPreviewService } from 'src/app/accommodation-preview/service/accommodation-preview.service';
import { AccommodationChangeRequestDTO } from 'src/app/owners-accommodations/change-accommodation/model/AccommodationChangeRequestDTO';
import { AccommodationChangeRequestService } from 'src/app/owners-accommodations/change-accommodation/service/accommodation-change-request.service';

@Component({
  selector: 'app-accommodation-updating-requests',
  templateUrl: './accommodation-updating-requests.component.html',
  styleUrls: ['./accommodation-updating-requests.component.css'],
})
export class AccommodationUpdatingRequestsComponent {
  public accommodationChangeRequests: AccommodationChangeRequestDTO[];
  public bla: string;

  constructor(
    private route: ActivatedRoute,
    private accommodationService: AccommodationPreviewService,
    private accommodationChangeRequestService: AccommodationChangeRequestService
  ) {}

  ngOnInit() {
    this.accommodationChangeRequestService
      .findAllChangeRequests()
      .subscribe((data) => {
        this.accommodationChangeRequests = data;
      });
  }
}
