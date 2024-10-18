import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { User } from './model/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'https://preprod.closercm.net/api'; // URL du backend Laravel

  constructor(private http: HttpClient) {}

  // Enregistrement (register)
  register(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  // Connexion (login)
  login(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, data);
  }

  // Déconnexion (logout)
  logout(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
    });

    return this.http.post(`${this.apiUrl}/logout`, {}, { headers });
  }

  // Enregistrer le token dans le localStorage après connexion
  setToken(token: string) {
    localStorage.setItem('access_token', token);
  }

  // Récupérer le token
  getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  forgotPassword(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/forgot-password`, { email });
  }

  // Vérifier si l'utilisateur est connecté
  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }

  getUser(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  // Supprimer le token lors de la déconnexion
  clearToken() {
    localStorage.removeItem('access_token');
  }

}
