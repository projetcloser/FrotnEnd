import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { PaginationComponent } from "../../../components/pagination/pagination.component";
import { Cotisation } from '../cotisation';
import { CotisationService } from '../cotisation.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Membre } from '../../../models/membre';
import { Caisse } from '../../../models/caisse';
import { MembreServiceService } from '../../membre/membre-service.service';
import { CaisseServiceService } from '../../Caisse/caisse-service.service';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { ExcelService } from '../../../services/excel.service';
import { AuthService } from "../../../components/auth/auth.service";
import { PaginationService } from '../../../components/pagination.service';

import { NonPayeService } from '../../attestation/nonPaye/non-paye.service';
import { Payment } from '../../attestation/nonPaye/payer/payment';
import { environment } from '../../../../environments/environment';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-index-cotisation',
  standalone: true,
  imports: [PaginationComponent, CommonModule, FormsModule, ReactiveFormsModule, RouterModule,TranslateModule],
  templateUrl: './index-cotisation.component.html',
  styleUrl: './index-cotisation.component.css'
})
export class IndexCotisationComponent implements OnInit {

  cotisations: Cotisation[] = [];
  membres: Membre[] = [];
  caisses: Caisse[] = [];
  user: any = {};

  searchForm!: FormGroup;
  results: any[] = [];

  // pagination
  paginatedData: any[] = []; // Données de la page courante

  currentPage: number = 1;
  pageSize: number = 10;
  totalItems: number = 0;
  private cotisationurl = environment.apiUrl + 'cotisations';


  constructor(private fb: FormBuilder, private excelService: ExcelService, private router: Router, private cotisationService: CotisationService,
    private membersService: MembreServiceService, private caisseService: CaisseServiceService
    , private authService: AuthService, private paginationService: PaginationService, private attestationService: NonPayeService, private http: HttpClient) { }



