import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccommodationPreviewDTO } from 'src/app/accommodation-preview/model/accommodationPreviewDTO';
import { AccommodationPreviewService } from 'src/app/accommodation-preview/service/accommodation-preview.service';

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
