import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Personnel } from './personnel';
import { Ville } from '../../models/ville';
import { Pays } from '../../models/pays';
import { Entreprise } from '../../models/entreprise';

@Injectable({
  providedIn: 'root'
})
export class PersonnelService {

  private apiRecup =  environment.apiUrl
  private apiURL = environment.apiUrl+"personnels";


  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private httpclient: HttpClient) { }

  getAll(): Observable<Personnel[]> {
    return this.httpclient.get<any>(this.apiURL)
      .pipe(
        // map(response=> response.body.data),
        catchError(this.errorHandler)
      );
  }

  getCities(): Observable<Ville[]> {
    return this.httpclient.get<Ville[]>(`${this.apiRecup}/city`);
  }

  getCountries(): Observable<Pays[]> {
    return this.httpclient.get<Pays[]>(`${this.apiRecup}/country`);
  }
  getCompanies(): Observable<Entreprise[]> {
    return this.httpclient.get<Entreprise[]>(`${this.apiRecup}/companies`);
  }

  create(data: FormData): Observable<any> {
    return this.httpclient.post(this.apiURL , JSON.stringify(data), this.httpOptions)
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

  update(id: number, data: Personnel): Observable<any> {
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
