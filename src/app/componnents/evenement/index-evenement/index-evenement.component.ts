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
  loading = false;


  constructor(private evenementService: EvenementService,private router:Router) {}

  ngOnInit(): void {
    this.loadEvenements();
  }

  loadEvenements() {
    this.evenementService.getEvenements().subscribe((data: Evenement[]) => {
      this.evenements = data;
    });
  }

  incrementParticipant(id: number) {
    this.evenementService.incrementParticipant(id).subscribe(() => {
      this.loadEvenements();

      
    });
  }


  decrementParticipant(id: number) {
    if (this.loading) return; // Ignore si un appel est déjà en cours
    this.loading = true;

    this.evenementService.decrementParticipant(id).subscribe(
      (updatedEvenement) => {
        this.evenements = this.evenements.map((event) =>
          event.id === updatedEvenement.id ? updatedEvenement : event
        );
        this.loading = false;
      },
      (error) => {
        console.error("Erreur lors de l'annulation de participation :", error);
        this.loading = false;
      }
    );
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
    this.evenementService.deleteEvenement(id).subscribe(res => {
      this.evenements = this.evenements.filter(item => item.id !== id);
     //  console.log('activites deleted successfully!');
      alert("evenements deleted successfully!")
 })
  }
}
