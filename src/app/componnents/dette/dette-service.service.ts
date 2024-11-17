import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Dette } from './model/dette';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DetteServiceService {

  // private apiUrl = 'http://localhost:3000/dettes';  // URL du serveur JSON
  private apiUrl = environment.apiUrl+"debts";
  constructor(private http: HttpClient) {}

  getDettes(): Observable<Dette[]> {
    return this.http.get<Dette[]>(this.apiUrl);
  }

  

  addDette(dette: Dette): Observable<Dette> {

  const token = localStorage.getItem('access_token');  // Récupérer le token stocké

  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`,  // Ajouter le token à l'en-tête
    'Content-Type': 'application/json'
  });
    return this.http.post<Dette>(this.apiUrl, dette, { headers });
  }

  updateDette(id: number, dette: Dette): Observable<Dette> {

  const token = localStorage.getItem('access_token');  // Récupérer le token stocké

  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`,  // Ajouter le token à l'en-tête
    'Content-Type': 'application/json'
  });
    return this.http.put<Dette>(`${this.apiUrl}/${id}`, dette, { headers });
  }

  deleteDette(id: number): Observable<void> {
    const token = localStorage.getItem('access_token');  // Récupérer le token stocké
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,  // Ajouter le token à l'en-tête
    });
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers });
  }

  getDetteById(id: number): Observable<Dette> {
    return this.http.get<Dette>(`${this.apiUrl}/${id}`);
  }

   // Calculer les dettes
   calculateDettes(): Observable<any> {
    return this.http.post(`${this.apiUrl}/calculate`, {});
  }
}
// C:\wamp64\bin\php\php8.1.0
