import { Component } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { Postulant } from '../../../models/postulant';
import { PostulantServiceService } from '../postulant-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-index-postulant',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule,RouterLink,RouterModule],
  templateUrl: './index-postulant.component.html',
  styleUrl: './index-postulant.component.css'
})
export class IndexPostulantComponent {
  postulants: Postulant[]=[];

  // en voyer le loading
  isLoading:boolean = true;
  countries: any[] = [];
  cities: any[] = [];

constructor(public postulantsService: PostulantServiceService,private router: Router){}

ngOnInit(): void{
  this.loadCountries();
    this.loadCities();
  this.postulantsService.getAll().subscribe(
    (data:Postulant[])=>{
      console.log(data);
      this.postulants = data;


    },
    error => {
      console.error('Error fetching compagnies', error);
    }
)
}

// Récupérer les pays
loadCountries(): void {
  this.postulantsService.getCountries().subscribe(data => {
    this.countries = data;
  });
}

// Récupérer les villes
loadCities(): void {
  this.postulantsService.getCities().subscribe(data => {
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
    this.postulantsService.delete(id).subscribe(res => {
         this.postulants = this.postulants.filter(item => item.id !== id);
        //  console.log('activites deleted successfully!');
         alert("entreprise deleted successfully!")
    })
  }



   // Méthode de confirmation avant la suppression
   confirmDelete(id: number) {
    const confirmed = confirm("Êtes-vous sûr de vouloir supprimer cet élément ?");
    if (confirmed) {
      this.deletePersonnel(id);
    }
  }

  navigateToForm() {
    this.router.navigate(['/nouveau-postulant']);
  }
  navigateToFormEdit() {
    this.router.navigate(['/modifier-postulant']);
  }


}
