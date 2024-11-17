import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { NonPaye } from '../../nonPaye/non-paye';
import { Membre } from '../../../../models/membre';
import { Entreprise } from '../../../../models/entreprise';
import { NonPayeService } from '../../nonPaye/non-paye.service';
import { EntrepriseServiceService } from '../../../entreprise/entreprise-service.service';

@Component({
  selector: 'app-indexstatut',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule,RouterModule],
  templateUrl: './indexstatut.component.html',
  styleUrl: './indexstatut.component.css'
})
export class IndexstatutComponent {

  attestations: NonPaye[] = [];
  statusFilter = 2; // Filtre par défaut : non payé
  members:Membre[]=[];
  companies:Entreprise[]=[];
  constructor(private router: Router,private attestationService: NonPayeService,private entrepriseService:EntrepriseServiceService) {}

  ngOnInit(): void {
    // this.loadAttestations();
    this.loadAttestationsByStatus(this.statusFilter);
    this.getMemberALL();
    this.getCompanies();
  }

  loadAttestationsByStatus(status: number): void {
    this.attestationService.getAttestationsByStatus(status).subscribe(
      (data) => {
        this.attestations = data;
      },
      (error) => {
        console.error('Erreur lors du chargement des attestations', error);
      }
    );
  }

  // loadAttestations(): void {
  //   this.attestationService.getAttestations().subscribe(data => {
  //     this.attestations = data;
  //     console.log('info sur attestationentreprise', this.attestations);

  //   });
  // }



  deleteAttestation(id: number): void {
    this.attestationService.deleteAttestation(id).subscribe(() => {
      // this.loadAttestations();
      this.loadAttestationsByStatus(this.statusFilter);

    });
  }

  navigateToForm() {
    this.router.navigate(['/Closer/nouvelle-attestation-non_paye']);
  }

  navigateToFormEdit() {
    this.router.navigate(['/Closer/modifier-attestation-non_paye']);
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


  getCompanies():void{
    this.entrepriseService.getAll().subscribe(data =>{
        this.companies = data;
        console.log('info sur les companies ayant une attestation d\'esntreprise',this.companies);

    });
  }

  getCompaniesNames(idCompanies:number):string{
    const entreprises =this.companies.find(e =>e.id === idCompanies);
    return entreprises? entreprises.social_reason: 'Inconnue';
  }

  getMemberALL(): void {
    this.attestationService.getMember().subscribe(data => {
      this.members = data;
      console.log('info sur les membre attestation entreprise', this.members);

    });
  }

  getMemberName(countryId: number): string {
    const member = this.members.find(p => p.id === countryId);
    return member ? member.firstname : 'Inconnu';
  }

  getmemberMatricule(countryId: number){
    const member = this.members.find(p => p.id === countryId);
    return member ? member.matricule : 'Inconnu';
  }

  // Formater la date pour afficher seulement l'année
  formatDate(date: Date): string {
    return new Date(date).getFullYear().toString();
  }
}
