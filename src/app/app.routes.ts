import { Routes } from '@angular/router';
import { ContainerComponent } from './components/container/container.component';
import { Error404Component } from './components/error404/error404.component';
import { DataManagerComponent } from './components/data-manager/data-manager.component';
import { IndexMembreComponent } from './componnents/membre/index-membre/index-membre.component';
import { IndexEntrepriseComponent } from './componnents/entreprise/index-entreprise/index-entreprise.component';
import { IndexPaysComponent } from './componnents/pays/index-pays/index-pays.component';
import { IndexVilleComponent } from './componnents/ville/index-ville/index-ville.component';
import { IndexQuartierComponent } from './componnents/quartier/index-quartier/index-quartier.component';
import { IndexCaisseComponent } from './componnents/Caisse/index-caisse/index-caisse.component';
import { CreateMembreComponent } from './componnents/membre/create-membre/create-membre.component';
import { EditMembreComponent } from './componnents/membre/edit-membre/edit-membre.component';
import { EditEntrepriseComponent } from './componnents/entreprise/edit-entreprise/edit-entreprise.component';
import { CreateEntrepriseComponent } from './componnents/entreprise/create-entreprise/create-entreprise.component';
import { CreatePaysComponent } from './componnents/pays/create-pays/create-pays.component';
import { EditPaysComponent } from './componnents/pays/edit-pays/edit-pays.component';
import { CreateVilleComponent } from './componnents/ville/create-ville/create-ville.component';
import { EditVilleComponent } from './componnents/ville/edit-ville/edit-ville.component';
import { EditQuartierComponent } from './componnents/quartier/edit-quartier/edit-quartier.component';
import { CreateQuartierComponent } from './componnents/quartier/create-quartier/create-quartier.component';
import { DashboardComponent } from './componnents/dashboard/dashboard.component';
import { IndexpersonnelComponent } from './componnents/personnel/indexpersonnel/indexpersonnel.component';
import { PersonnelCreateComponent } from './componnents/personnel/personnel-create/personnel-create.component';
import { IndexPostulantComponent } from './componnents/postulant/index-postulant/index-postulant.component';
import { CreatePostulantComponent } from './componnents/postulant/create-postulant/create-postulant.component';
import { IndexProfessionComponent } from './componnents/profession/index-profession/index-profession.component';
import { IndexPosteComponent } from './componnents/poste/index-poste/index-poste.component';
import { EditPostulantComponent } from './componnents/postulant/edit-postulant/edit-postulant.component';
import { CreateCaisseComponent } from './componnents/Caisse/create-caisse/create-caisse.component';
import { IndexEvenementComponent } from './componnents/evenement/index-evenement/index-evenement.component';
import { CreateEvenementComponent } from './componnents/evenement/create-evenement/create-evenement.component';
import { UpdateEvenementComponent } from './componnents/evenement/update-evenement/update-evenement.component';
import { IndexTresorerieComponent } from './componnents/tresoreries/index-tresorerie/index-tresorerie.component';
import { CreateTresorerieComponent } from './componnents/tresoreries/create-tresorerie/create-tresorerie.component';
import { UpdateTresorerieComponent } from './componnents/tresoreries/update-tresorerie/update-tresorerie.component';
import { IndexCachetComponent } from './componnents/cachet/index-cachet/index-cachet.component';
import { CreateCachetComponent } from './componnents/cachet/create-cachet/create-cachet.component';
import { UpdateCachetComponent } from './componnents/cachet/update-cachet/update-cachet.component';
import { IndexCotisationComponent } from './componnents/cotisation/index-cotisation/index-cotisation.component';
import { CreateCotisationComponent } from './componnents/cotisation/create-cotisation/create-cotisation.component';
import { UpdateCotisationComponent } from './componnents/cotisation/update-cotisation/update-cotisation.component';
import { IndexRequetteComponent } from './componnents/requette/index-requette/index-requette.component';
import { CreateRequetteComponent } from './componnents/requette/create-requette/create-requette.component';
import { UpdateRequetteComponent } from './componnents/requette/update-requette/update-requette.component';
import { IndexAttestPersonnelComponent } from './componnents/attestation/personnel/index-attest-personnel/index-attest-personnel.component';
import { CreateAttestPersonnelComponent } from './componnents/attestation/personnel/create-attest-personnel/create-attest-personnel.component';
import { UpdateAttestPersonnelComponent } from './componnents/attestation/personnel/update-attest-personnel/update-attest-personnel.component';
import { EditperssonnelComponent } from './componnents/personnel/editperssonnel/editperssonnel.component';
import { IndexEtudeComponent } from './componnents/etude/index-etude/index-etude.component';
import { CreateEtudeComponent } from './componnents/etude/create-etude/create-etude.component';

