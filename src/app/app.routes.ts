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

export const routes: Routes = [
  {
    path: "",
    component:DashboardComponent
  },
  // personnels
  {
    path: "personnel",
    component:IndexpersonnelComponent
  },
  {
    path: "nouvelle-personne",
    component:PersonnelCreateComponent
  },

  // postulant
  {
    path: "postulant",
    component:IndexPostulantComponent
  },
  {
    path: "nouveau-postulant",
    component:CreatePostulantComponent
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
    path: "membre/edit/:id",
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
    path: "entreprise/edit/:id",
    component:EditEntrepriseComponent
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
  {
    path: "caisse",
    component:IndexCaisseComponent
  },
  {
    path: "entity/:id/:action",
    component:DataManagerComponent
  },
  // profession
  {
    path: "profession",
    component:IndexProfessionComponent
  },
  // poste
  {
    path: "poste",
    component:IndexPosteComponent
  },
  {
    path: "**",
    component:Error404Component
  },


];
