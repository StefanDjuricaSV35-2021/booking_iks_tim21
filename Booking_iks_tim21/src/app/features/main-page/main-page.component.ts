import {Component, OnInit} from '@angular/core';
import {AccommodationPreviewDTO} from "../../accommodation-preview/model/accommodationPreviewDTO";
import {AccommodationPreviewService} from "../../accommodation-preview/service/accommodation-preview.service";
import {User} from "../../profile/model/user.model";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit{

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
