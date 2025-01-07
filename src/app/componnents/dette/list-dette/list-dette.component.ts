import { Component, OnInit } from '@angular/core';
import { Dette } from '../model/dette';
import { DetteServiceService } from '../dette-service.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Membre } from '../../../models/membre';
import { MembreServiceService } from '../../membre/membre-service.service';
import { Payment } from '../../attestation/nonPaye/payer/payment';
import { NonPayeService } from '../../attestation/nonPaye/non-paye.service';

@Component({
  selector: 'app-list-dette',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,CommonModule,FormsModule,RouterModule],
  templateUrl: './list-dette.component.html',
  styleUrl: './list-dette.component.css'
})
export class ListDetteComponent implements OnInit {
  dettes: Dette[] = [];
  filteredDettes: Dette[] = [];
  membres: Membre[] = [];
  searchTerm: string = '';

  constructor(private detteService: DetteServiceService, private membreService: MembreServiceService, private router: Router
    ,private attestationService: NonPayeService
  ) {}

  ngOnInit(): void {
    this.loadDettes();
    this.loadMembres();
  }

  loadDettes(): void {
    this.detteService.getDettes().subscribe(data => {
      this.dettes = data;
      this.filteredDettes = data; // Initialisation du tableau filtré
    });
  }


  loadMembres(): void {
    this.membreService.getAll().subscribe(data => {
      this.membres = data;
    });
  }

  getMembreNom(membreId: number): string {
    const membre = this.membres.find(m => m.id === membreId);
    return membre ? `${membre.firstname} ` : 'Inconnu';
  }

  getMemberUserName(membreId: number): string {
    const membre = this.membres.find(m => m.id === membreId);
    return membre ? `${membre.lastname}` : 'Inconnu';
  }

  filterDettes(): void {
    this.filteredDettes = this.dettes.filter(dette =>
      this.getMembreNom(dette.membre_id).toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      dette.montant.toString().includes(this.searchTerm)
    );
  }

  viewDetails(id: number): void {
    this.router.navigate(['/Closer/dettes/details', id]);
  }

  editDette(id: number): void {
    this.router.navigate(['/Closer/dettes/edit', id]);
  }

  deleteDette(id: number): void {
    this.detteService.deleteDette(id).subscribe(() => {
      this.loadDettes();
    });
  }

    payer(dette: any): void {
      const payment: Payment = {
        id: 0, // ou une valeur par défaut
        transaction_id:dette.id,
        member_id: dette.member_id,
        customer_name: this.getMembreNom(dette.member_id),
        customer_surname: this.getMemberUserName(dette.member_id), // Renseignez si applicable
        amount: dette.montant, // Assurez-vous que l'objet `item` contient cette information
        description: 'Paiement Dettes', // Description par défaut
        currency: 'XAF', // Exemple : devise utilisée
        created_at: new Date()
      };

      this.attestationService.payer(payment).subscribe(
        (response: any) => {
          if (response && response.data && response.data.payment_url) {
            // Redirection vers l'URL de paiement
            window.open(response.data.payment_url, '_blank');
          } else {
            console.error('Erreur lors de la génération du lien de paiement', response);
          }
        },
        (error) => {
          console.error('Erreur lors du paiement', error);
        }
      );
    }


}
