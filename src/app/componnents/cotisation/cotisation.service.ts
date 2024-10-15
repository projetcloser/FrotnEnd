
import { HttpClient } from '@angular/common/http';
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

 constructor(private http: HttpClient) {}

 // Récupérer tous les événements
 getCotisations(): Observable<Cotisation[]> {
   return this.http.get<Cotisation[]>(this.apiUrl);
 }

 // Récupérer un événement par ID
 getCotisationById(id: number): Observable<Cotisation> {
   return this.http.get<Cotisation>(`${this.apiUrl}/${id}`);
 }

 // Créer un nouvel événement
 createCotisation(Cotisation: Cotisation): Observable<Cotisation> {
   return this.http.post<Cotisation>(this.apiUrl, Cotisation);
 }

 // Mettre à jour un événement
 updateCotisation(id: number, Cotisation: Cotisation): Observable<Cotisation> {
   return this.http.put<Cotisation>(`${this.apiUrl}/${id}`, Cotisation);
 }

 // Supprimer un événement
 deleteCotisation(id: number): Observable<void> {
   return this.http.delete<void>(`${this.apiUrl}/${id}`);
 }
}
