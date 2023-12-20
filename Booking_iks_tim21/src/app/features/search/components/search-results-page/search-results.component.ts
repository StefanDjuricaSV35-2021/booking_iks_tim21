import { Component } from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {AccommodationPreviewDTO} from "../../../home/components/accommodation-preview/model/accommodationPreviewDTO";
import {
  AccommodationPreviewService
} from "../../../../core/services/accommodation-preview/accommodation-preview.service";

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent {

  params:Params;
  accommodationPreviews:AccommodationPreviewDTO[];
  constructor(
    private route: ActivatedRoute,
    private service:AccommodationPreviewService
  ) {}

  ngOnInit() {

    this.route.queryParams
      .subscribe(params => {

        this.service.search(params).subscribe(data => {
          this.accommodationPreviews = data;
        });

        }
      );
  }
}
