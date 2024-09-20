import { Component } from '@angular/core';

@Component({
  selector: 'app-index-ville',
  standalone: true,
  imports: [],
  templateUrl: './index-ville.component.html',
  styleUrl: './index-ville.component.css'
})
export class IndexVilleComponent {

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
