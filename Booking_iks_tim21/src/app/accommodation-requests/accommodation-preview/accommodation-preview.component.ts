import { Component, Input } from '@angular/core';
import { AccommodationPreviewDTO } from 'src/app/accommodation-preview/model/accommodationPreviewDTO';

@Component({
  selector: 'app-accommodation-preview',
  templateUrl: './accommodation-preview.component.html',
  styleUrls: ['./accommodation-preview.component.css'],
})
export class AccommodationPreviewComponent {
  @Input() accommodationPreview: AccommodationPreviewDTO;
}