import { CreateNonPayeComponent } from './componnents/attestation/nonPaye/create-non-paye/create-non-paye.component';
import { IndexPayeComponent } from './componnents/attestation/paye/index-paye/index-paye.component';
import { CreatePayeComponent } from './componnents/attestation/paye/create-paye/create-paye.component';
import { IndexstatutComponent } from './componnents/attestation/statut-initiated/indexstatut/indexstatut.component';
import { CreatestatutComponent } from './componnents/attestation/statut-initiated/createstatut/createstatut.component';
import { IndexNonPayeComponent } from './componnents/attestation/nonPaye/index-non-paye/index-non-paye.component';
import { EditNonPayeComponent } from './componnents/attestation/nonPaye/edit-non-paye/edit-non-paye.component';
import { CreateProfessionComponent } from './componnents/profession/create-profession/create-profession.component';
import { CreatePosteComponent } from './componnents/poste/create-poste/create-poste.component';
import { DetailsComponent } from './componnents/personnel/details/details.component';
import { EditCaisseComponent } from './componnents/Caisse/edit-caisse/edit-caisse.component';
import { DetailsEntrepriseComponent } from './componnents/entreprise/details-entreprise/details-entreprise.component';
import { DetailsPostulantComponent } from './componnents/postulant/details-postulant/details-postulant.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { FpwComponent } from './components/auth/fpw/fpw.component';
import { AuthGuard } from './auth.guard';
import { EvenementDetailsComponent } from './componnents/evenement/evenement-details/evenement-details.component';
import { SideNavComponent } from './componnents/side-nav/side-nav.component';
import { ListAnnonceComponent } from './componnents/annonce/list-annonce/list-annonce.component';
import { CreateAnnonceComponent } from './componnents/annonce/create-annonce/create-annonce.component';
import { UpdateAnnonceComponent } from './componnents/annonce/update-annonce/update-annonce.component';
import { DetailsAnnonceComponent } from './componnents/annonce/details-annonce/details-annonce.component';
import { ListAmendeComponent } from './componnents/amende/list-amende/list-amende.component';
import { CreateAmendeComponent } from './componnents/amende/create-amende/create-amende.component';
import { UpdateAmendeComponent } from './componnents/amende/update-amende/update-amende.component';
import { DetailsAmendeComponent } from './componnents/amende/details-amende/details-amende.component';
import { ListDetteComponent } from './componnents/dette/list-dette/list-dette.component';
import { CreateDetteComponent } from './componnents/dette/create-dette/create-dette.component';
import { UpdateDetteComponent } from './componnents/dette/update-dette/update-dette.component';
import { DetailsDetteComponent } from './componnents/dette/details-dette/details-dette.component';




