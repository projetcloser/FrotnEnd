import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';

import { Membre } from '../../models/membre';
import { environment } from '../../../environments/environment';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MembreServiceService {


  private apiURL = environment.apiUrl+"members";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private httpclient: HttpClient) { }

  getAll(): Observable<Membre[]> {
    return this.httpclient.get<any>(this.apiURL)
      .pipe(
        map(response=> response),
        catchError(this.errorHandler)
      );
  }

  // create(data: Membre): Observable<any> {
  //   return this.httpclient.post(this.apiURL , JSON.stringify(data), this.httpOptions)
  //     .pipe(
  //       catchError(this.errorHandler)
  //     );
  // }

  create(membre: FormData): Observable<any> {
    return this.httpclient.post(`${this.apiURL}/members`, membre)
      .pipe(catchError(this.errorHandler));
  }


  find(id: number): Observable<any> {
    return this.httpclient.get(this.apiURL +'/' + id)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  update(id: number, data: Membre): Observable<any> {
    return this.httpclient.put(this.apiURL + '/' + id, JSON.stringify(data), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  delete(id: number) {
    return this.httpclient.delete(this.apiURL +'/'+ id, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }
  errorHandler(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
