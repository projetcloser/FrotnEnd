import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Postulant } from '../../models/postulant';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostulantServiceService {

  private apiURL = environment.apiUrl+"postulant";
  private countriesUrl = environment.apiUrl+'country';
  private citiesUrl = environment.apiUrl+'city';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private httpclient: HttpClient) { }

  getAll(): Observable<Postulant[]> {
    return this.httpclient.get<Postulant[]>(this.apiURL)
      .pipe(
        // map(response=> response.body.data),
        catchError(this.errorHandler)
      );
  }

  create(entreprise: Postulant): Observable<any> {
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

  update(id: number, entreprise: Postulant): Observable<any> {
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
