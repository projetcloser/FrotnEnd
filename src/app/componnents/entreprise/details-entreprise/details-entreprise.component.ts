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

  constructor(
    private entrepriseService: EntrepriseServiceService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.loadEntreprise(id);
  }

  loadEntreprise(id: number) {
    this.entrepriseService.find(id).subscribe((data) => {
      this.entreprise = data;
      this.loadCountryName(this.entreprise.country_id);
      this.loadCityName(this.entreprise.city_id);
    });
  }

  loadCountryName(countryId: number) {
    this.entrepriseService.getCountries().subscribe((data) => {
      const country = data.find((c) => c.id === countryId);
      if (country) this.countryName = country.name;
      console.log( country.name);

    });
  }

  loadCityName(cityId: number) {
    this.entrepriseService.getCities().subscribe((data) => {
      const city = data.find((c) => c.id === cityId);
      if (city) this.cityName = city.name;
    });
  }

}
