import {Component, Input} from '@angular/core';
import {AccommodationPreviewDTO} from "../../../../accommodation-preview/model/accommodationPreviewDTO";

@Component({
  selector: 'app-search-preview-card',
  templateUrl: './search-preview-card.component.html',
  styleUrls: ['./search-preview-card.component.css']
})
export class SearchPreviewCardComponent {
  @Input() accommodationPreview: AccommodationPreviewDTO;
}
