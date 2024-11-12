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
  // private apiURL = environment.apiUrl+"personnels";
  private apiURL = environment.apiUrl+"staff";
  private createURL = environment.apiUrl+"staff/staff";
  private countriesUrl = environment.apiUrl+'location/countries';
  private citiesUrl = environment.apiUrl+'location/cities';


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

  getCountries(): Observable<any[]> {
    return this.httpclient.get<any[]>(this.countriesUrl);
  }

  getCities(): Observable<any[]> {
    return this.httpclient.get<any[]>(this.citiesUrl);
  }

  getCompanies(): Observable<Entreprise[]> {
    return this.httpclient.get<Entreprise[]>(`${this.apiRecup}/companies`);
  }

  create(data: FormData): Observable<any> {
    const token = localStorage.getItem('access_token');  // Récupérer le token stocké

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,  // Ajouter le token à l'en-tête
      'Content-Type': 'application/json'
    });
    return this.httpclient.post(this.createURL , JSON.stringify(data), { headers })
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
 // Méthode pour récupérer un personnel par ID
  // Méthode pour récupérer un personnel par ID
  getPersonnelById(id: number): Observable<Personnel> {
    return this.httpclient.get<Personnel>(`${this.apiURL}/${id}`);
  }

  // Méthode pour mettre à jour un personnel
  updatePersonnel(id: number, personnel: FormData): Observable<any> {
    const token = localStorage.getItem('access_token');  // Récupérer le token stocké

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,  // Ajouter le token à l'en-tête
      'Content-Type': 'application/json'
    });
    return this.httpclient.put(`${this.apiURL}/${id}`, personnel,  { headers });
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
}
