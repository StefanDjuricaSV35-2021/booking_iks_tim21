import { Component, Input } from '@angular/core';
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

  navigate() {
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
}
