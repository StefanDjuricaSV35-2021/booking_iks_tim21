import { Component, Input } from '@angular/core';
import { AccommodationChangeRequestDTO } from 'src/app/owners-accommodations/change-accommodation/model/AccommodationChangeRequestDTO';

@Component({
  selector: 'app-accommodation-updating-requests-preview',
  templateUrl: './accommodation-updating-requests-preview.component.html',
  styleUrls: ['./accommodation-updating-requests-preview.component.css'],
})
export class AccommodationUpdatingRequestsPreviewComponent {
  @Input() accommodationChangeRequest: AccommodationChangeRequestDTO;
}
