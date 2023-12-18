import { Component, Input } from '@angular/core';
import {AccommodationPreviewDTO} from "../../../features/home/components/accommodation-preview/model/accommodationPreviewDTO";

@Component({
  selector: 'app-accommodation-creation-request-preview',
  templateUrl: './accommodation-creation-request-preview.component.html',
  styleUrls: ['./accommodation-creation-request-preview.component.css'],
})
export class AccommodationCreationRequestPreviewComponent {
  @Input() accommodationPreview: AccommodationPreviewDTO;
}
