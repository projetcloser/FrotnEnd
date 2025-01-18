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
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-list-dette',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CommonModule, FormsModule, RouterModule,TranslateModule],
  templateUrl: './list-dette.component.html',
  styleUrl: './list-dette.component.css'
})
export class ListDetteComponent implements OnInit {
  dettes: Dette[] = [];
  dette: any[] = [];
  filteredDettes: Dette[] = [];
  membres: Membre[] = [];
  searchTerm: string = '';
  user: any; // Add this line to declare the user property
  private debtsurl = environment.apiUrl + 'debts';

  constructor(private detteService: DetteServiceService, private membreService: MembreServiceService, private router: Router
    , private attestationService: NonPayeService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.loadDettes();
    this.loadMembres();
  }


  loadDettes(): void {
    // this.detteService.getDettes().subscribe(data => {
    //   this.dettes = data;
    //   this.filteredDettes = data; // Initialisation du tableau filtré
    // });
    //l'ensemble des dettes ave http
    this.http.get(this.debtsurl).subscribe((response: any) => {
      this.dette = response;
      //this.filteredDettes = response; // Initialisation du tableau filtré
      console.log('Données du tableau de bord:', this.dette);
    });
  }


  // loadDettes(): void {
  //   // Étape 1 : Récupération du profil utilisateur
  //   this.authService.getUserProfile().subscribe(
  //     (response: any) => {
  //       this.user = response;
  //       console.log('Utilisateur connectée:', this.user);

  //       // Étape 2 : Assurez-vous que 'id_perso' existe avant de continuer
  //       const idPerso = this.user.perso?.id;
  //       const idRole = this.user.role?.id;
  //       if (!idPerso) {
  //         console.error("ID personnel non trouvé pour l'utilisateur.");
  //         return;
  //       }
  //       // Étape 3 : Requête pour les données du tableau de bord
  //       this.http.get(`${this.debtsurl}?id_perso=${idPerso}&id_role=${idRole}`).subscribe(
  //         (amendesResponse: any) => {
  //           this.dette = amendesResponse;

  //           console.log('Données du tableau de bord:', this.dette);
  //         },
  //         (error) => {
  //           console.error('Erreur lors de la récupération des données du tableau de bord:', error);
  //         }
  //       );
  //     },
  //     (error: any) => {
  //       console.error('Erreur lors de la récupération du profil utilisateur:', error);
  //     }
  //   );
  // }

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
      transaction_id: dette.id,
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
