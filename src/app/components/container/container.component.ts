import { EntityService } from './../../services/entity.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterModule } from '@angular/router';
import { LoadingComponent } from "../loading/loading.component";
import { getEntityPorperties } from '../../helpers/helpers';
import { FormatNamePipe } from '../../pipes/format-name.pipe';
import { routes } from '../../helpers/routes';
import { PaginationComponent } from "../pagination/pagination.component";

@Component({
  selector: 'app-container',
  standalone: true,
  imports: [RouterModule, RouterLink, CommonModule, LoadingComponent, FormatNamePipe, PaginationComponent],
  templateUrl: './container.component.html',
  styleUrl: './container.component.css'
})
export class ContainerComponent {
  // pour recuperer le path et l'envoyer sur le html
  pagePath: string =""
  // recuperation des donnees a travers le service
  datas:any;
  // en voyer le loading
  isLoading:boolean = true;
  // pour stocker les champ header du tableau
  entityNames: Array<String> = [];

  // routes recuper depuis le helper
  routes: Array<any> = routes
  pageName: String = ""

  // variable pour la pagination
  pageNumber: Number = 1
  pageLimit: Number = 10
  constructor(private route:ActivatedRoute,
    private entityService:EntityService
  ){}

  ngOnInit(){
    
    this.initCom()

    // recuperation des donner depuis le service
    // console.log({path: this.route.snapshot.url[0]?.path});
    this.entityService.getDatasByPage(this.pagePath, this.pageNumber,this.pageLimit).subscribe({
      next:(data:any)=>{
        // dans la consle on voit que issucces c'est quand la requette a reussi et
        // result c'est la variable qui les data recuperer par le service
        const{ isSuccess, results} = data
        if (isSuccess && results){
          this.isLoading = false
           console.log(data);
           this.datas = results
        }else{
          //gestion des erruer
        }
      },
      error:(error:any)=>{
        //gestion des erruer
        console.log(error);

      }
    })

  }
  //ca ete creer depuis la page html
  getValue(data:any,name:String){
    const index: any = name
    return data[index]
  }

  //methode permettant d'initialiser les composent (routes et components)
  initCom(){
    // recuperation de l'url de chaque page pour le transmettre lors de l'injection de service
    this.pagePath = this.route.snapshot.url[0]?.path ||'membre'

    // ceci nous permmet de recuperer et d'afficher le titre de la page sur le fichier html
   const routeObject:any = this.routes.filter(route =>route.path === "/"+this.pagePath)
    if(routeObject[0]){
      this.pageName = routeObject[0]?.name
    }

    // ici on recupere le helper creer pour afficher les tableau avec chacun son header propre
     this.entityNames = getEntityPorperties(this.pagePath)
    // console.log(entityNames);

  }
}
