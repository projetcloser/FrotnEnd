import { Component } from '@angular/core';
import { Amende } from '../model/amende';
import { AmendeServiceService } from '../amende-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MembreServiceService } from '../../membre/membre-service.service';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../components/auth/auth.service';

@Component({
  selector: 'app-list-amende',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule,RouterModule],
  templateUrl: './list-amende.component.html',
  styleUrl: './list-amende.component.css'
})
export class ListAmendeComponent {
  amendes: any[] = [];
  membres: any[] = []; // Liste des membres
  user: any = {};

  constructor(
    private amendeService: AmendeServiceService,
    private membreService: MembreServiceService,   // Injecter le service des membres
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadMembres();
    this.loadAmendes();
  }

  loadMembres() {
    this.membreService.getAll().subscribe(data => {
      this.membres = data;
    });
  }

  loadAmendes() {
    this.amendeService.getAmendes().subscribe(data => {
      this.amendes = data;
    });
    this.loadUserProfile();
  }

  getMembreName(membreId: number): string {
    const membre = this.membres.find(m => m.id === membreId);
    return membre ? membre.firstname : 'Inconnu'; // Remplacez 'name' par le champ approprié dans votre modèle
  }

  deleteAmende(id: number) {
    this.amendeService.deleteAmende(id).subscribe(() => {
      this.amendes = this.amendes.filter(item => item.id !== id);
        //  console.log('activites deleted successfully!');
         alert("amendes deleted successfully!")
    });
  }

  loadUserProfile(): void {
    this.authService.getUserProfile().subscribe(
      (response: any) => {
        this.user = response;
        console.log('Utilisateur connecté:', this.user);  // Vérifie les données ici

      },
      (error) => {
        console.error('Erreur lors de la récupération du profil utilisateur:', error);
      }
    );
  }

}
