import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {AccommodationPreviewDTO} from "../../accommodation-preview/model/accommodationPreviewDTO";
import {environment} from "../../../env/env";
import {AccommodationDetailsDTO} from "../model/AccommodationDetailsDTO";

@Injectable({
  providedIn: 'root'
})
export class AccommodationDetailsService {

  constructor(private http: HttpClient) {
  }
  public findById(id:number): Observable<AccommodationDetailsDTO> {
    return this.http.get<AccommodationDetailsDTO>(environment.apiHost + 'accommodations/'+id);
  }
}
