import { Component } from '@angular/core';
import { Membre } from '../../../models/membre';
import { MembreServiceService } from '../membre-service.service';
import { LoadingComponent } from '../../../components/loading/loading.component';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-index-membre',
  standalone: true,
  imports: [LoadingComponent,RouterModule, RouterLink, CommonModule,],
  templateUrl: './index-membre.component.html',
  styleUrl: './index-membre.component.css'
})
export class IndexMembreComponent {
  membre: Membre[]=[];
    // en voyer le loading
    isLoading:boolean = true;

  constructor(public membreService: MembreServiceService,private router: Router){}

  navigateToForm() {
    this.router.navigate(['/nouveau-membre']);
  }
  navigateToFormEdit(){
    this.router.navigate(['/modifier-membre']);
  }

   // Méthode de confirmation avant la suppression
   confirmDelete(id: number) {
    const confirmed = confirm("Êtes-vous sûr de vouloir supprimer cet élément ?");
    if (confirmed) {
      this.deletePersonnel(id);
    }
  }

  // Suppression de la personne avec l'ID donné
  deletePersonnel(id: number) {
    // Vous pouvez appeler ici votre service pour la suppression, par exemple :
    // this.personnelService.deletePersonnel(id).subscribe(response => { ... });
    console.log('Suppression confirmée pour l\'ID:', id);
    // Redirection ou autre logique après la suppression
  }
  
  ngOnInit(): void{
    this.membreService.getAll().subscribe(
      (data:Membre[])=>{
        this.membre = data;
        console.log(this.membre);

      },
      error => {
        console.error('Error fetching project', error);
      }
  )
  }

    /**
   * Write code on Method
   *
   * @return response()
   */
    deletePost(id:number){
      this.membreService.delete(id).subscribe(res => {
           this.membre = this.membre.filter(item => item.id !== id);
          //  console.log('activites deleted successfully!');
           alert("projt deleted successfully!")
      })
    }
}
