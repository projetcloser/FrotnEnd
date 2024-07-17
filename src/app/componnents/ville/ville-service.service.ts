import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Ville } from '../../models/ville';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VilleServiceService {

  private apiURL = environment.apiUrl+"cities";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private httpclient: HttpClient) { }

  getAll(): Observable<Ville[]> {
    return this.httpclient.get<any>(this.apiURL)
      .pipe(
        map(response=> response.body.data),
        catchError(this.errorHandler)
      );
  }

  create(activite: Ville): Observable<any> {
    return this.httpclient.post(this.apiURL , JSON.stringify(activite), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  find(id: number): Observable<any> {
    return this.httpclient.get(this.apiURL +'/' + id)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  update(id: number, activite: Ville): Observable<any> {
    return this.httpclient.put(this.apiURL + '/' + id, JSON.stringify(activite), this.httpOptions)
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
