import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { NonPaye } from './non-paye';
import { environment } from '../../../../environments/environment.development';
import { Membre } from '../../../models/membre';
@Injectable({
  providedIn: 'root'
})
export class NonPayeService {

  // private apiUrl = 'http://localhost:3000/attestations_companies';
  private apiUrl = environment.apiUrl+"companies/attestations";
  private countryApiURL  = environment.apiUrl+"members";

  constructor(private http: HttpClient) { }

  getAttestations(): Observable<NonPaye[]> {
    return this.http.get<NonPaye[]>(this.apiUrl);
  }

  getAttestation(id: number): Observable<NonPaye> {
    return this.http.get<NonPaye>(`${this.apiUrl}/${id}`);
  }

  createAttestation(attestation: NonPaye): Observable<NonPaye> {
    const token = localStorage.getItem('access_token');  // Récupérer le token stocké

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,  // Ajouter le token à l'en-tête
      'Content-Type': 'application/json'
    });
    return this.http.post<NonPaye>(this.apiUrl, attestation, { headers });
  }

  updateAttestation(id: number, attestation: NonPaye): Observable<NonPaye> {
    const token = localStorage.getItem('access_token');  // Récupérer le token stocké

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,  // Ajouter le token à l'en-tête
      'Content-Type': 'application/json'
    });
    return this.http.put<NonPaye>(`${this.apiUrl}/${id}`, attestation, { headers });
  }

  deleteAttestation(id: number): Observable<void> {
    const token = localStorage.getItem('access_token');  // Récupérer le token stocké
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,  // Ajouter le token à l'en-tête
    });
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers });
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
