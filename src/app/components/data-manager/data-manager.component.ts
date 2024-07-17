import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { routes } from '../../helpers/routes';
import { actions } from '../../helpers/actions';
import { formateToCamelcase } from '../../helpers/util';
import { EntityService } from '../../services/entity.service';

@Component({
  selector: 'app-data-manager',
  standalone: true,
  imports: [],
  templateUrl: './data-manager.component.html',
  styleUrl: './data-manager.component.css'
})
export class DataManagerComponent {
  entity:any;
  entityId:any;
  action:any;


  routes: Array<any> = routes
  actions: Array<String> = actions

  pageName:any;

  constructor(private route:ActivatedRoute, private router:Router, private entityService: EntityService){}
  ngOnInit(){
    console.log(this.route.snapshot.url);
    const urls = this.route.snapshot.url
    if(urls.length < 3){
      this.router.navigate(["/error"])
    }
    this.entity = urls[0]?.path
    this.entityId = urls[1].path
    this.action = urls[0].path

    const isEntityExist = routes.filter((route: any)=> route.path === "/"+this.entity)
    if(!isEntityExist || !isEntityExist[0]){
      this.router.navigate(["/error"])
    }
    if(this.actions.includes(this.action)){
      this.router.navigate(["/error"])
    }
    // a ce niveau toutes est bon

  
    // ceci nous permmet de recuperer et d'afficher le titre de la page sur le fichier html
   const routeObject:any = this.routes.filter(route =>route.path === "/"+this.entity)
    if(routeObject[0]){
      this.pageName =formateToCamelcase(this.action)+" "+ routeObject[0]?.single
    }

    this.getDataById()  
  }

  getDataById(){
    this.entityService.getDataById(this.entity, this.entityId).subscribe({
      next:(value: any)=>{
        console.log(value);
        
      },
      error: (error: any)=>{
        console.log(error);
      }
    })
  }
}
