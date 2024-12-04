import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { PaginationComponent } from "../../../components/pagination/pagination.component";
import { Cotisation } from '../cotisation';
import { CotisationService } from '../cotisation.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Membre } from '../../../models/membre';
import { Caisse } from '../../../models/caisse';
import { MembreServiceService } from '../../membre/membre-service.service';
import { CaisseServiceService } from '../../Caisse/caisse-service.service';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { ExcelService } from '../../../services/excel.service';
import {AuthService} from "../../../components/auth/auth.service";

@Component({
  selector: 'app-index-cotisation',
  standalone: true,
  imports: [PaginationComponent,CommonModule,FormsModule,ReactiveFormsModule,RouterModule],
  templateUrl: './index-cotisation.component.html',
  styleUrl: './index-cotisation.component.css'
})
export class IndexCotisationComponent implements OnInit{

  cotisations: Cotisation[] = [];
  membres: Membre[]=[];
  caisses: Caisse[]=[];
  user: any = {};

  searchForm!: FormGroup;
  results: any[] = [];


  constructor(private fb: FormBuilder,private excelService: ExcelService,private router: Router,private cotisationService: CotisationService,
    private membersService: MembreServiceService,private caisseService: CaisseServiceService, private authService: AuthService) {}



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

  loadcotisations() {
    this.cotisationService.getCotisations().subscribe((data: Cotisation[]) => {
      this.cotisations = data;

    });
  }

  // Récupérer les villes
  loadMembers(): void {
    this.membersService.getAll().subscribe(data => {
      this.membres = data;
      console.log('membre : ', this.membres);

    });
  }

  // Trouver le nom du pays à partir de l'ID
  getmembresName(member_id: number): string {
    const membre = this.membres.find(c => c.id === member_id);
    return membre ? membre.firstname : 'Non défini';
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
    }}

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

}
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
