import {Component, OnInit} from '@angular/core';
import {Accomodation} from "../accommodation-details/model";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit{

  public acc: Accomodation[] =[];

  ngOnInit(): void {

    this.acc.push(new Accomodation(1,"a","a","a",1))
    this.acc.push(new Accomodation(2,"b","a","a",1))
    this.acc.push(new Accomodation(3,"c","a","a",1))
    this.acc.push(new Accomodation(4,"d","a","a",1))
    this.acc.push(new Accomodation(5,"e","a","a",1))




  }



}
