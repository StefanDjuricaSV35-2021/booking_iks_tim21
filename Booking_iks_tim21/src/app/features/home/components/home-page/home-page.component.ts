import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AccommodationPreviewDTO} from "../accommodation-preview/model/accommodationPreviewDTO";
import {AccommodationPreviewService} from "../accommodation-preview/service/accommodation-preview.service";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {

  public acc: AccommodationPreviewDTO[];
  public bla:string;

  constructor(private route: ActivatedRoute,private service: AccommodationPreviewService) {
  }


  ngOnInit() {

    this.service.findAll().subscribe(data => {
      this.acc = data;
      //console.log(this.acc[0].photo)
    });



  }

}
