import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Annonce } from './model/annonce';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AnnonceServiceService {

  // private apiUrl = 'http://localhost:3000/annonces'; // URL du serveur JSON
  private apiUrl = environment.apiUrl+"announcements";

  constructor(private http: HttpClient) {}

  // Lire toutes les annonces
  getAnnonces(): Observable<Annonce[]> {
    return this.http.get<Annonce[]>(this.apiUrl);
  }

  // Lire une annonce par id
  getAnnonce(id: number): Observable<Annonce> {
    return this.http.get<Annonce>(`${this.apiUrl}/${id}`);
  }

   // Modifiez la signature de la méthode pour accepter FormData
   createAnnonce(annonce: FormData): Observable<Annonce> {
    const token = localStorage.getItem('access_token');  // Récupérer le token stocké

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,  // Ajouter le token à l'en-tête
      'Content-Type': 'application/json'
    });
    return this.http.post<Annonce>(this.apiUrl, annonce, { headers });
  }
  // Créer une nouvelle annonce
  // createAnnonce(annonce: Annonce): Observable<Annonce> {

  //   const token = localStorage.getItem('access_token');  // Récupérer le token stocké

  //   const headers = new HttpHeaders({
  //     'Authorization': `Bearer ${token}`,  // Ajouter le token à l'en-tête
  //     'Content-Type': 'application/json'
  //   });
  //   return this.http.post<Annonce>(this.apiUrl, annonce, { headers });
  // }

  getAnnonceById(id: number): Observable<Annonce> {
    return this.http.get<Annonce>(`${this.apiUrl}/${id}`);
  }
  // Mettre à jour une annonce
  // updateAnnonce(id: number, annonce: Annonce): Observable<Annonce> {
  //   return this.http.put<Annonce>(`${this.apiUrl}/${id}`, annonce);
  // }
  // updateAnnonce(annonce: Annonce): Observable<Annonce> {
  //   return this.http.put<Annonce>(`${this.apiUrl}/${annonce.id}`, annonce);
  // }
  updateAnnonce(id: number, formData: FormData) {
    const token = localStorage.getItem('access_token');  // Récupérer le token stocké

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,  // Ajouter le token à l'en-tête
      'Content-Type': 'application/json'
    });
    return this.http.put(`${this.apiUrl}/annonces/${id}`, formData, { headers });
  }


  // Supprimer une annonce
  deleteAnnonce(id: number): Observable<void> {
    const token = localStorage.getItem('access_token');  // Récupérer le token stocké
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,  // Ajouter le token à l'en-tête
    });
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers });
  }

    // Méthode pour télécharger un fichier
    downloadFile(fileUrl: string): Observable<Blob> {
      return this.http.get(fileUrl, { responseType: 'blob' });
    }
}
