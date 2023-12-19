import { Component } from '@angular/core';
import * as Leaflet from 'leaflet';
import * as $ from 'jquery';
import {LocationService} from "./service/location.service";
$('#elemId').width();



@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent {

  location:string;//=encodeURI('Vladike Cirica 2, Novi Sad, Serbia')
  lat:number;
  long:number;
  private map;

  public initMap(lat:number,long:number): void {
    this.map = Leaflet.map('map', {
      center: [ lat, long ],
      zoom: 17
    });

    Leaflet.marker([lat, long]).addTo(this.map);

    const tiles = Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);
  }

  constructor(private service:LocationService) { }

  ngOnInit(){



  }
  ngAfterViewInit(): void {

    this.service.findByLocation(this.location).subscribe(data => {
      console.log(data)
      this.lat=data[0].lat;
      this.long=data[0].lon;

      this.initMap(this.lat,this.long)
    });


  }

}



