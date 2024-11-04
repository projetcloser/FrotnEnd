
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Cotisation } from './cotisation';

@Injectable({
  providedIn: 'root'
})
export class CotisationService {

 // private apiUrl = 'http://localhost:3000/Cotisation'; // URL du JSON Server
 private apiUrl = environment.apiUrl+"cotisations";
 private countriesUrl = environment.apiUrl+'location/countries';
    private citiesUrl = environment.apiUrl+'location/cities';

 constructor(private http: HttpClient) {}

 // Récupérer tous les événements
 getCotisations(): Observable<Cotisation[]> {
   return this.http.get<Cotisation[]>(this.apiUrl);
 }

 // Récupérer un événement par ID
 getCotisationById(id: number): Observable<Cotisation> {
   return this.http.get<Cotisation>(`${this.apiUrl}/${id}`);
 }

  // Récupérer la dernière cotisation pour déterminer la prochaine référence
  getLastCotisation(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?_sort=id&_order=desc&_limit=1`);
  }

 // Créer un nouvel événement
 createCotisation(Cotisation: Cotisation): Observable<Cotisation> {

  const token = localStorage.getItem('access_token');  // Récupérer le token stocké

  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`,  // Ajouter le token à l'en-tête
    'Content-Type': 'application/json'
  });
   return this.http.post<Cotisation>(this.apiUrl, Cotisation, { headers });
 }

 // Mettre à jour un événement
 updateCotisation(id: number, Cotisation: Cotisation): Observable<Cotisation> {

  const token = localStorage.getItem('access_token');  // Récupérer le token stocké

  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`,  // Ajouter le token à l'en-tête
    'Content-Type': 'application/json'
  });
   return this.http.put<Cotisation>(`${this.apiUrl}/${id}`, Cotisation, { headers });
 }

 // Supprimer un événement
 deleteCotisation(id: number): Observable<void> {
  const token = localStorage.getItem('access_token');  // Récupérer le token stocké
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`,  // Ajouter le token à l'en-tête
  });
   return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers });
 }


 getCountries(): Observable<any[]> {
  return this.http.get<any[]>(this.countriesUrl);
}

getCities(): Observable<any[]> {
  return this.http.get<any[]>(this.citiesUrl);
}
}
