import { routes } from './helpers/routes';

import { ContainerModule } from './components/container/container.module';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';
import { MembreModule } from './componnents/membre/membre/membre.module';
import { CaisseModule } from './componnents/Caisse/caisse/caisse.module';
import { EntrepriseModule } from './componnents/entreprise/entreprise/entreprise.module';
import { VilleModule } from './componnents/ville/ville/ville.module';
import { QuartierModule } from './componnents/quartier/quartier/quartier.module';
import { PaysModule } from './componnents/pays/pays/pays.module';
import { CotisationModule } from './componnents/cotisation/cotisation/cotisation.module';

import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-root',
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

    NgxPaginationModule
  ],

  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'FrontEnd';

  routes: Array<any> = routes

  constructor(){

  }

  ngOnInit(){

  }
}
