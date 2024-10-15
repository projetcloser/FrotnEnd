import { Component, OnInit } from '@angular/core';
import { PersonnelService } from '../personnel.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Personnel } from '../personnel';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PaysServiceService } from '../../pays/pays-service.service';
import { VilleServiceService } from '../../ville/ville-service.service';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent implements OnInit{

  personnel!: Personnel;
  // / Déclarez correctement les variables cityName et countryName
  cityName: string = '';
  countryName: string = '';

  countries: any[] = [];
  cities: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private personnelService: PersonnelService,
    private cityService: VilleServiceService,
    private countryService: PaysServiceService
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.loadPersonnelDetails(id);

    this.loadCountries();
    this.loadCities();
  }

  loadPersonnelDetails(id: number): void {
    this.personnelService.find(id).subscribe((data: Personnel) => {
      console.log(data);

      this.personnel = data;

      // Charger la ville
      // this.cityService.getCityById(this.personnel.city_id).subscribe(city => {
      //   this.cityName = city.name;
      //   console.log(city.name);

      // });

      // Charger le pays
  //     this.countryService.getCountryById(this.personnel.country_id).subscribe(country => {
  //       this.countryName = country.name;
  //       console.log( country.name);

  //     });
  //   });
  // }

   // Récupérer les pays
  //  loadCountries(): void {
  //   this.entrepriseService.getCountries().subscribe(data => {
  //     this.countries = data;
    });
  }

    // Récupérer les pays
    loadCountries(): void {
      this.personnelService.getCountries().subscribe(data => {
        this.countries = data;
      });
    }
  // Récupérer les villes
  loadCities(): void {
    this.personnelService.getCities().subscribe(data => {
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
