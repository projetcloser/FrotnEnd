import { Component } from '@angular/core';
import { LoadingComponent } from '../../../components/loading/loading.component';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Entreprise } from '../../../models/entreprise';
import { EntrepriseServiceService } from '../entreprise-service.service';

@Component({
  selector: 'app-index-entreprise',
  standalone: true,
  imports: [LoadingComponent,RouterModule, RouterLink, CommonModule,],
  templateUrl: './index-entreprise.component.html',
  styleUrl: './index-entreprise.component.css'
})
export class IndexEntrepriseComponent {
  entreprise: Entreprise[]=[];
  // en voyer le loading
  isLoading:boolean = true;

constructor(public entrepriseService: EntrepriseServiceService,private router: Router){}

ngOnInit(): void{
  this.entrepriseService.getAll().subscribe(
    (data:Entreprise[])=>{
      this.entreprise = data;
      console.log(this.entreprise);

    },
    error => {
      console.error('Error fetching compagnies', error);
    }
)
}

  /**
 * Write code on Method
 *
 * @return response()
 */
  deletePost(id:number){
    this.entrepriseService.delete(id).subscribe(res => {
         this.entreprise = this.entreprise.filter(item => item.id !== id);
        //  console.log('activites deleted successfully!');
         alert("entreprise deleted successfully!")
    })
  }

  navigateToFormEdit() {
    this.router.navigate(['/modifier-entreprise']);
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
}