  countries: any[] = [];
  cities: any[] = [];

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      keyword: [''],
      member_id: [''],
      cashflow_id: [''],
      status: [''],
      open_close: ['']
    });

    this.loadcotisations();
    this.loadCaisses();
    this.loadMembers();
    this.loadUserProfile();


  }
  onSearch(): void {
    this.cotisationService.searchCotisations(this.searchForm.value).subscribe(data => {
      this.results = data;
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

  // loadcotisations() {
  //   this.cotisationService.getCotisations().subscribe((data: Cotisation[]) => {
  //     this.cotisations = data;

  //   });
  // }

  loadcotisations() {
    // Étape 1 : Récupération du profil utilisateur
    this.authService.getUserProfile().subscribe(
      (response: any) => {
        this.user = response;
        console.log('Utilisateur connecté:', this.user);

        // Étape 2 : Assurez-vous que 'id_perso' existe avant de continuer
        const idPerso = this.user.perso?.id;
        const idRole = this.user.role?.id;
        if (!idPerso) {
          console.error("ID personnel non trouvé pour l'utilisateur.");
          return;
        }
        // Étape 3 : Requête pour les données du tableau de bord
        this.http.get(`${this.cotisationurl}?id_perso=${idPerso}&id_role=${idRole}`).subscribe(
          (cotisationsResponse: any) => {
            this.cotisations = cotisationsResponse;

            console.log('Données du tableau de bord:', this.cotisations);
          },
          (error) => {
            console.error('Erreur lors de la récupération des données du tableau de bord:', error);
          }
        );
      },
      (error) => {
        console.error('Erreur lors de la récupération du profil utilisateur:', error);
      }
    );
  }

  // Récupérer les villes
  loadMembers(): void {
    this.membersService.getAll().subscribe(data => {
      this.membres = data;
      console.log('membre : ', this.membres);
      // pagination
      this.totalItems = this.membres.length;
      this.updatePage();

    });
  }

  // Trouver le nom du pays à partir de l'ID
  getmembresName(member_id: number): string {
    const membre = this.membres.find(c => c.id === member_id);
    return membre ? membre.lastname : 'Non défini';
  }

  // Récupérer les villes
  loadCaisses(): void {
    this.caisseService.getAll().subscribe(data => {
      this.caisses = data;
      console.log('caisses : ', this.caisses);
    });
  }

  // Trouver le nom du pays à partir de l'ID
  getCaissesName(cashflow_id: number): string {
    const caisses = this.caisses.find(c => c.id === cashflow_id);
    return caisses ? caisses.name : 'Non défini';
  }

  navigateToForm() {
    this.router.navigate(['/Closer/nouvelle-cotisation']);
  }

  navigateToFormEdit() {
    this.router.navigate(['/Closer/modifier-cotisation']);
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
    this.cotisationService.deleteCotisation(id).subscribe(res => {
      this.cotisations = this.cotisations.filter(item => item.id !== id);
      //  console.log('activites deleted successfully!');
      alert("cotisations deleted successfully!")
    })
  }


  // exportation excel
  exportToExcel(): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.cotisations);
    const workbook: XLSX.WorkBook = {
      Sheets: { 'Liste des cotisations': worksheet },
      SheetNames: ['Liste des cotisations']
    };

    // Générer le fichier Excel en binaire
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

    // Appeler la méthode pour sauvegarder le fichier
    this.saveAsExcelFile(excelBuffer, 'Liste_Cotisations');
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    saveAs(data, `${fileName}_export_${new Date().getTime()}.xlsx`);
  }

  // Récupérer les pays
  loadCountries(): void {
    this.cotisationService.getCountries().subscribe(data => {
      this.countries = data;
    });
  }

  // Récupérer les villes
  loadCities(): void {
    this.cotisationService.getCities().subscribe(data => {
      this.cities = data;
    });
  }

  // / Trouver le nom du pays à partir de l'ID
  getCountryName(country_id: number): string {
    const country = this.countries.find(c => c.id === country_id);
    return country ? country.name : 'Non défini';
  }

  // Trouver le nom de la ville à partir de l'ID
  getCityName(city_id: number): string {
    const city = this.cities.find(c => c.id === city_id);
    return city ? city.name : 'Non défini';
  }


  // Méthode pour obtenir le libellé du statut
  getStatusLabel(status: number): string {
    switch (status) {
      case 1:
        return 'En cours de fabrication';
      case 2:
        return 'Disponible';
      case 3:
        return 'Envoyée';
      case 4:
        return 'Livrée';
      default:
        return 'Inconnu';
    }
  }

  exportToExcelByStatus(status: number): void {
    // Filtrer les cachets par statut
    const filteredCachets = this.membres
      .filter(membre => membre.status === status)
      .map(membre => ({
        ...membre,
        status: this.getStatusLabel(membre.status), // Remplacer le statut numérique par le libellé
        city: this.getCityName(membre.city_id), // Remplacer city_id par le nom de la ville
        country: this.getCityName(membre.country_id), // Remplacer city_id par le nom de la ville
        // member: this.getMembersName(cachet.member_id) // Remplacer member_id par le nom du membre
      }));

    // Exporter les cachets filtrés en fichier Excel
    this.excelService.exportAsExcelFile(filteredCachets, 'Cotisations_Status_' + status);
  }

  // Fonction de recherche

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

  // paiement
  getMemberName(countryId: number): string {
    const member = this.membres.find(p => p.id === countryId);
    return member ? member.firstname : 'Inconnu';
  }

  getMemberUserName(countryId: number): string {
    const member = this.membres.find(p => p.id === countryId);
    return member ? member.lastname : 'Inconnu';
  }

  getmemberMatricule(countryId: number) {
    const member = this.membres.find(p => p.id === countryId);
    return member ? member.matricule : 'Inconnu';
  }

  payer(cotisation: any): void {
    const payment: Payment = {
      id: 0, // ou une valeur par défaut
      transaction_id: cotisation.ref_ing_cost,
      member_id: cotisation.member_id,
      company_attestation_id: 0,
      cotisation_id: cotisation.id,
      customer_name: this.getMemberUserName(cotisation.member_id),
      customer_surname: this.getMemberUserName(cotisation.member_id), // Renseignez si applicable
      amount: 60000, // Assurez-vous que l'objet `item` contient cette information
      description: 'Paiement Cotisation', // Description par défaut
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
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
