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

  constructor(
    private route: ActivatedRoute,
    private personnelService: PersonnelService,
    private cityService: VilleServiceService,
    private countryService: PaysServiceService
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.loadPersonnelDetails(id);
  }

  loadPersonnelDetails(id: number): void {
    this.personnelService.find(id).subscribe((data: Personnel) => {
      console.log(data);

      this.personnel = data;

      // Charger la ville
      this.cityService.getCityById(this.personnel.city_id).subscribe(city => {
        this.cityName = city.name;
        console.log(city.name);

      });

      // Charger le pays
      this.countryService.getCountryById(this.personnel.country_id).subscribe(country => {
        this.countryName = country.name;
        console.log( country.name);

      });
    });
  }

}
