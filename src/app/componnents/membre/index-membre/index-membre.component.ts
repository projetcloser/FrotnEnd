import { Component, OnInit } from '@angular/core';
import { Membre } from '../../../models/membre';
import { MembreServiceService } from '../membre-service.service';
import { LoadingComponent } from '../../../components/loading/loading.component';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { ExcelService } from '../../../services/excel.service';

@Component({
  selector: 'app-index-membre',
  standalone: true,
  imports: [LoadingComponent,RouterModule, RouterLink, CommonModule,],
  templateUrl: './index-membre.component.html',
  styleUrl: './index-membre.component.css'
})
export class IndexMembreComponent implements OnInit{
  membres: Membre[]=[];
  countries: any[] = [];
  cities: any[] = [];
    // en voyer le loading
    isLoading:boolean = true;

  constructor(private excelService: ExcelService,public membreService: MembreServiceService,private router: Router){}

  navigateToForm() {
    this.router.navigate(['/Closer/nouveau-membre']);
  }
  navigateToFormEdit(id: number): void{
    this.router.navigate(['/Closer/membre/edit', id]);
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

  ngOnInit(): void{
    this.getmember();
    this.loadMembres();
  }

  getmember():void{
    this.membreService.getAll().subscribe(
      (data) => {
        console.log(data);

        this.membres = data; // Assigner directement les données au tableau de villes
      },
      error => {
        console.error('Erreur lors de la récupération des membres :', error);
      }

  )
  }
    /**
   * Write code on Method
   *
   * @return response()
   */
    deleteMembre(id: number): void {
      this.membreService.delete(id).subscribe(() => {
        this.membres = this.membres.filter(m => m.id !== id);
      });
    }

    exportToExcel(): void {
      const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.membres);
      const workbook: XLSX.WorkBook = {
        Sheets: { 'Liste des membres': worksheet },
        SheetNames: ['Liste des membres']
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

    // Récupérer les pays
    loadCountries(): void {
      this.membreService.getCountries().subscribe(data => {
        this.countries = data;
      });
    }

    // Récupérer les villes
    loadCities(): void {
      this.membreService.getCities().subscribe(data => {
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

    loadMembres() {
      this.membreService.getAll().subscribe(data => {
        this.membres = data;
      });
    }

    getMembreName(membreId: number): string {
      const membre = this.membres.find(m => m.id === membreId);
      return membre ? membre.firstname : 'Inconnu'; // Remplacez 'name' par le champ approprié dans votre modèle
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
    this.excelService.exportAsExcelFile(filteredCachets, 'Memberss_Status_' + status);
  }
}
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
