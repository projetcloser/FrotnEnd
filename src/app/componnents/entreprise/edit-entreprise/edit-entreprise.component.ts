import { Component } from '@angular/core';
import { Entreprise } from '../../../models/entreprise';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EntrepriseServiceService } from '../entreprise-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PaysServiceService } from '../../pays/pays-service.service';
import { VilleServiceService } from '../../ville/ville-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-entreprise',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './edit-entreprise.component.html',
  styleUrl: './edit-entreprise.component.css'
})
export class EditEntrepriseComponent {

  companyForm!: FormGroup;
  companyId!: number;
  company!: Entreprise;
  countries: any[] = [];
  cities: any[] = [];

  currentTime = new Date();
  currentDay = new Date();

  constructor( public companyService: EntrepriseServiceService, private router:Router, private route:ActivatedRoute,
    private fb: FormBuilder, private countryService: PaysServiceService, cityService:VilleServiceService
  ){}

  ngOnInit(): void {
    // this.id = this.route.snapshot.params['id'];
    this.companyId = Number(this.route.snapshot.paramMap.get('id'));

   // Charger l'entreprise à mettre à jour
   this.companyService.find(this.companyId).subscribe((data: Entreprise) => {
    this.company = data;

    this.companyForm = this.fb.group({
      name: [this.company.social_reason, Validators.required],
      author: [this.company.author, Validators.required],
      phone: [this.company.phone, Validators.required],
      email: [this.company.email],
      nui: [this.company.nui, Validators.required],
      type: [this.company.company_type, Validators.required],
      country_id: [this.company.country_id, Validators.required],
      city_id: [this.company.city_id, Validators.required],
      neighborhood: [this.company.neighborhood],
      contact_person: [this.company.contact_person, Validators.required],
      contact_person_phone: [this.company.contact_person_phone, Validators.required],
      company_categorie: [this.company.company_categorie, Validators.required]
    });
  });

    // Charger la liste des pays
    this.companyService.getCountries().subscribe((data: any[]) => {
      this.countries = data;
    });

    // Charger la liste des villes
    this.companyService.getCities().subscribe((data: any[]) => {
      this.cities = data;
    });
  }
  onSubmit(): void {
    if (this.companyForm.valid) {
      this.companyService.update(this.companyId, this.companyForm.value).subscribe(() => {
        this.router.navigate(['/Closer/entreprise']);
      });
    }
  }
}
