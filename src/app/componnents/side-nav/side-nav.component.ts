import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../components/auth/auth.service';
import { RouterLink, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';
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
export class SideNavComponent implements OnInit{
  currentLang = 'fr'; // Langue par défaut
  user: any = {};

  routes: Array<any> = routes
  constructor(private authService: AuthService,) { }
  // ,private translate: TranslateService)

  logout(): void {
    this.authService.logout();
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
  }


  changeLanguage(lang: string): void {
    // this.translate.use(lang);
  }

  loadUserProfile(): void {
    // this.authService.getUserProfile().subscribe(
    //     (response: any) => {
    //       this.user = response;
    //       console.log('Utilisateur connecté:', this.user);  // Vérifie les données ici

    //     },
    //     (error) => {
    //         console.error('Erreur lors de la récupération du profil utilisateur:', error);
    //     }
    // );

    this.authService.getUserProfile().subscribe(
      (response: any) => {

        this.user = response.user.name;
        
      },
      (error) => {
        console.error('Erreur lors de la récupération du profil utilisateur:', error);
      }
  );
}


}
