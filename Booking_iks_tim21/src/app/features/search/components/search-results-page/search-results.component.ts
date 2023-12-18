import { Component } from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {SearchPageService} from "./service/search-page.service";
import {AccommodationPreviewDTO} from "../../../home/components/accommodation-preview/model/accommodationPreviewDTO";

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
    private service:SearchPageService
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
