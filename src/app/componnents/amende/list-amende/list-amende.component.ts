import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AmendeServiceService } from '../amende-service.service';
import { MembreServiceService } from '../../membre/membre-service.service';
import { AuthService } from '../../../components/auth/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

declare var $: any; // Utiliser jQuery globalement

@Component({
  selector: 'app-list-amende',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './list-amende.component.html',
  styleUrl: './list-amende.component.css',
})
export class ListAmendeComponent implements OnInit, AfterViewInit {
  amendes: any[] = [];
  membres: any[] = [];
  user: any = {};

  constructor(
    private amendeService: AmendeServiceService,
    private membreService: MembreServiceService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.loadMembres();
    this.loadAmendes();
  }

  ngAfterViewInit(): void {
    // Initialisation de DataTables après chargement complet du composant
    setTimeout(() => {
      $('#amendesTable').DataTable({
        paging: true, // Pagination activée
        searching: true, // Filtrage activé
        lengthChange: true, // Option pour choisir le nombre de lignes
        pageLength: 5, // Nombre de lignes par défaut
        language: {
          search: 'Filtrer :',
          lengthMenu: 'Afficher _MENU_ enregistrements',
          info: 'Affichage de _START_ à _END_ sur _TOTAL_ enregistrements',
          paginate: {
            first: 'Premier',
            last: 'Dernier',
            next: 'Suivant',
            previous: 'Précédent',
          },
        },
      });
    }, 1000); // Délai pour assurer le chargement des données
  }

  loadMembres() {
    this.membreService.getAll().subscribe((data) => {
      this.membres = data;
    });
  }

  loadAmendes() {
    this.amendeService.getAmendes().subscribe((data) => {
      this.amendes = data;
    });
  }

  getMembreName(membreId: number): string {
    const membre = this.membres.find((m) => m.id === membreId);
    return membre ? membre.firstname : 'Inconnu';
  }

  deleteAmende(id: number) {
    this.amendeService.deleteAmende(id).subscribe(() => {
      this.amendes = this.amendes.filter((item) => item.id !== id);
      alert('Amende supprimée avec succès!');
    });
  }

  loadUserProfile(): void {
    this.authService.getUserProfile().subscribe(
      (response: any) => {
        this.user = response;
      },
      (error) => {
        console.error('Erreur lors de la récupération du profil utilisateur:', error);
      }
    );
  }
}
