import { Injectable } from '@angular/core';
import { AttestPersonnel } from './attest-personnel';
import { catchError, Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment.development';
import { Membre } from '../../../models/membre';

@Injectable({
  providedIn: 'root'
})
export class AttestPersonnelService {
  // private apiUrl = 'http://localhost:3000/';
  private apiUrl = environment.apiUrl+"attestations_companies";
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
    return this.http.post<AttestPersonnel>(this.apiUrl, attestPersonnel);
  }

  // Mettre à jour une attestation existante
  update(id: number, attestPersonnel: AttestPersonnel): Observable<AttestPersonnel> {
    return this.http.put<AttestPersonnel>(`${this.apiUrl}/${id}`, attestPersonnel);
  }

  // Supprimer une attestation
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

   // Méthode pour mettre à jour le statut d'une attestation
   updateStatut(id: number, newStatus: number): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}`, { status: newStatus });
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

}
