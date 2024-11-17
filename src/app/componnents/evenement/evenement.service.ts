import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Evenement } from './evenement';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EvenementService {


  // private apiUrl = environment.apiUrl+'evenement'; // URL du JSON Server
  private apiUrl = environment.apiUrl+"events";
  private baseUrl = environment.apiUrl+'events/evenements';

  constructor(private http: HttpClient) {}

  // Récupérer tous les événements
  getEvenements(): Observable<Evenement[]> {
    return this.http.get<Evenement[]>(this.apiUrl);
  }

  // Récupérer un événement par ID
  getEvenementById(id: number): Observable<Evenement> {
    return this.http.get<Evenement>(`${this.apiUrl}/${id}`);
  }


  // Créer un nouvel événement
  createEvenement(evenement: Evenement): Observable<Evenement> {

  const token = localStorage.getItem('access_token');  // Récupérer le token stocké

  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`,  // Ajouter le token à l'en-tête
    'Content-Type': 'application/json'
  });
    return this.http.post<Evenement>(this.apiUrl, evenement,  { headers });
  }


  incrementParticipant(id: number): Observable<any> {
    const token = localStorage.getItem('access_token');  // Récupérer le token stocké

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,  // Ajouter le token à l'en-tête
      'Content-Type': 'application/json'
    });
    return this.http.post<any>(`${this.baseUrl}/${id}/increment-participant`, {},  { headers });
  }

  decrementParticipant(id: number): Observable<any> {
    const token = localStorage.getItem('access_token');  // Récupérer le token stocké

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,  // Ajouter le token à l'en-tête
      'Content-Type': 'application/json'
    });
    return this.http.post<any>(`${this.baseUrl}/${id}/decrement-participant`, {},  { headers });
  }


  // Mettre à jour un événement
  updateEvenement(id: number, evenement: Evenement): Observable<Evenement> {

  const token = localStorage.getItem('access_token');  // Récupérer le token stocké

  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`,  // Ajouter le token à l'en-tête
    'Content-Type': 'application/json'
  });
    return this.http.put<Evenement>(`${this.apiUrl}/${id}`, evenement,  { headers });
  }

  // Supprimer un événement
  deleteEvenement(id: number): Observable<void> {
    const token = localStorage.getItem('access_token');  // Récupérer le token stocké
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,  // Ajouter le token à l'en-tête
    });
    return this.http.delete<void>(`${this.apiUrl}/${id}`,  { headers });
  }
}
