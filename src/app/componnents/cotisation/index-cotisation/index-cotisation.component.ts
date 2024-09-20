import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PaginationComponent } from "../../../components/pagination/pagination.component";

@Component({
  selector: 'app-index-cotisation',
  standalone: true,
  imports: [PaginationComponent],
  templateUrl: './index-cotisation.component.html',
  styleUrl: './index-cotisation.component.css'
})
export class IndexCotisationComponent {

  constructor(private router: Router) {}

  navigateToForm() {
    this.router.navigate(['/nouvelle-cotisation']);
  }

  navigateToFormEdit() {
    this.router.navigate(['/modifier-cotisation']);
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
