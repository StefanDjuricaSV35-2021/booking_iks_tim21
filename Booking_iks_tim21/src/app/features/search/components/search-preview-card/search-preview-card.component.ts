import {Component, Input, signal} from '@angular/core';
import {AccommodationPreviewDTO} from "../../../home/components/accommodation-preview/model/accommodationPreviewDTO";
import {ActivatedRoute, Route, Router} from "@angular/router";

@Component({
  selector: 'app-search-preview-card',
  templateUrl: './search-preview-card.component.html',
  styleUrls: ['./search-preview-card.component.css']
})
export class SearchPreviewCardComponent {

  constructor(private router:Router,private route: ActivatedRoute) {}
  @Input() accommodationPreview: AccommodationPreviewDTO;

  navigate(){

    let params=this.route.snapshot.queryParams;

    this.router.navigate(['/accommodation',this.accommodationPreview.id],
      { queryParams: {'dateFrom':params['dateFrom'],'dateTo':params['dateTo'],'noGuests':params['noGuests'],'price':this.accommodationPreview.price}});

  }
}
