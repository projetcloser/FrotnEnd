import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { User } from './model/user';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private apiUrl = environment.apiUrl + "login";
  private apiUrluser = environment.apiUrl + "users";

  private apiUrlinfo = environment.apiUrl;

  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;
  private apiUrlRacine = environment.apiUrl;

  private loggedIn: boolean = false;

  constructor(private http: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<User | null>(JSON.parse(localStorage.getItem('currentUser')!));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  // Getter pour accéder à l'utilisateur connecté
  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  // Enregistrement (register)
  register(data: any): Observable<any> {
    return this.http.post(`${this.apiUrlinfo}register`, data);
  }

  // Connexion (login)
  login(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, data);
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
    return this.http.get<any>(`${this.apiUrluser}`);
  }
  // create user


  // Supprimer le token lors de la déconnexion
  clearToken() {
    localStorage.removeItem('access_token');
  }

  getUserProfile(): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`${this.apiUrlRacine}user-info`, { headers });
  }


}
