import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../components/auth/auth.service';
import { Router } from '@angular/router';
import { NgIf } from "@angular/common";
import { environment } from '../../../environments/environment';

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
  matricule: string = '';
  username: string = '';
  errorMessage: string = '';
  user: any = {};
  dashboardData: any = {};
  private dashboardurl = environment.apiUrl + 'dashboard';

  constructor(private authService: AuthService, private router: Router, private http: HttpClient) { }

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
    this.loadDashboardData();
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

  loadDashboardData(): void {

    this.http.get(this.dashboardurl).subscribe(
      (response: any) => {
        this.dashboardData = response;
        console.log('Données du tableau de bord:', this.dashboardData);
      },
      (error) => {
        console.error('Erreur lors de la récupération des données du tableau de bord:', error);
      }
    );
  }
}
