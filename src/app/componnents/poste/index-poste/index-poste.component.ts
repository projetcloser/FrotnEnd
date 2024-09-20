import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-index-poste',
  standalone: true,
  imports: [FormsModule,
    CommonModule,ReactiveFormsModule],
  templateUrl: './index-poste.component.html',
  styleUrl: './index-poste.component.css'
})
export class IndexPosteComponent {
  constructor(private router: Router) {}

  navigateToForm() {
    this.router.navigate(['/nouveau-poste']);
  }

  navigateToFormEdit() {
    this.router.navigate(['/modifier-personne']);

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
