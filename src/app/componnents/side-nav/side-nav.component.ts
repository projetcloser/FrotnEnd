
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
  toogleLanguage(language: string):void{
    if(this.multilangService.languageSignal() !== language){
      this.multilangService.updateLanguage(language);
      console.log('language changed to', language);
      
    }
  }
  getLanguageIconClass(language: string): string{
    switch (language) {
      case 'en':
        return 'fi fi-us';
      case "fr":
        return "fi fi-fr";
      case "es":
        return "fi fi-es";
      case "ru":
        return "fi fi-ru";
      default:
        return "fi fi-fr";
    }
  }
  getLanguageName(language:string): string{
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


  routes: Array<any> = routes
  constructor(private authService: AuthService, private router: Router) { }
  // ,private translate: TranslateService)

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login'])
  }

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
