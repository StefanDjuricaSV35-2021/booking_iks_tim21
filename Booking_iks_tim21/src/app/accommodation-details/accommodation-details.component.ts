import { Component } from '@angular/core';
import {AccommodationDetailsDTO} from "./model/AccommodationDetailsDTO";
import {ActivatedRoute} from "@angular/router";
import {AccommodationDetailsService} from "./service/accommodation-details.service";

@Component({
  selector: 'app-accommodation-details',
  templateUrl: './accommodation-details.component.html',
  styleUrls: ['./accommodation-details.component.css']
})
export class AccommodationDetailsComponent {
  selected: null | undefined;
  id:number;
  acc:AccommodationDetailsDTO;
  constructor(private route: ActivatedRoute,private service: AccommodationDetailsService) {}
  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id')!

    this.service.findById(this.id).subscribe(data => {
      this.acc = data;
    });
  }


}
