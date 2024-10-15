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
  selectedFiles: File[] = [];

  countries: any[] = [];
  cities: any[] = []
  errorMessage: string = ''; // Variable pour stocker les erreurs globales

  constructor(private fb: FormBuilder, private personnelService: PersonnelService, private router: Router,private cityService: VilleServiceService,
    private countryService: PaysServiceService) {
      this.personnelForm = this.fb.group({
        statut: ['', ], // 'married' or 'celibataire'
        lastname: ['', ],
        firstname: ['', ],
        email: ['', [, Validators.email]],
        date_card_validity: ['', ],
        phone: ['', ],
        father_name: ['', ],
        father_phone: ['', ],
        mother_name: ['', ],
        birthday: ['', ], // Format: 'YYYY-MM-DD'
        place_birth: ['', ],
        profession: ['', ],
        gender: ['', ], // 'male' or 'female'
        contract_type: ['', ],
        marital_status: ['', ], // 'married' or 'celibataire'
        position: ['', ],
        author:[],
        num_children: [0],
        open_close: [false],
        city_id: [ ], // Foreign key
        country_id: [ ], // Foreign key
        attachment: [null]
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
    this.selectedFiles = event.target.files as File[];
  }

  onSubmit(): void {
    if (this.personnelForm.valid) {
      const formData = new FormData();
      Object.keys(this.personnelForm.controls).forEach(key => {
        formData.append(key, this.personnelForm.get(key)?.value);
      });

      // Ajouter les fichiers si attachés
      if (this.selectedFiles.length > 0) {
        this.selectedFiles.forEach(file => {
          formData.append('attachment', file, file.name);
        });
      }

      this.personnelService.create(formData).subscribe(
        response => {
          console.log('Personnel added successfully!', response);
          this.router.navigate(['/Closer/personnel']); // Redirection après succès
        },
        error => {
          console.error('Error while adding personnel', error);
        }
      );
    } else {
      console.error('Form is invalid');
    }
  }

}
