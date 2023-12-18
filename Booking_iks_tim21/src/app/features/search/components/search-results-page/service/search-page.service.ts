import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../../../../env/env";
import {Params} from "@angular/router";
import {AccommodationPreviewDTO} from "../../../../home/components/accommodation-preview/model/accommodationPreviewDTO";

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
