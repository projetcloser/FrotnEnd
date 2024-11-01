import { Component } from '@angular/core';
import { LoadingComponent } from '../../../components/loading/loading.component';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { EntrepriseServiceService } from '../entreprise-service.service';
import { Entreprise } from '../../../models/entreprise';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-index-entreprise',
  standalone: true,
  imports: [LoadingComponent,RouterModule, RouterLink, CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './index-entreprise.component.html',
  styleUrl: './index-entreprise.component.css'
})
export class IndexEntrepriseComponent {
  entreprises: Entreprise[]=[];

  // en voyer le loading
  isLoading:boolean = true;
  countries: any[] = [];
  cities: any[] = [];

  filteredDettes: Entreprise[] = [];
  searchTerm: string = '';

  currentTime = new Date();
  currentDay = new Date();

constructor(public entrepriseService: EntrepriseServiceService,private router: Router){}

ngOnInit(): void{
  this.loadCountries();
    this.loadCities();
  this.entrepriseService.getAll().subscribe(
    (data:Entreprise[])=>{
      console.log(data);
      this.entreprises = data;
      this.filteredDettes = data; // Initialisation du tableau filtré

    },
    error => {
      console.error('Error fetching compagnies', error);
    }
)
}


filterDettes(): void {
  this.filteredDettes = this.entreprises.filter(entreprise =>
    this.getCountryName(entreprise.country_id).toLowerCase().includes(this.searchTerm.toLowerCase()) ||
    entreprise.social_reason.toString().includes(this.searchTerm)||
    entreprise.company_type.toString().includes(this.searchTerm)
  );
}
// Récupérer les pays
loadCountries(): void {
  this.entrepriseService.getCountries().subscribe(data => {
    this.countries = data;
  });
}

// Récupérer les villes
loadCities(): void {
  this.entrepriseService.getCities().subscribe(data => {
    this.cities = data;
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

  /**
 * Write code on Method
 *
 * @return response()
 */
  deletePersonnel(id:number){
    this.entrepriseService.delete(id).subscribe(res => {
         this.entreprises = this.entreprises.filter(item => item.id !== id);
        //  console.log('activites deleted successfully!');
         alert("entreprise deleted successfully!")
    })
  }

  navigateToFormEdit() {
    this.router.navigate(['/modifier-entreprise']);
  }

   // Méthode de confirmation avant la suppression
   confirmDelete(id: number) {
    const confirmed = confirm("Êtes-vous sûr de vouloir supprimer cet élément ?");
    if (confirmed) {
      this.deletePersonnel(id);
    }
  }

  exportToExcel(): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.entreprises);
    const workbook: XLSX.WorkBook = {
      Sheets: { 'Liste des personnelles': worksheet },
      SheetNames: ['Liste des personnelles']
    };

    // Générer le fichier Excel en binaire
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

    // Appeler la méthode pour sauvegarder le fichier
    this.saveAsExcelFile(excelBuffer, 'Liste_Membres');
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    saveAs(data, `${fileName}_export_${new Date().getTime()}.xlsx`);
  }



}
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
