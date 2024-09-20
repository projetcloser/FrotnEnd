import { Component } from '@angular/core';

@Component({
  selector: 'app-index-quartier',
  standalone: true,
  imports: [],
  templateUrl: './index-quartier.component.html',
  styleUrl: './index-quartier.component.css'
})
export class IndexQuartierComponent {
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
