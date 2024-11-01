import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { PosteService } from '../poste.service';

@Component({
  selector: 'app-index-poste',
  standalone: true,
  imports: [FormsModule,
    CommonModule,ReactiveFormsModule,RouterModule],
  templateUrl: './index-poste.component.html',
  styleUrl: './index-poste.component.css'
})
export class IndexPosteComponent {
  groups: any[] = [];
  membres: any[] = []; // Liste des membres

  constructor(
    private amendeService: PosteService,
    // private membreService: MembreServiceService   // Injecter le service des membres
  ) {}

  ngOnInit(): void {
    // this.loadMembres();
    this.loadAmendes();
  }

  // loadMembres() {
  //   this.membreService.getAll().subscribe(data => {
  //     this.membres = data;
  //   });
  // }

  loadAmendes() {
    this.amendeService.getAmendes().subscribe(data => {
      this.groups = data;
    });
  }

  getMembreName(membreId: number): string {
    const membre = this.membres.find(m => m.id === membreId);
    return membre ? membre.firstname : 'Inconnu'; // Remplacez 'name' par le champ approprié dans votre modèle
  }

  deleteAmende(id: number) {
    this.amendeService.deleteAmende(id).subscribe(() => {
      this.loadAmendes();
    });
  }
}
