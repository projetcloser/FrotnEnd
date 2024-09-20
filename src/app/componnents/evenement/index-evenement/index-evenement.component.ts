import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-index-evenement',
  standalone: true,
  imports: [],
  templateUrl: './index-evenement.component.html',
  styleUrl: './index-evenement.component.css'
})
export class IndexEvenementComponent {
  constructor(private router: Router) {}

  navigateToForm() {
    this.router.navigate(['/nouveau-evenement']);
  }

  navigateToFormEdit() {
    this.router.navigate(['/modifier-evenement']);
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
