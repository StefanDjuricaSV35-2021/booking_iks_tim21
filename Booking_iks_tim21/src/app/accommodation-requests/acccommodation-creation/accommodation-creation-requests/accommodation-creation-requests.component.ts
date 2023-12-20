import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccommodationPreviewService } from '../../../core/services/accommodation-preview/accommodation-preview.service';
import { AccommodationPreviewDTO } from '../../../core/models/accommodationPreviewDTO';

@Component({
  selector: 'app-accommodation-creation-requests',
  templateUrl: './accommodation-creation-requests.component.html',
  styleUrls: ['./accommodation-creation-requests.component.css'],
})
export class AccommodationCreationRequestsComponent {
  public acc: AccommodationPreviewDTO[];
  public bla: string;

  constructor(
    private route: ActivatedRoute,
    private service: AccommodationPreviewService
  ) {}

  ngOnInit() {
    this.service.findAllNotEnabled().subscribe((data) => {
      this.acc = data;
    });
  }
}
