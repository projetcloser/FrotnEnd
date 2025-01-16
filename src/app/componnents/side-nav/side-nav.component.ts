
import { Component, inject, OnInit } from '@angular/core';
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
import { MultilangService } from '../../services/multilang.service';





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


    NgxPaginationModule,
    TranslateModule],
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.css'
})
export class SideNavComponent implements OnInit {

  //traduction
  multilangService = inject(MultilangService);
  toogleLanguage(language: string): void {
    if (this.multilangService.languageSignal() !== language) {
      this.multilangService.updateLanguage(language);
      console.log('language changed to', language);

    }
  }
  getLanguageIconClass(language: string): string {
    switch (language) {
      case 'en': return 'flag-icon flag-icon-gb';  // Drapeau du Royaume-Uni
      case 'fr': return 'flag-icon flag-icon-fr';  // Drapeau de la France
      case 'ru': return 'flag-icon flag-icon-ru';  // Drapeau de la Russie
      case 'es': return 'flag-icon flag-icon-es';  // Drapeau de l'Espagne
      default: return 'flag-icon flag-icon-gb';    // Par défaut : Royaume-Uni
    }
  }
  getLanguageName(language: string): string {
    switch (language) {
      case 'en':
        return 'English';
      case "fr":
        return "Francais";
      case "es":
        return "Spanish";
      case "ru":
        return "Russian";
      default:
        return "English";
    }
  }
  // traduction fin
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

    this.loadUserProfile();
    this.loadcotisations();
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
