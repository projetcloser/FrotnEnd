import { Component } from '@angular/core';
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

    NgxPaginationModule],
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.css'
})
export class SideNavComponent {

  routes: Array<any> = routes
  constructor(private authService: AuthService) { }

  logout(): void {
    this.authService.logout();
  }
}
