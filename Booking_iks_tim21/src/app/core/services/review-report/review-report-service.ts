import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../../env/env";
import {ReviewReportDTO} from "../../models/ReviewReportDTO";

@Injectable({
  providedIn: 'root'
})
export class ReviewReportService {

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient) {}

  public createReviewReport(
    reviewReportDTO: ReviewReportDTO
  ):
    Observable<ReviewReportDTO> {
    return this.http.post<ReviewReportDTO>(
      environment.apiHost + 'reports/reviews',
      reviewReportDTO,
      { headers: this.headers }
    );
  }

  public deleteReviewReport(id: number): Observable<void> {
    return this.http.delete<void>(
      environment.apiHost + 'reports/reviews/'+id,
      { headers: this.headers }
    );
  }

}
