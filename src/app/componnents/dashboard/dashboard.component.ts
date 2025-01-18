import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../components/auth/auth.service';
import { Router } from '@angular/router';
import { NgIf } from "@angular/common";
import { environment } from '../../../environments/environment';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    NgIf,
  TranslateModule
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

  // loadDashboardData(): void {

  //   this.http.get(this.dashboardurl).subscribe(
  //     (response: any) => {
  //       this.dashboardData = response;
  //       // Filtrage des cotisations pour un membre spécifique
  //     if (this.user.role?.name === 'membre') {
  //       this.dashboardData.cotisations.total = this.dashboardData.cotisations.membreTotal; // Par exemple, `membreTotal` doit être défini dans vos données backend
  //     }
  //       console.log('Données du tableau de bord:', this.dashboardData);
  //     },
  //     (error) => {
  //       console.error('Erreur lors de la récupération des données du tableau de bord:', error);
  //     }
  //   );
  // }

  loadDashboardData(): void {
    // Étape 1 : Récupération du profil utilisateur
    this.authService.getUserProfile().subscribe(
      (response: any) => {
        this.user = response;
        console.log('Utilisateur connecté:', this.user);

        // Étape 2 : Assurez-vous que 'id_perso' existe avant de continuer
        const idPerso = this.user.perso?.id;
        const idRole = this.user.role?.id;
        if (!idPerso) {
          console.error("ID personnel non trouvé pour l'utilisateur.");
          return;
        }

        // Étape 3 : Requête pour les données du tableau de bord
        this.http.get(`${this.dashboardurl}?id_perso=${idPerso}&id_role=${idRole}`).subscribe(
          (dashboardResponse: any) => {
            this.dashboardData = dashboardResponse;

            // Si l'utilisateur a le rôle 'membre', utilisez des données spécifiques
            // if (this.user.role?.name === 'membre') {
            //   this.dashboardData.cotisations.total = this.dashboardData.cotisations.member_total;
            // }

            console.log('Données du tableau de bord:', this.dashboardData);
          },
          (error) => {
            console.error('Erreur lors de la récupération des données du tableau de bord:', error);
          }
        );
      },
      (error) => {
        console.error('Erreur lors de la récupération du profil utilisateur:', error);
      }
    );
  }


}
