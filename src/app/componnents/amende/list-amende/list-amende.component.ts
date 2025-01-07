import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AmendeServiceService } from '../amende-service.service';
import { MembreServiceService } from '../../membre/membre-service.service';
import { AuthService } from '../../../components/auth/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PaginationComponent } from '../../../components/pagination/pagination.component';
import { PaginationService } from '../../../components/pagination.service';
import { NonPayeService } from '../../attestation/nonPaye/non-paye.service';
import { Payment } from '../../attestation/nonPaye/payer/payment';

declare var $: any; // Utiliser jQuery globalement

@Component({
  selector: 'app-list-amende',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule, PaginationComponent],
  templateUrl: './list-amende.component.html',
  styleUrl: './list-amende.component.css',
})
export class ListAmendeComponent implements OnInit
// , AfterViewInit
{
  amendes: any[] = [];
  membres: any[] = [];
  user: any = {};

  // pagination
  paginatedData: any[] = []; // Données de la page courante

  currentPage: number = 1;
  pageSize: number = 10;
  totalItems: number = 0;

  constructor(
    private amendeService: AmendeServiceService,
    private membreService: MembreServiceService,
    private authService: AuthService,
     private attestationService: NonPayeService,
    private paginationService: PaginationService

  ) { }

  ngOnInit(): void {
    this.loadMembres();
    this.loadAmendes();
  }

  // ngAfterViewInit(): void {
  //   // Initialisation de DataTables après chargement complet du composant
  //   setTimeout(() => {
  //     $('#amendesTable').DataTable({
  //       paging: true, // Pagination activée
  //       searching: true, // Filtrage activé
  //       lengthChange: true, // Option pour choisir le nombre de lignes
  //       pageLength: 5, // Nombre de lignes par défaut
  //       language: {
  //         search: 'Filtrer :',
  //         lengthMenu: 'Afficher _MENU_ enregistrements',
  //         info: 'Affichage de _START_ à _END_ sur _TOTAL_ enregistrements',
  //         paginate: {
  //           first: 'Premier',
  //           last: 'Dernier',
  //           next: 'Suivant',
  //           previous: 'Précédent',
  //         },
  //       },
  //     });
  //   }, 1000); // Délai pour assurer le chargement des données
  // }

  loadMembres() {
    this.membreService.getAll().subscribe((data) => {
      this.membres = data;
      // pagination
      this.totalItems = this.membres.length;
      this.updatePage();
    });
  }

  loadAmendes() {
    this.amendeService.getUserAmendes().subscribe((data) => {
      this.amendes = data;
    });
  }

  getMembreName(membreId: number): string {
    const membre = this.membres.find((m) => m.id === membreId);
    return membre ? membre.lastname : 'Inconnu';
  }
  getMemberUserName(membreId: number): string {
    const membre = this.membres.find((m) => m.id === membreId);
    return membre ? membre.lastname : 'Inconnu';
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
  // pagination

  updatePage(): void {
    this.paginatedData = this.paginationService.paginate(
      this.membres,
      this.currentPage,
      this.pageSize
    );
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.updatePage();
  }

  payer(amende: any): void {
    const payment: Payment = {
      id: 0, // ou une valeur par défaut
      transaction_id:amende.id,
      member_id: amende.member_id,
      customer_name: this.getMembreName(amende.member_id),
      customer_surname: this.getMemberUserName(amende.member_id), // Renseignez si applicable
      amount: amende.amount, // Assurez-vous que l'objet `item` contient cette information
      description: 'Paiement Ammende', // Description par défaut
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
