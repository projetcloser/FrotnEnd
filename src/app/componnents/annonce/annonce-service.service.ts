import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Annonce } from './model/annonce';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AnnonceServiceService {

  private apiUrl = 'http://localhost:3000/annonces'; // URL du serveur JSON
  // private apiUrl = environment.apiUrl+"announcements";

  constructor(private http: HttpClient) {}

  // Lire toutes les annonces
  getAnnonces(): Observable<Annonce[]> {
    return this.http.get<Annonce[]>(this.apiUrl);
  }

  // Lire une annonce par id
  getAnnonce(id: number): Observable<Annonce> {
    return this.http.get<Annonce>(`${this.apiUrl}/${id}`);
  }

  // Créer une nouvelle annonce
  createAnnonce(annonce: Annonce): Observable<Annonce> {
    return this.http.post<Annonce>(this.apiUrl, annonce);
  }

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
    return this.http.put(`${this.apiUrl}/annonces/${id}`, formData);
  }


  // Supprimer une annonce
  deleteAnnonce(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

    // Méthode pour télécharger un fichier
    downloadFile(fileUrl: string): Observable<Blob> {
      return this.http.get(fileUrl, { responseType: 'blob' });
    }
}
