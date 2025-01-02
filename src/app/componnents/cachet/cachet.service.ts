import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cachet } from './cachet';
import { catchError, Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CachetService {

    // private caheturl = 'http://localhost:3000/cachets';
    private caheturl = environment.apiUrl+'stamps';

    private countriesUrl = environment.apiUrl+'location/countries';
    private citiesUrl = environment.apiUrl+'location/cities';
    private memberUrl = environment.apiUrl+'members';

  constructor(private http: HttpClient) {}

  getCachets(): Observable<Cachet[]> {
    return this.http.get<Cachet[]>(this.caheturl);
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

      return this.http.get(`${this.caheturl}/search`, { params });
    }
  find(id: number): Observable<any> {
    if (!id) {
      console.log('ID is undefined or null');
      return of(null);
    }
    return this.http.get(`${this.caheturl}/${id}`);
  }



  getCachet(id: number): Observable<Cachet> {
    return this.http.get<Cachet>(`${this.caheturl}/${id}`);
  }

  getCountries(): Observable<any[]> {
    return this.http.get<any[]>(this.countriesUrl);
  }

  getCities(): Observable<any[]> {
    return this.http.get<any[]>(this.citiesUrl);
  }
  getMembers(): Observable<any[]> {
    return this.http.get<any[]>(this.memberUrl);
  }

  addCachet(cachet: Cachet): Observable<Cachet> {

    const token = localStorage.getItem('access_token');  // Récupérer le token stocké

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,  // Ajouter le token à l'en-tête
      'Content-Type': 'application/json'
    });
    return this.http.post<Cachet>(this.caheturl, cachet, { headers });
  }

  updateCachet(id: number, cachet: Cachet): Observable<Cachet> {

    const token = localStorage.getItem('access_token');  // Récupérer le token stocké

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,  // Ajouter le token à l'en-tête
      'Content-Type': 'application/json'
    });
    return this.http.put<Cachet>(`${this.caheturl}/${id}`, cachet, { headers });
  }

  deleteCachet(id: number): Observable<void> {
    const token = localStorage.getItem('access_token');  // Récupérer le token stocké
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,  // Ajouter le token à l'en-tête
    });
    return this.http.delete<void>(`${this.caheturl}/${id}`, { headers });
  }
}