export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'register', component: RegisterComponent },
  { path: 'forgot-password', component: FpwComponent },

  {path:'Closer',component:SideNavComponent,
    children:[
       {
    path: "dashboard",
    component:DashboardComponent
  },
  // anonce
  { path: 'annonces', component: ListAnnonceComponent },
  { path: 'annonces/new', component: CreateAnnonceComponent },
  { path: 'annonces/edit/:id', component: UpdateAnnonceComponent },
  { path: 'annonces/details/:id', component: DetailsAnnonceComponent },
  // amende
  { path: 'amendes', component: ListAmendeComponent },
  { path: 'amendes/new', component: CreateAmendeComponent },
  { path: 'amendes/edit/:id', component: UpdateAmendeComponent },
  { path: 'amendes/details/:id', component: DetailsAmendeComponent },

  // dettes
  { path: 'dettes', component: ListDetteComponent },
  { path: 'dettes/new', component: CreateDetteComponent },
  { path: 'dettes/edit/:id', component: UpdateDetteComponent },
  { path: 'dettes/details/:id', component: DetailsDetteComponent },
  // personnels
  {
    path: "personnel",
    component:IndexpersonnelComponent
  },
  {
    path: "nouvelle-personne",
    component:PersonnelCreateComponent
  },
  {
    path: "modifier-personnel/:id",
    component:EditperssonnelComponent
  },
  { path: 'personnel-details/:id', component: DetailsComponent },

  // postulant
  {
    path: "postulant",
    component:IndexPostulantComponent
  },
  {
    path: "nouveau-postulant",
    component:CreatePostulantComponent
  },
  {
    path: "modifier-postulant/:id",
    component:EditPostulantComponent
  },
  {
    path: "postulant/:id",
    component:DetailsPostulantComponent
  },
  // membre
  {
    path: "membre",
    component:IndexMembreComponent
  },
  {
    path: "nouveau-membre",
    component:CreateMembreComponent
  },
  {
    // path: "membre/edit/:id",
    path:'membre/edit/:id',
    component:EditMembreComponent
  },
  // entreprise
  {
    path: "entreprise",
    component:IndexEntrepriseComponent
  },
  {
    path: "entreprise/create",
    component:CreateEntrepriseComponent
  },
  {
    path: "modifier-entreprise/:id",
    component:EditEntrepriseComponent
  },
  {
    path: "entreprise-details/:id",
    component:DetailsEntrepriseComponent
  },
   {
    path: "entreprise",
    component:IndexEntrepriseComponent
  },
  // pays
  {
    path: "pays",
    component:IndexPaysComponent
  },
  {
    path: "pays/create",
    component:CreatePaysComponent
  },
  {
    path: "pays/edit/:id",
    component:EditPaysComponent
  },
  // ville
  {
    path: "ville",
    component:IndexVilleComponent
  },
  {
    path: "ville/create",
    component:CreateVilleComponent
  },
  {
    path: "ville/edit/:id",
    component:EditVilleComponent
  },
  // quartier
  {
    path: "quartier",
    component:IndexQuartierComponent
  },
  {
    path: "quartier/create",
    component:CreateQuartierComponent
  },
  {
    path: "quartier/edit/:id",
    component:EditQuartierComponent
  },
  // caisse
  {
    path: "caisse",
    component:IndexCaisseComponent
  },
  {
    path: "nouvelle-caisse",
    component:CreateCaisseComponent
  },
  { path: 'caisse/edit/:id', component: EditCaisseComponent },
  {
    path: "entity/:id/:action",
    component:DataManagerComponent
  },
  // profession
  {
    path: "profession",
    component:IndexProfessionComponent
  },
  {
    path: "nouveau-profession",
    component:CreateProfessionComponent
  },
  // poste
  {
    path: "poste",
    component:IndexPosteComponent
  },
  {
    path: "nouveau-poste",
    component:CreatePosteComponent
  },
    // evenements
    {
      path: "evenement",
      component:IndexEvenementComponent
    },
    {
      path: "nouveau-evenement",
      component:CreateEvenementComponent
    },
    {
      path: 'evenement/edit/:id',
      component:UpdateEvenementComponent
    },
    { path: 'evenement/details/:id', component: EvenementDetailsComponent },
    // tresorerie
    {
      path: "tresorerie",
      component:IndexTresorerieComponent
    },
    {
      path: "nouveau-transfert",
      component:CreateTresorerieComponent
    },
    {
      path: "modifier-tresorerie",
      component:UpdateTresorerieComponent
    },
     // cachet
     {
      path: "cachet",
      component:IndexCachetComponent
    },
    {
      path: "nouveau-cachet",
      component:CreateCachetComponent
    },
    {
      path: "modifier-cachet",
      component:UpdateCachetComponent
    },
    // cotisation
    {
      path: "cotisation",
      component:IndexCotisationComponent
    },
    {
      path: "nouvelle-cotisation",
      component:CreateCotisationComponent
    },
    {
      path: "modifier-cotisation/:id",
      component:UpdateCotisationComponent
    },
     // requette
     {
      path: "requette",
      component:IndexRequetteComponent
    },
    {
      path: "nouvelle-demande",
      component:CreateRequetteComponent
    },
    {
      path: "modifier-demande",
      component:UpdateRequetteComponent
    },
      // attestPersonnel
      {
        path: "attestPersonnel",
        component:IndexAttestPersonnelComponent
      },
      {
        path: "nouveau-attestPersonnel",
        component:CreateAttestPersonnelComponent
      },
      {
        path: 'modifier-statut/:id',
        component:UpdateAttestPersonnelComponent
      },

      // frais d'etude
      {
        path: "frais-etude",
        component:IndexEtudeComponent
      },
      {
        path: "nouvelle-etude",
        component:CreateEtudeComponent
      },

      // attestation non paye
      {
        path: "attestation-non_paye",
        component:IndexNonPayeComponent
      },
      {
        path: "nouvelle-attestation-non_paye",
        component:CreateNonPayeComponent
      },
      {
        path: "modifier-attestation-non_paye",
        component:EditNonPayeComponent
      },
      // attestation  paye
      {
        path: "attestation-paye",
        component:IndexPayeComponent
      },
      {
        path: "nouvelle-attestation_paye",
        component:CreatePayeComponent
      },
      // attestation  initiated
      {
        path: "attestation-initied",
        component:IndexstatutComponent
      },
      {
        path: "nouvelle-attestation_initiedude",
        component:CreatestatutComponent
      },

  {
    path: "**",
    component:Error404Component
  },
    ]
  }



];
