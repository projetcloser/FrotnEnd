import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { User } from './model/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    private apiUrl = 'http://localhost:3000/users'; // URL du serveur JSON
    
    private currentUserSubject: BehaviorSubject<User | null>;
    public currentUser: Observable<User | null>;

    private loggedIn: boolean = false;

    constructor(private http: HttpClient, private router: Router) {
      this.currentUserSubject = new BehaviorSubject<User | null>(JSON.parse(localStorage.getItem('currentUser')!));
      this.currentUser = this.currentUserSubject.asObservable();
    }

     // Getter pour accéder à l'utilisateur connecté
    public get currentUserValue(): User | null {
      return this.currentUserSubject.value;
    }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}`, { email, password });
  }

  register(name: string, email: string, password: string, password_confirmation: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, { name, email, password, password_confirmation });
  }

  forgotPassword(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/forgot-password`, { email });
  }

   // Stocker le token dans le localStorage
   saveToken(token: string): void {
    localStorage.setItem('token', token);
  }
   // Récupérer le token depuis le localStorage
   getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token'); // Supprimer le token lors de la déconnexion
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getUser(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

}
