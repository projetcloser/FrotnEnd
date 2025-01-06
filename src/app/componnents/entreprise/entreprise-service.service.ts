import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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
  private countriesUrl = environment.apiUrl+'location/countries';
  private citiesUrl = environment.apiUrl+'location/cities';
  private detailsUrl = environment.apiUrl+"companies/company";


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

   searchMembers(filters: any): Observable<any> {
      let params = new HttpParams();

      // Ajouter les paramètres dynamiquement
      if (filters.keyword) {
        params = params.set('keyword', filters.keyword);
      }
      if (filters.statut) {
        params = params.set('statut', filters.statut);
      }
      if (filters.gender) {
        params = params.set('gender', filters.gender);
      }

      return this.httpclient.get(`${this.apiURL}/search`, { params });
    }

  create(entreprise: Entreprise): Observable<any> {

    const token = localStorage.getItem('access_token');  // Récupérer le token stocké

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,  // Ajouter le token à l'en-tête
      'Content-Type': 'application/json'
    });
    return this.httpclient.post(this.detailsUrl , entreprise, { headers })
      .pipe(
        catchError(this.errorHandler)
      );
  }

  find(id: number): Observable<any> {
    return this.httpclient.get(this.detailsUrl +'/' + id)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  update(id: number, entreprise: Entreprise): Observable<any> {

    const token = localStorage.getItem('access_token');  // Récupérer le token stocké

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,  // Ajouter le token à l'en-tête
      'Content-Type': 'application/json'
    });
    return this.httpclient.put(this.apiURL + '/' + id, JSON.stringify(entreprise),  { headers })
      .pipe(
        catchError(this.errorHandler)
      );
  }

  delete(id: number) {
    const token = localStorage.getItem('access_token');  // Récupérer le token stocké
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,  // Ajouter le token à l'en-tête
    });
    return this.httpclient.delete(this.apiURL +'/'+ id, { headers })
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
