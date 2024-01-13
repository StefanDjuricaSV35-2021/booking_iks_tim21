import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../../env/env";
import {AccommodationProfitDTO} from "../../models/AccommodationProfitDTO";
import {AccommodationReservationCountDTO} from "../../models/AccommodationReservationCountDTO";
import {AccommodationAnnualDataDTO} from "../../models/AccommodationAnnualDataDTO";

@Injectable({
  providedIn: 'root'
})
export class OwnerAnalyticsService {

  constructor(private http: HttpClient) {}


  public getAccommodationsProfit(ownerId: number, dateFrom: string, dateTo: string): Observable<AccommodationProfitDTO[]> {
    let params = new HttpParams()
      .set('dateFrom', dateFrom)
      .set('dateTo', dateTo)

    return this.http.get<AccommodationProfitDTO[]>(
      environment.apiHost + 'accommodations/'+ownerId+'/profit',
      { params: params }
    );
  }

  public getAccommodationReservationCount(ownerId: number, dateFrom: string, dateTo: string): Observable<AccommodationReservationCountDTO[]> {
    let params = new HttpParams()
      .set('dateFrom', dateFrom)
      .set('dateTo', dateTo)

    return this.http.get<AccommodationReservationCountDTO[]>(
      environment.apiHost + 'accommodations/'+ownerId+'/res-count',
      { params: params }
    );
  }

  public getAccommodationAnnualData(accId: number, year: number): Observable<AccommodationAnnualDataDTO> {
    let params = new HttpParams()
      .set('year', year)

    return this.http.get<AccommodationAnnualDataDTO>(
      environment.apiHost + 'accommodations/'+accId+'/annual-data',
      { params: params }
    );
  }
}
