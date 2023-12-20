import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AccommodationPreviewDTO } from '../../../features/home/components/accommodation-preview/model/accommodationPreviewDTO';
import {environment} from "../../../../env/env";
import {Params} from "@angular/router";

@Injectable({
  providedIn: 'root',
})
export class AccommodationPreviewService {
  constructor(private http: HttpClient) {}
  public findAll(): Observable<AccommodationPreviewDTO[]> {
    return this.http.get<AccommodationPreviewDTO[]>(
      environment.apiHost + 'accommodations/previews'
    );
  }

  public search(params:Params): Observable<AccommodationPreviewDTO[]> {
    let par=new HttpParams().appendAll(params)
    return this.http.get<AccommodationPreviewDTO[]>(environment.apiHost+"accommodations/search" ,{ params: par });
  }

  public findAllNotEnabled(): Observable<AccommodationPreviewDTO[]> {
    return this.http.get<AccommodationPreviewDTO[]>(
      environment.apiHost + 'accommodations/previews/notEnabled'
    );
  }
}
