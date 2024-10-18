import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cachet } from './cachet';
import { catchError, Observable } from 'rxjs';
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

  find(id: number): Observable<any> {
    return this.http.get(this.caheturl +'/' + id);
  }
  errorHandler(errorHandler: any): import("rxjs").OperatorFunction<Object, any> {
    throw new Error('Method not implemented.');
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
    return this.http.post<Cachet>(this.caheturl, cachet);
  }

  updateCachet(id: number, cachet: Cachet): Observable<Cachet> {
    return this.http.put<Cachet>(`${this.caheturl}/${id}`, cachet);
  }

  deleteCachet(id: number): Observable<void> {
    return this.http.delete<void>(`${this.caheturl}/${id}`);
  }
}
