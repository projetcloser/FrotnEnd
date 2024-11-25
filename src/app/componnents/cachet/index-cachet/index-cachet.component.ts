import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Cachet } from '../cachet';
import { CachetService } from '../cachet.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ExcelService } from '../../../services/excel.service';

@Component({
  selector: 'app-index-cachet',
  standalone: true,
  imports: [CommonModule,RouterModule,FormsModule,ReactiveFormsModule],
  templateUrl: './index-cachet.component.html',
  styleUrl: './index-cachet.component.css'
})
export class IndexCachetComponent implements OnInit {
  cachets: Cachet[] = [];
  filteredCachets: any[] = []; // Liste filtrée des cachets

  countries: any[] = [];
  cities: any[] = [];
  members:any[]=[];

  searchTerm: string = ''; // Terme de recherche

  currentTime = new Date();
  currentDay = new Date();

  constructor(private excelService: ExcelService,private cachetService: CachetService,private router: Router) {}

  ngOnInit(): void {
    this.cachetService.getCachets().subscribe((data: any[]) => {
      this.cachets = data;
      this.filteredCachets = [...this.cachets]; // Initialisation de la liste filtrée
    });

    this.loadCities();
    this.loadCountries();
    this.loadMembers();
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

  deletePersonnel(id:number){
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
    }}

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

   // Filtrer les cachets en fonction du terme de recherche
   filterCachets(): void {
    const term = this.searchTerm.toLowerCase();

    this.filteredCachets = this.cachets.filter(cachet => {
      const memberName = this.getMembersName(cachet.member_id).toLowerCase();
      const cityName = this.getCityName(cachet.city_id).toLowerCase();
      const statusLabel = this.getStatusLabel(cachet.status).toLowerCase();

      return (
        cachet.receipt_number.toLowerCase().includes(term) ||
        memberName.includes(term) ||
        cityName.includes(term) ||
        statusLabel.includes(term) ||
        cachet.year.toString().includes(term) ||
        cachet.phone.toLowerCase().includes(term) ||
        cachet.author.toLowerCase().includes(term)
      );
    });
  }
}



