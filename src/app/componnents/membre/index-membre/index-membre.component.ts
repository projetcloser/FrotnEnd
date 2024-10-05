import { Component, OnInit } from '@angular/core';
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
export class IndexMembreComponent implements OnInit{
  membres: Membre[]=[];
    // en voyer le loading
    isLoading:boolean = true;

  constructor(public membreService: MembreServiceService,private router: Router){}

  navigateToForm() {
    this.router.navigate(['/nouveau-membre']);
  }
  navigateToFormEdit(id: number): void{
    this.router.navigate(['/membre/edit', id]);
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
    this.getmember();
  }

  getmember():void{
    this.membreService.getAll().subscribe(
      (data) => {
        console.log(data);

        this.membres = data; // Assigner directement les données au tableau de villes
      },
      error => {
        console.error('Erreur lors de la récupération des membres :', error);
      }

  )
  }
    /**
   * Write code on Method
   *
   * @return response()
   */
    deleteMembre(id: number): void {
      this.membreService.delete(id).subscribe(() => {
        this.membres = this.membres.filter(m => m.id !== id);
      });
    }
}
