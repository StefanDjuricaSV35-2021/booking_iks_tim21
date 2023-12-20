import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { environment } from 'src/env/env';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  private server:string = 'http://localhost:8080';
  private apiUrl = environment.apiHost + 'images';

  constructor(private http: HttpClient) { }

  upload(formData: FormData){
    return this.http.post<string[]>(this.apiUrl+"/upload", formData, {
      reportProgress: true,
      observe: 'events'
    });
  }

}