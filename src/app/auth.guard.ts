import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './components/auth/auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

   // Cette méthode décide si la route peut être activée ou non
   canActivate(): boolean {
    // On vérifie si l'utilisateur est authentifié
    if (this.authService.isLoggedIn()) {
      return true;  // L'utilisateur est connecté, il peut accéder à la route
    } else {
      // Si l'utilisateur n'est pas connecté, on le redirige vers la page de login
      this.router.navigate(['/login']);
      return false; // Bloque l'accès à la route
    }
  }
}
