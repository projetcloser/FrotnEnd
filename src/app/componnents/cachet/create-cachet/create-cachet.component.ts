import { Component } from '@angular/core';
import { CachetService } from '../cachet.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PaysServiceService } from '../../pays/pays-service.service';
import { VilleServiceService } from '../../ville/ville-service.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Cachet } from '../cachet';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../components/auth/auth.service';

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
  user: any = {};

  currentTime = new Date();
  currentDay = new Date();

   // Définir les options de statut
   statusOptions = [
    { value: 1, label: 'En cours de fabrication' },
    { value: 2, label: 'Disponible' },
    { value: 3, label: 'Envoyée' },
    { value: 4, label: 'Livrée' },
  ];

  constructor(public companyService: CachetService,
    private authService: AuthService, private router:Router, private route:ActivatedRoute,
    private fb: FormBuilder, private countryService: PaysServiceService, cityService:VilleServiceService){

  }

  ngOnInit():void{
    this.entrepriseForm = this.fb.group({
      receipt_number: [],
      author: [{ value: '', disabled: true }],
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
    this.loadmembers();

    // Récupérer l'auteur (utilisateur connecté) et la date
    const formattedDate = new Date().toISOString().split('T')[0]; // Date au format YYYY-MM-DD
    // Récupérer l'auteur (utilisateur connecté) et la date
    this.entrepriseForm.patchValue({
      pay_year: formattedDate, // Date actuelle formatée
      author:  this.authService.getUserProfile().subscribe(
        (response: any) => {
          this.user = response.user.name;
          console.log('Utilisateur amende connecté:', this.user);  // Vérifie les données ici
          // Mettre à jour le champ 'author' avec le nom de l'utilisateur
          this.entrepriseForm.patchValue({ author: this.user });

        },
        (error) => {
            console.error('Erreur lors de la récupération du profil utilisateur:', error);
        }
    ) // Auteur connecté
    });

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
      const formData = this.entrepriseForm.getRawValue(); // Récupère même les champs désactivés comme ref_ing_cost
      this.companyService.addCachet(formData).subscribe(() => {
        this.router.navigate(['/Closer/cachet']);
      });
    }
  }
}
