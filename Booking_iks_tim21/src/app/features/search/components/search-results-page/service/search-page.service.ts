import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {AccommodationDetailsDTO} from "../../../../../accommodation-details/model/AccommodationDetailsDTO";
import {environment} from "../../../../../../env/env";
import {AccommodationPreviewDTO} from "../../../../../accommodation-preview/model/accommodationPreviewDTO";
import {Params} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class SearchPageService {
  constructor(private http: HttpClient) {
  }
  public search(params:Params): Observable<AccommodationPreviewDTO[]> {
    let par=new HttpParams().appendAll(params)
    return this.http.get<AccommodationPreviewDTO[]>(environment.apiHost+"accommodations/search" ,{ params: par });
  }
}
