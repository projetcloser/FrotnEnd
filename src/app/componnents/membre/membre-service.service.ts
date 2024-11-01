import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';

import { Membre } from '../../models/membre';

import { Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MembreServiceService {


  private apiURL = environment.apiUrl+"members";
  private countriesUrl = environment.apiUrl+'location/countries';
    private citiesUrl = environment.apiUrl+'location/cities';



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

  // create(membre: FormData): Observable<any> {
  //   return this.httpclient.post(`${this.apiURL}/member`, membre)
  //     .pipe(catchError(this.errorHandler));
  // }
  create(membre: FormData): Observable<any> {
    const token = localStorage.getItem('access_token');  // Récupérer le token stocké

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,  // Ajouter le token à l'en-tête
      'Content-Type': 'application/json'
    });
    return this.httpclient.post(`${this.apiURL}`, membre,  { headers })
      .pipe(catchError(this.errorHandler));
  }


  find(id: number): Observable<any> {
    return this.httpclient.get(this.apiURL +'/' + id)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  update(id: number, data: Membre): Observable<any> {
    const token = localStorage.getItem('access_token');  // Récupérer le token stocké

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,  // Ajouter le token à l'en-tête
      'Content-Type': 'application/json'
    });
    return this.httpclient.put(this.apiURL + '/' + id, JSON.stringify(data),  { headers })
      .pipe(
        catchError(this.errorHandler)
      );
  }

  delete(id: number) {
    const token = localStorage.getItem('access_token');  // Récupérer le token stocké
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,  // Ajouter le token à l'en-tête
    });
    return this.httpclient.delete(this.apiURL +'/'+ id,  { headers })
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
