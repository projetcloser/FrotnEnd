import { Component } from '@angular/core';
import { AuthService } from '../../components/auth/auth.service';
import { Router } from '@angular/router';
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  password: string = '';
  matricule : string = '';
  username :string='';
  errorMessage: string = '';
  user: any = {};

  constructor(private authService: AuthService, private router: Router) {}

//   loadUserProfile(): void {
//     this.authService.getUserProfile().subscribe(
//         (response: any) => {
//             this.username = response.name;   // Nom de l'utilisateur
//             this.password = response.password;     // Email de l'utilisateur
//             this.matricule = response.matricule; // Matricule de l'utilisateur
//         },
//         (error) => {
//             console.error('Erreur lors de la récupération du profil utilisateur:', error);
//         }
//     );
// }

  ngOnInit(): void {

    this.loadUserProfile();
  }

  loadUserProfile(): void {
    this.authService.getUserProfile().subscribe(
      (response: any) => {
        this.user = response;
        console.log('Utilisateur connecté:', this.user);  // Vérifie les données ici

      },
      (error) => {
        console.error('Erreur lors de la récupération du profil utilisateur:', error);
      }
    );
  }
}
