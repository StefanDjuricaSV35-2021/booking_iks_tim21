import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {AccommodationDetailsDTO} from "../../../../core/models/AccommodationDetailsDTO";
import {environment} from "../../../../../env/env";

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private http: HttpClient) {}

  public findByLocation(location:string): Observable<object> {
    return this.http.get<object>(
      '//nominatim.openstreetmap.org/search?format=json&q='+encodeURI(location)
    );
  }


}
