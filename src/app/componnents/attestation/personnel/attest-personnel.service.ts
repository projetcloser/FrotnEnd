import { Injectable } from '@angular/core';
import { AttestPersonnel } from './attest-personnel';
import { catchError, Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment.development';
import { Membre } from '../../../models/membre';

@Injectable({
  providedIn: 'root'
})
export class AttestPersonnelService {
  // private apiUrl = 'http://localhost:3000/';
  // private apiUrl = environment.apiUrl+"attestations_companies";
  private apiUrl = environment.apiUrl+"personal-certificates";
  private countryApiURL  = environment.apiUrl+"members";
  constructor(private http: HttpClient) {}

  // Récupérer toutes les attestations
  getAll(): Observable<AttestPersonnel[]> {
    return this.http.get<AttestPersonnel[]>(this.apiUrl);
  }

  // Récupérer une seule attestation par ID
  getById(id: number): Observable<AttestPersonnel> {
    return this.http.get<AttestPersonnel>(`${this.apiUrl}/${id}`);
  }

  // Créer une nouvelle attestation
  create(attestPersonnel: AttestPersonnel): Observable<AttestPersonnel> {

    const token = localStorage.getItem('access_token');  // Récupérer le token stocké

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,  // Ajouter le token à l'en-tête
      'Content-Type': 'application/json'
    });
    return this.http.post<AttestPersonnel>(this.apiUrl, attestPersonnel, { headers });
  }



  // Mettre à jour une attestation existante
  update(id: number, attestPersonnel: AttestPersonnel): Observable<AttestPersonnel> {

    const token = localStorage.getItem('access_token');  // Récupérer le token stocké

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,  // Ajouter le token à l'en-tête
      'Content-Type': 'application/json'
    });
    return this.http.put<AttestPersonnel>(`${this.apiUrl}/${id}`, attestPersonnel, { headers });
  }

  // Supprimer une attestation
  delete(id: number): Observable<void> {
    const token = localStorage.getItem('access_token');  // Récupérer le token stocké
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,  // Ajouter le token à l'en-tête
    });
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers });
  }

   // Méthode pour mettre à jour le statut d'une attestation
   updateStatut(id: number, newStatus: number): Observable<any> {
    const token = localStorage.getItem('access_token');  // Récupérer le token stocké

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,  // Ajouter le token à l'en-tête
      'Content-Type': 'application/json'
    });
    return this.http.patch(`${this.apiUrl}/${id}`, { status: newStatus }, { headers });
  }

  getMember(): Observable<Membre[]> { // Nouvelle méthode pour récupérer les pays
    return this.http.get<Membre[]>(this.countryApiURL)
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

   // Méthode pour récupérer l'utilisateur connecté (simulée ici)
   getCurrentUser(): string {
    // Vous pouvez récupérer les infos depuis un service d'authentification ou localStorage
    return localStorage.getItem('name') || 'Auteur Inconnu'; // Par exemple
  }
}
