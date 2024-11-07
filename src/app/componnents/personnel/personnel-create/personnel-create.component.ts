import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PersonnelService } from '../personnel.service';
import { Ville } from '../../../models/ville';
import { Pays } from '../../../models/pays';
import { Entreprise } from '../../../models/entreprise';
import { Personnel } from '../personnel';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { VilleModule } from '../../ville/ville/ville.module';
import { PaysServiceService } from '../../pays/pays-service.service';
import { VilleServiceService } from '../../ville/ville-service.service';

@Component({
  selector: 'app-personnel-create',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    RouterModule
  ],
  templateUrl: './personnel-create.component.html',
  styleUrl: './personnel-create.component.css'
})
export class PersonnelCreateComponent implements OnInit{

  currentTime = new Date();
  currentDay = new Date();

  personnelForm: FormGroup;
  personnel: Personnel = new Personnel();
  selectedFiles: File[] = [];

  countries: any[] = [];
  cities: any[] = []
  errorMessage: string | null = ''; // Variable pour stocker les erreurs globales


  constructor(private fb: FormBuilder, private personnelService: PersonnelService, private router: Router,private cityService: VilleServiceService,
    private countryService: PaysServiceService) {
      this.personnelForm = this.fb.group({
        // statut: [ Validators.required], // 'married' or 'celibataire'
        // lastname: ['',[Validators.required, Validators.minLength(2)] ],
        // firstname: ['', [Validators.required, Validators.minLength(2)]],
        // email: ['', [Validators.required, Validators.email]],
        // date_card_validity: [''],
        // phone: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)] ],
        statut: [], // 'married' or 'celibataire'
        lastname: [''],
        firstname: [''],
        email: [''],
        date_card_validity: [''],
        phone: [''],
        father_name: [''],
        father_phone: [''],
        mother_name: [''],
        birthday: [''], // Format: 'YYYY-MM-DD'
        place_birth: [''],
        profession: [''],
        gender: [''], // 'male' or 'female'
        contract_type: [''],
        marital_status: [''], // 'married' or 'celibataire'
        position: [''],
        author:[],
        num_children: [0],
        // open_close: [false],
        city_id: [ ], // Foreign key
        country_id: [ ], // Foreign key
        attachment_file: [null]
      });
  }
  ngOnInit(): void {
    this.loadCities();
    this.loadCountries();
    // this.loadCompanies();
  }

  loadCountries() {
    this.personnelService.getCountries().subscribe((data) => {
      console.log(data);
      this.countries = data;
    });
  }

  loadCities() {
    this.personnelService.getCities().subscribe((data) => {
      console.log(data);
      this.cities = data;
    });
  }

  // loadCompanies(): void {
  //   this.personnelService.getCompanies().subscribe(
  //     (data) => {
  //       this.companies = data;
  //     },
  //     (error) => {
  //       console.error('Erreur lors de la récupération des entreprises', error);
  //     }
  //   );
  // }
  handleFileInput(event: any): void {
    const files = event.target.files as FileList;  // Fichiers sélectionnés
    this.selectedFiles = Array.from(files);  // Conversion de FileList en tableau
  }


  onSubmit(): void {
    if (this.personnelForm.valid) {
      const formData = new FormData();

      // Ajouter tous les champs du formulaire dans formData
      Object.keys(this.personnelForm.controls).forEach(key => {
        formData.append(key, this.personnelForm.get(key)?.value);
      });

      // Ajouter les fichiers s'il y en a
      if (this.selectedFiles.length > 0) {
        this.selectedFiles.forEach(file => {
          formData.append('attachment_file', file, file.name);  // Ajout des fichiers dans formData
        });
      }

      // Appel du service pour ajouter le personnel
      this.personnelService.create(formData).subscribe(
        response => {
          console.log('Personnel ajouté avec succès !', response);
          this.router.navigate(['/Closer/personnel']);  // Redirection après succès
        },
        error => {
          console.error('Erreur lors de l\'ajout du personnel', error);

        }
      );
    } else {
      console.error('Le formulaire est invalide');
    }
  }


}
