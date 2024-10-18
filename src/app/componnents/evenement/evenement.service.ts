import { HttpClient } from '@angular/common/http';
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
    return this.http.post<Evenement>(this.apiUrl, evenement);
  }

  // Mettre à jour un événement
  updateEvenement(id: number, evenement: Evenement): Observable<Evenement> {
    return this.http.put<Evenement>(`${this.apiUrl}/${id}`, evenement);
  }

  // Supprimer un événement
  deleteEvenement(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
