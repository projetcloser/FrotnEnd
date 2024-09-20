import { Component } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-indexpersonnel',
  standalone: true,
  imports: [FormsModule,
    CommonModule,ReactiveFormsModule
  ],
  templateUrl: './indexpersonnel.component.html',
  styleUrl: './indexpersonnel.component.css'
})
export class IndexpersonnelComponent {

  constructor(private router: Router) {}

  navigateToForm() {
    this.router.navigate(['/nouvelle-personne']);
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

  currentStep: number = 1;

  nextStep() {
    if (this.currentStep < 4) {
      this.currentStep++;
    }
  }

  previousStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  submit() {
    // Logic for final submission
    console.log('Final submission');
  }

}
