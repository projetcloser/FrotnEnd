import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EntrepriseServiceService } from '../entreprise-service.service';
import { Router, RouterModule } from '@angular/router';
import { Entreprise } from '../../../models/entreprise';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../components/auth/auth.service';

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
  user: any = {};

  currentTime = new Date();
  currentDay = new Date();

  constructor(public entrepriseService:EntrepriseServiceService, private router:Router,private fb: FormBuilder,
    private authService: AuthService,
  ){

  }

  ngOnInit():void{
    this.entrepriseForm = this.fb.group({
      social_reason: [''],
      author: [{ value: '', disabled: true }],
      phone: [''],
      email: [''],
      nui: [''],
      company_type: [''],
      country_id: [],
      city_id: [],
      neighborhood: [''],
      contact_person: [''],
      contact_person_phone: [''],
      company_categorie: [''],
    });

    this.loadCities();
    this.loadCountries();

     // Récupérer l'auteur (utilisateur connecté) et la date
     this.entrepriseForm.patchValue({
      date: new Date().toLocaleDateString(), // Date actuelle formatée
      auteur:  this.authService.getUserProfile().subscribe(
        (response: any) => {
          this.user = response.user.name;
          console.log('Utilisateur compagnie connecté:', this.user);  // Vérifie les données ici
          // Mettre à jour le champ 'author' avec le nom de l'utilisateur
          this.entrepriseForm.patchValue({ author: this.user });

        },
        (error) => {
            console.error('Erreur lors de la récupération du profil compagnie:', error);
        }
    ) // Auteur connecté
    });



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
      const entrpriseData = this.entrepriseForm.getRawValue();
      this.entrepriseService.create(entrpriseData).subscribe(() => {
        this.router.navigate(['/Closer/entreprise']);
      });
    }
  }


}
