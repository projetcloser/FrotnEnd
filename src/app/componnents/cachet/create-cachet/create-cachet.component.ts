import { Component } from '@angular/core';
import { CachetService } from '../cachet.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PaysServiceService } from '../../pays/pays-service.service';
import { VilleServiceService } from '../../ville/ville-service.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Cachet } from '../cachet';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-cachet',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule,RouterModule],
  templateUrl: './create-cachet.component.html',
  styleUrl: './create-cachet.component.css'
})
export class CreateCachetComponent {
  entrepriseForm!: FormGroup;
  cahet: Cachet[] = [];
  countries: any[] = [];
  cities: any[] = []
  members:any[]=[]

  currentTime = new Date();
  currentDay = new Date();

   // Définir les options de statut
   statusOptions = [
    { value: 1, label: 'En cours de fabrication' },
    { value: 2, label: 'Disponible' },
    { value: 3, label: 'Envoyée' },
    { value: 4, label: 'Livrée' },
  ];

  constructor(public companyService: CachetService, private router:Router, private route:ActivatedRoute,
    private fb: FormBuilder, private countryService: PaysServiceService, cityService:VilleServiceService){

  }

  ngOnInit():void{
    this.entrepriseForm = this.fb.group({
      receipt_number: [],
        author: [],
        phone: [],
        year: [],
        // nui: [this.company.nui],
        // type: [this.company.company_type],
        member_id: [],
        city_id: [],
        status: []
    });

    this.loadCities();
    this.loadCountries();

  }

  loadCountries() {
    this.companyService.getCountries().subscribe((data) => {
      console.log(data);
      this.countries = data;
    });
  }

  loadCities() {
    this.companyService.getCities().subscribe((data) => {
      this.cities = data;
    });
  }

  loadmembers(){
     // Charger la liste des villes
     this.companyService.getMembers().subscribe((data: any[]) => {
      this.members = data;
    })

  }

  get f(){
    return this.entrepriseForm.controls;
  }

  onSubmit() {
    if (this.entrepriseForm.valid) {
      // const caisseData = this.caisseForm.value;
      this.companyService.addCachet(this.entrepriseForm.value).subscribe(() => {
        this.router.navigate(['/Closer/entreprise']);
      });
    }
  }
}
