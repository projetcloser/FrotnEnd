import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Cachet } from '../cachet';
import { CachetService } from '../cachet.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ExcelService } from '../../../services/excel.service';
import { AuthService } from "../../../components/auth/auth.service";
import { PaginationComponent } from '../../../components/pagination/pagination.component';
import { PaginationService } from '../../../components/pagination.service';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-index-cachet',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule, PaginationComponent,TranslateModule],
  templateUrl: './index-cachet.component.html',
  styleUrl: './index-cachet.component.css'
})
export class IndexCachetComponent implements OnInit {
  cachets: Cachet[] = [];
  filteredCachets: any[] = []; // Liste filtrée des cachets

  countries: any[] = [];
  cities: any[] = [];
  members: any[] = [];

  searchTerm: string = ''; // Terme de recherche

  currentTime = new Date();
  currentDay = new Date();
  user: any = {};

  // search back
  searchForm: FormGroup;

  // pagination
  paginatedData: any[] = []; // Données de la page courante

  currentPage: number = 1;
  pageSize: number = 10;
  totalItems: number = 0;
  private cacheteurl = environment.apiUrl + 'stamps';

  constructor(private fb: FormBuilder, private excelService: ExcelService, private cachetService: CachetService, private router: Router,
    private paginationService: PaginationService, private authService: AuthService, private http: HttpClient) {
    this.searchForm = this.fb.group({
      keyword: [''],
      statut: [''],
      gender: [''],
    });
  }

  ngOnInit(): void {
    // this.cachetService.getCachets().subscribe((data: any[]) => {
    //   this.cachets = data;
    //   this.filteredCachets = [...this.cachets]; // Initialisation de la liste filtrée
    //   // pagination
    //   this.totalItems = this.cachets.length;
    //   this.updatePage();
    // });
    this.loadCachets();
    this.loadCities();
    this.loadCountries();
    this.loadMembers();
    this.loadUserProfile();
  }
  onSearch() {
    const filters = this.searchForm.value;
    this.cachetService.searchMembers(filters).subscribe((data) => {
      this.cachets = data;
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


  loadCachets(): void {
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
        this.http.get(`${this.cacheteurl}?id_perso=${idPerso}&id_role=${idRole}`).subscribe(
          (cachetResponse: any) => {
            this.cachets = cachetResponse;
            this.filteredCachets = [...this.cachets]; // Initialisation de la liste filtrée
            // pagination
            this.totalItems = this.cachets.length;
            this.updatePage();

            console.log('Données du tableau de bord:', this.cachets);
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


  // Récupérer les pays
  loadCountries(): void {
    this.cachetService.getCountries().subscribe(data => {
      this.countries = data;
    });
  }

  // Récupérer les villes
  loadCities(): void {
    this.cachetService.getCities().subscribe(data => {
      this.cities = data;
    });
  }

  // Récupérer les membres
  loadMembers(): void {
    this.cachetService.getMembers().subscribe(data => {
      this.members = data;
    });
  }

  // Trouver le nom du pays à partir de l'ID
  getCountryName(country_id: number): string {
    const country = this.countries.find(c => c.id === country_id);
    return country ? country.name : 'Non défini';
  }

  // Trouver le nom de la ville à partir de l'ID
  getCityName(city_id: number): string {
    const city = this.cities.find(c => c.id === city_id);
    return city ? city.name : 'Non défini';
  }

  // Trouver le nom de la ville à partir de l'ID
  getMembersName(member_id: number): string {
    const membre = this.members.find(c => c.id === member_id);
    return membre ? membre.firstname : 'Non défini';
  }
  // Trouver le nom de la ville à partir de l'ID
  getMembersphone(city_id: number): string {
    const membrephone = this.members.find(c => c.id === city_id);
    return membrephone ? membrephone.phone : 'Non défini';
  }
  // Trouver le nom de la ville à partir de l'ID
  getMembersmatrivule(city_id: number): string {
    const membrematricule = this.members.find(c => c.id === city_id);
    return membrematricule ? membrematricule.matricule : 'Non défini';
  }

  navigateToForm() {
    this.router.navigate(['/Closer/nouveau-cachet']);
  }

  navigateToFormEdit() {
    this.router.navigate(['/Closer/modifier-cachet']);
  }

  deletePersonnel(id: number) {
    this.cachetService.deleteCachet(id).subscribe(res => {
      this.cachets = this.cachets.filter(item => item.id !== id);
      //  console.log('activites deleted successfully!');
      alert("cachets deleted successfully!")
    })
  }


  // Méthode de confirmation avant la suppression
  confirmDelete(id: number) {
    const confirmed = confirm("Êtes-vous sûr de vouloir supprimer cet élément ?");
    if (confirmed) {
      this.deletePersonnel(id);
    }
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

  exportCachetsByStatus(status: number): void {
    // Filtrer les cachets par statut
    const filteredCachets = this.cachets
      .filter(cachet => cachet.status === status)
      .map(cachet => ({
        ...cachet,
        status: this.getStatusLabel(cachet.status), // Remplacer le statut numérique par le libellé
        city: this.getCityName(cachet.city_id), // Remplacer city_id par le nom de la ville
        member: this.getMembersName(cachet.member_id) // Remplacer member_id par le nom du membre
      }));

    // Exporter les cachets filtrés en fichier Excel
    this.excelService.exportAsExcelFile(filteredCachets, 'Cachets_Status_' + status);
  }



  // pagination

  updatePage(): void {
    this.paginatedData = this.paginationService.paginate(
      this.cachets,
      this.currentPage,
      this.pageSize
    );
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.updatePage();
  }

}



