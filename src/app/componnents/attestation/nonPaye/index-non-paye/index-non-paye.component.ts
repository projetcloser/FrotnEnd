import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { NonPayeService } from '../non-paye.service';
import { NonPaye } from '../non-paye';
import { Membre } from '../../../../models/membre';
import { Entreprise } from '../../../../models/entreprise';
import { EntrepriseServiceService } from '../../../entreprise/entreprise-service.service';
import { PaginationComponent } from '../../../../components/pagination/pagination.component';
import { PaginationService } from '../../../../components/pagination.service';

@Component({
  selector: 'app-index-non-paye',
  standalone: true,

  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule, PaginationComponent],

  templateUrl: './index-non-paye.component.html',
  styleUrl: './index-non-paye.component.css'
})
export class IndexNonPayeComponent {
  attestations: NonPaye[] = [];
  statusFilter = 1; // Filtre par défaut : non payé
  members: Membre[] = [];
  companies: Entreprise[] = [];

  // seracc back
  searchForm: FormGroup;

  // pagination
  paginatedData: any[] = []; // Données de la page courante

  currentPage: number = 1;
  pageSize: number = 10;
  totalItems: number = 0;

  constructor(private fb: FormBuilder, private router: Router,
    private attestationService: NonPayeService, private entrepriseService: EntrepriseServiceService,
    private paginationService: PaginationService) {

    this.searchForm = this.fb.group({
      keyword: [''],
      company_id: [''],
      year: [''],
      motif: [''],
      member_id: [''],
    });
  }

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
        // pagination
        this.totalItems = this.attestations.length;
        this.updatePage();
      },
      (error) => {
        console.error('Erreur lors du chargement des attestations', error);
      }
    );
  }
  onSearch() {
    const filters = this.searchForm.value;
    this.attestationService.searchStaff(filters).subscribe((data) => {
      this.attestations = data;
    });
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
      console.log('Suppression confirmée pour l\'ID:', id);

    });
  }

  navigateToForm() {
    this.router.navigate(['/Closer/nouvelle-attestation-non_paye']);
  }

  navigateToFormEdit() {
    this.router.navigate(['/Closer/modifier-attestation-non_paye,']);
  }

  // Méthode de confirmation avant la suppression
  confirmDelete(id: number) {
    const confirmed = confirm("Êtes-vous sûr de vouloir supprimer cet élément ?");
    if (confirmed) {
      this.deleteAttestation(id);
    }
  }

  // Suppression de la personne avec l'ID donné
  deletePersonnel(id: number) {
    // Vous pouvez appeler ici votre service pour la suppression, par exemple :
    // this.attestationService.(id).subscribe(response => { ... });
    console.log('Suppression confirmée pour l\'ID:', id);
    // Redirection ou autre logique après la suppression
  }


  getCompanies(): void {
    this.entrepriseService.getAll().subscribe(data => {
      this.companies = data;
      console.log('info sur les companies ayant une attestation d\'esntreprise', this.companies);

    });
  }

  getCompaniesNames(idCompanies: number): string {
    const entreprises = this.companies.find(e => e.id === idCompanies);
    return entreprises ? entreprises.social_reason : 'Inconnue';
  }

  getMemberALL(): void {
    this.attestationService.getMember().subscribe(data => {
      this.members = data;
      console.log('info sur les membre attestation entreprise', this.members);

    });
  }

  getMemberName(countryId: number): string {
    const member = this.members.find(p => p.id === countryId);
    return member ? member.lastname : 'Inconnu';
  }

  getmemberMatricule(countryId: number) {
    const member = this.members.find(p => p.id === countryId);
    return member ? member.matricule : 'Inconnu';
  }

  // Formater la date pour afficher seulement l'année
  formatDate(date: Date): string {
    return new Date(date).getFullYear().toString();
  }

  // pagination

  updatePage(): void {
    this.paginatedData = this.paginationService.paginate(
      this.attestations,
      this.currentPage,
      this.pageSize
    );
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.updatePage();
  }

}
