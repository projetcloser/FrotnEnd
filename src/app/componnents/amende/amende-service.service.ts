import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Amende } from './model/amende';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AmendeServiceService {

  private apiUrl = 'http://localhost:3000/amendes'; // URL de votre serveur JSON

  constructor(private http: HttpClient) { }

  // Créer une amende
  createAmende(amende: Amende): Observable<Amende> {
    return this.http.post<Amende>(this.apiUrl, amende);
  }


  // addAmende(amende: any): Observable<any> {
  //   const newAmende = {
  //     ...amende,
  //     date: new Date().toISOString(), // Ajoute la date actuelle
  //     auteur: this.getCurrentUser() // Récupère l'utilisateur connecté
  //   };
  //   return this.http.post(this.apiUrl, newAmende);
  // }

  // Récupérer toutes les amendes
  getAmendes(): Observable<Amende[]> {
    return this.http.get<Amende[]>(this.apiUrl);
  }

  // Récupérer une amende par ID
  getAmende(id: number): Observable<Amende> {
    return this.http.get<Amende>(`${this.apiUrl}/${id}`);
  }

  // Mettre à jour une amende
  updateAmende(id: number,amende: Amende): Observable<Amende> {
    return this.http.put<Amende>(`${this.apiUrl}/${amende.id}`, amende);
  }

  // Supprimer une amende
  deleteAmende(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Méthode pour récupérer l'utilisateur connecté (simulée ici)
  getCurrentUser(): string {
    // Vous pouvez récupérer les infos depuis un service d'authentification ou localStorage
    return localStorage.getItem('name') || 'Auteur Inconnu'; // Par exemple
  }
}
