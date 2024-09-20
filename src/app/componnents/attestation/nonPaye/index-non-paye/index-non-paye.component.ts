import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-index-non-paye',
  standalone: true,
  imports: [],
  templateUrl: './index-non-paye.component.html',
  styleUrl: './index-non-paye.component.css'
})
export class IndexNonPayeComponent {
  constructor(private router: Router) {}

  navigateToForm() {
    this.router.navigate(['/nouvelle-attestation-non_paye']);
  }

  navigateToFormEdit() {
    this.router.navigate(['/modifier-attestation-non_paye']);
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
