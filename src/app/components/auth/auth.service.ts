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

    // Méthode pour vérifier si l'utilisateur est authentifié
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }


  // Méthode pour se connecter
  login(email: string, password: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}?email=${email}&password=${password}`)
      .pipe(
        tap((users: User[]) => {
          if (users.length > 0) {
            localStorage.setItem('token', users[0].token??'');  // Stocker le token
            this.router.navigate(['/dashboard']);  // Rediriger après connexion
          } else {
            alert('Email ou mot de passe incorrect');
          }
        })
      );
  }



  // Register
  register(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }

  
    // Forget Password (you would implement a logic here to search by email)
    forgotPassword(email: string): Observable<any> {
      return this.http.get<any[]>(`${this.apiUrl}?email=${email}`);
    }

     // Logout
  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  
}
