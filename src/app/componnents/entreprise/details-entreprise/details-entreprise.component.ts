import { Component, OnInit } from '@angular/core';
import { Entreprise } from '../../../models/entreprise';
import { EntrepriseServiceService } from '../entreprise-service.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-details-entreprise',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterModule],
  templateUrl: './details-entreprise.component.html',
  styleUrl: './details-entreprise.component.css'
})
export class DetailsEntrepriseComponent implements OnInit{

  entreprise!: Entreprise;
  countryName: string = '';
  cityName: string = '';

  currentTime = new Date();
  currentDay = new Date();
  countries: any[] = [];
  cities: any[] = [];

  constructor(
    private entrepriseService: EntrepriseServiceService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.loadEntreprise(id);
    this.loadCountries();
    this.loadCities();
  }

  loadEntreprise(id: number) {
    this.entrepriseService.find(id).subscribe((data) => {
      this.entreprise = data;
      // this.loadCountryName(this.entreprise.country_id);
      // this.loadCityName(this.entreprise.city_id);
    });
  }

  // loadCountryName(countryId: number) {
  //   this.entrepriseService.getCountries().subscribe((data) => {
  //     const country = data.find((c) => c.id === countryId);
  //     if (country) this.countryName = country.name;
  //     console.log( country.name);

  //   });
  // }

  // loadCityName(cityId: number) {
  //   this.entrepriseService.getCities().subscribe((data) => {
  //     const city = data.find((c) => c.id === cityId);
  //     if (city) this.cityName = city.name;
  //   });
  // }

  // Récupérer les pays
  // loadCountries(): void {
  //   this.entrepriseService.getCountries().subscribe(data => {
  //     this.countries = data;
  //   });
  // }

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

}
