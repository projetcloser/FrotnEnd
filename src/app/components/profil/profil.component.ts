import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MembreServiceService } from '../../componnents/membre/membre-service.service';

@Component({
  selector: 'app-profil',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,FormsModule,RouterModule],
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.css'
})
export class ProfilComponent {

   user: any = {};
   countries: any[] = [];
   cities: any[] = [];


    constructor(private authService: AuthService, private router: Router,public membreService: MembreServiceService) { }
    ngOnInit(): void {
      this.loadUserProfile();
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

}
