import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AccommodationPreviewDTO } from '../../../../core/models/accommodationPreviewDTO';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-accommodation-preview',
  templateUrl: './accommodation-preview.component.html',
  styleUrls: ['./accommodation-preview.component.css'],
})
export class AccommodationPreviewComponent {
  @Input() accommodationPreview: AccommodationPreviewDTO;
  constructor(private router: Router, private route: ActivatedRoute) {}

  @Input() showRegularButtons: boolean = false;
  @Input() showFavoriteButtons: boolean = false;
  @Input() showOwnersButtons: boolean = false;
  @Input() showCreationRequestButtons: boolean = false;
  @Output() notifyParent: EventEmitter<number> = new EventEmitter();

  navigate() {
    this.setUpButtons();
    let params = this.route.snapshot.queryParams;

    this.router.navigate(['/search', this.accommodationPreview.id], {
      queryParams: {
        'acc-id': this.accommodationPreview.id,
        dateFrom: params['dateFrom'],
        dateTo: params['dateTo'],
        noGuests: params['noGuests'],
      },
    });
  }

  setUpButtons() {
    this.route.queryParams.subscribe((params) => {
      this.showRegularButtons = params['showRegularButtons'] === 'true';
      this.showOwnersButtons = params['showOwnersButtons'] === 'true';
      this.showCreationRequestButtons =
        params['showCreationRequestButtons'] === 'true';
      this.showFavoriteButtons = params['showFavoriteButtons'] === 'true';
    });
  }

  removeFavorite() {
    this.notifyParent.emit(this.accommodationPreview.id);
  }
}
