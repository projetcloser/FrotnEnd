import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Evenement } from '../evenement';
import { EvenementService } from '../evenement.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-index-evenement',
  standalone: true,
  imports: [CommonModule,
    RouterModule,ReactiveFormsModule,FormsModule],
  templateUrl: './index-evenement.component.html',
  styleUrl: './index-evenement.component.css'
})
export class IndexEvenementComponent {
  evenements: Evenement[] = [];

  constructor(private evenementService: EvenementService,private router:Router) {}

  ngOnInit(): void {
    this.loadEvenements();
  }

  loadEvenements() {
    this.evenementService.getEvenements().subscribe((data: Evenement[]) => {
      this.evenements = data;
    });
  }

  deleteEvenement(id: number) {
    this.evenementService.deleteEvenement(id).subscribe(() => {
      this.loadEvenements();
    });
  }

  navigateToForm() {
    this.router.navigate(['/Closer/nouveau-evenement']);
  }

  navigateToFormEdit() {
    this.router.navigate(['/Closer/modifier-evenement']);
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
