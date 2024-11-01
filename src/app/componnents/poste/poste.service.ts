import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Poste } from './poste';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PosteService {

  private apiUrl = environment.apiUrl+"groups";

  constructor(private http: HttpClient) { }

  // Créer une amende
  createAmende(group: Poste): Observable<Poste> {
    const token = localStorage.getItem('access_token');  // Récupérer le token stocké

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,  // Ajouter le token à l'en-tête
      'Content-Type': 'application/json'
    });

    return this.http.post<Poste>(this.apiUrl, group, { headers });
  }

  // Récupérer toutes les amendes
  getAmendes(): Observable<Poste[]> {
    return this.http.get<Poste[]>(this.apiUrl);
  }

  // Récupérer une amende par ID
  getAmende(id: number): Observable<Poste> {
    return this.http.get<Poste>(`${this.apiUrl}/${id}`);
  }

  // Mettre à jour une amende
  updateAmende(id: number,group: Poste): Observable<Poste> {
    const token = localStorage.getItem('access_token');  // Récupérer le token stocké

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,  // Ajouter le token à l'en-tête
      'Content-Type': 'application/json'
    });
    return this.http.put<Poste>(`${this.apiUrl}/${group.id}`, group, { headers });
  }

  // Supprimer une amende
  deleteAmende(id: number): Observable<void> {
    const token = localStorage.getItem('access_token');  // Récupérer le token stocké

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,  // Ajouter le token à l'en-tête
    });
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers });
  }

  // Méthode pour récupérer l'utilisateur connecté (simulée ici)
  getCurrentUser(): string {
    // Vous pouvez récupérer les infos depuis un service d'authentification ou localStorage
    return localStorage.getItem('name') || 'Auteur Inconnu'; // Par exemple
  }
}
