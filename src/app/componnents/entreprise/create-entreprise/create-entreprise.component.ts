import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EntrepriseServiceService } from '../entreprise-service.service';
import { Router, RouterModule } from '@angular/router';
import { Entreprise } from '../../../models/entreprise';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-entreprise',
  standalone: true,
  imports: [RouterModule,ReactiveFormsModule,CommonModule],
  templateUrl: './create-entreprise.component.html',
  styleUrl: './create-entreprise.component.css'
})
export class CreateEntrepriseComponent {
  entrepriseForm!: FormGroup;
  compagnie: Entreprise[] = [];
  countries: any[] = [];
  cities: any[] = []

  currentTime = new Date();
  currentDay = new Date();

  constructor(public entrepriseService:EntrepriseServiceService, private router:Router,private fb: FormBuilder,){

  }

  ngOnInit():void{
    this.entrepriseForm = this.fb.group({
      social_reason: ['', Validators.required],
      author: ['', Validators.required],
      phone: ['', Validators.required],
      email: [''],
      nui: ['', Validators.required],
      type: ['', Validators.required],
      country_id: ['', Validators.required],
      city_id: ['', Validators.required],
      neighborhood: [''],
      contact_person: ['', Validators.required],
      contact_person_phone: ['', Validators.required],
      status: [],
    });

    this.loadCities();
    this.loadCountries();

  }

  loadCountries() {
    this.entrepriseService.getCountries().subscribe((data) => {
      console.log(data);
      this.countries = data;
    });
  }

  loadCities() {
    this.entrepriseService.getCities().subscribe((data) => {
      this.cities = data;
    });
  }

  get f(){
    return this.entrepriseForm.controls;
  }

  onSubmit() {
    if (this.entrepriseForm.valid) {
      // const caisseData = this.caisseForm.value;
      this.entrepriseService.create(this.entrepriseForm.value).subscribe(() => {
        this.router.navigate(['/Closer/entreprise']);
      });
    }
  }
}
