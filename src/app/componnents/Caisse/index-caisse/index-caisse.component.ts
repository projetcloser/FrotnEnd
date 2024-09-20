import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-index-caisse',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './index-caisse.component.html',
  styleUrl: './index-caisse.component.css'
})
export class IndexCaisseComponent {
  constructor(private router: Router) {}
  navigateToForm() {
    this.router.navigate(['/nouvelle-caisse']);
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
