import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Ville } from '../../models/ville';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Pays } from '../../models/pays';

@Injectable({
  providedIn: 'root'
})
export class VilleServiceService {

  private apiURL = environment.apiUrl+"city";
  private countryApiURL  = environment.apiUrl+"country";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private httpclient: HttpClient) { }

  getAll(): Observable<Ville[]> {
    return this.httpclient.get<any>(this.apiURL)
      .pipe(
        // map(response=> response),
        catchError(this.errorHandler)
      );
  }

  getCityById(id: number): Observable<any> {
    return this.httpclient.get<any>(`${this.apiURL}/${id}`);
  }

  create(city: Ville): Observable<any> {
    return this.httpclient.post(this.apiURL , JSON.stringify(city), this.httpOptions)
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

  update(id: number, city: Ville): Observable<any> {
    return this.httpclient.put(this.apiURL + '/' + id, JSON.stringify(city), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  delete(id: number): Observable<any> {
    return this.httpclient.delete(`${this.apiURL}/${id}`, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }


  getCountries(): Observable<Pays[]> { // Nouvelle méthode pour récupérer les pays
    return this.httpclient.get<Pays[]>(this.countryApiURL)
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
