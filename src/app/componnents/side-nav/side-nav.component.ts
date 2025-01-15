import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../components/auth/auth.service';
import { Router, RouterLink, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ContainerModule } from '../../components/container/container.module';
import { MembreModule } from '../membre/membre/membre.module';
import { CaisseModule } from '../Caisse/caisse/caisse.module';
import { EntrepriseModule } from '../entreprise/entreprise/entreprise.module';
import { VilleModule } from '../ville/ville/ville.module';
import { QuartierModule } from '../quartier/quartier/quartier.module';
import { PaysModule } from '../pays/pays/pays.module';
import { CotisationModule } from '../cotisation/cotisation/cotisation.module';
import { PersonnelModule } from '../personnel/personnel/personnel.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { routes } from '../../helpers/routes';
import { environment } from '../../../environments/environment';


import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { TranslateService } from '@ngx-translate/core'; // Importer TranslateService
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';





@Component({
  selector: 'app-side-nav',
  standalone: true,
  imports: [RouterOutlet,
    CommonModule,
    RouterLink,
    RouterLinkActive,
    RouterModule,
    ContainerModule,
    MembreModule,
    CaisseModule,
    EntrepriseModule,
    VilleModule,
    QuartierModule,
    PaysModule,
    CotisationModule,
    PersonnelModule,

    MatSidenavModule,
    MatToolbarModule,
    MatSelectModule,
    HttpClientModule,
    // TranslateModule.forRoot({
    //   loader: {
    //     provide: TranslateLoader,
    //     useFactory: HttpLoaderFactory,
    //     deps: [HttpClient]
    //   }
    // }),

    NgxPaginationModule],
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.css'
})
export class SideNavComponent implements OnInit {
  currentLang = 'fr'; // Langue par défaut
  user: any = {};
  private cotisationurl = environment.apiUrl + 'cotisations';
  cotisations: any[] = [];
  firstStatus = 1;

  routes: Array<any> = routes
  constructor(private authService: AuthService, private router: Router, private http: HttpClient) { }
  // ,private translate: TranslateService)

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login'])
  }

  ngOnInit(): void {
    // this.currentLang = this.translate.getDefaultLang(); // Assurez-vous que la langue par défaut est bien chargée

    // this.authService.getUser().subscribe(
    //   (data) => {
    //     this.user = data;
    //     console.log('Utilisateur connecté:', this.user);  // Vérifie les données ici
    //   },
    //   (error) => {
    //     console.error('Erreur lors du chargement des informations utilisateur', error);
    //   }
    // );
    this.loadUserProfile();
    this.loadcotisations();
  }


  changeLanguage(lang: string): void {
    // this.translate.use(lang);
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



    //   this.authService.getUserProfile().subscribe(
    //     (response: any) => {

    //       this.user = response.user.name;

    //     },
    //     (error) => {
    //       console.error('Erreur lors de la récupération du profil utilisateur:', error);
    //     }
    // );
  }

  loadcotisations() {
    // Étape 1 : Récupération du profil utilisateur
    this.authService.getUserProfile().subscribe(
      (response: any) => {
        this.user = response;
        console.log('Utilisateur connectées:', this.user);

        // Étape 2 : Assurez-vous que 'id_perso' existe avant de continuer
        const idPerso = this.user.perso?.id;
        const idRole = this.user.role?.id;
        if (!idPerso) {
          console.error("ID personnel non trouvé pour l'utilisateur.");
          return;
        }
        // Étape 3 : Requête pour les données du tableau de bord
        this.http.get(`${this.cotisationurl}?id_perso=${idPerso}&id_role=${idRole}`).subscribe(
          (cotisationsResponse: any) => {
            this.cotisations = cotisationsResponse;

            console.log('Données du tableau de bord2:', this.cotisations);

            // Vérification et récupération du status de la première valeur
            if (this.cotisations && this.cotisations.length > 0) {
              const firstStatus = this.cotisations[0].status;
              console.log('Status de la première valeur:', firstStatus);

              // Si vous avez besoin d'utiliser cette valeur ailleurs :
              this.firstStatus = firstStatus;
            } else {
              console.warn("Aucune donnée trouvée dans cotisations.");
            }
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
