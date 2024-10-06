import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Postulant } from '../../../models/postulant';
import { PostulantServiceService } from '../postulant-service.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-postulant',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule,RouterModule],
  templateUrl: './create-postulant.component.html',
  styleUrl: './create-postulant.component.css'
})
export class CreatePostulantComponent {
  postulantForm!: FormGroup;
  postulants: Postulant[] = [];
  countries: any[] = [];
  cities: any[] = []

  currentTime = new Date();
  currentDay = new Date();
  constructor(public postulantService:PostulantServiceService, private router:Router,private fb: FormBuilder,){

  }

  ngOnInit():void{
    this.postulantForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      author: ['', Validators.required],
      phone: ['', Validators.required],
      email: [''],
      nui: ['', Validators.required],
      date_card_validity: ['', Validators.required],
      date_naiss: ['', Validators.required],
      year: ['', Validators.required],
      city_id: ['', Validators.required],
      neighborhood: [''],
      lieuNaiss: ['', Validators.required],
      child: ['', Validators.required],
      genre: ['', Validators.required],
      marital_status: ['', Validators.required],
      status: [''],
      profession: [],
    });

    this.loadCities();
    this.loadCountries();

  }

  loadCountries() {
    this.postulantService.getCountries().subscribe((data) => {
      console.log(data);
      this.countries = data;
    });
  }

  loadCities() {
    this.postulantService.getCities().subscribe((data) => {
      this.cities = data;
    });
  }

  get f(){
    return this.postulantForm.controls;
  }

  onSubmit() {
    if (this.postulantForm.valid) {
      // const caisseData = this.caisseForm.value;
      this.postulantService.create(this.postulantForm.value).subscribe(() => {
        this.router.navigate(['/postulant']);
      });
    }
  }
}
