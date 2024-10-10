import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Entreprise } from '../../models/entreprise';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class EntrepriseServiceService {


  // private apiURL = environment.apiUrl+"companies";
  // private countriesUrl = environment.apiUrl+'country';
  // private citiesUrl = environment.apiUrl+'city';

  private apiURL = environment.apiUrl+"companies";
  private countriesUrl = environment.apiUrl+'country';
  private citiesUrl = environment.apiUrl+'city';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private httpclient: HttpClient) { }

  getAll(): Observable<Entreprise[]> {
    return this.httpclient.get<Entreprise[]>(this.apiURL)
      .pipe(
        // map(response=> response.body.data),
        catchError(this.errorHandler)
      );
  }

  create(entreprise: Entreprise): Observable<any> {
    return this.httpclient.post(this.apiURL , JSON.stringify(entreprise), this.httpOptions)
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

  update(id: number, entreprise: Entreprise): Observable<any> {
    return this.httpclient.put(this.apiURL + '/' + id, JSON.stringify(entreprise), this.httpOptions)
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

  getCountries(): Observable<any[]> {
    return this.httpclient.get<any[]>(this.countriesUrl);
  }

  getCities(): Observable<any[]> {
    return this.httpclient.get<any[]>(this.citiesUrl);
  }
}
