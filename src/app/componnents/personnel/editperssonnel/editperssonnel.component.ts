import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Ville } from '../../../models/ville';
import { Entreprise } from '../../../models/entreprise';
import { Pays } from '../../../models/pays';
import { PersonnelService } from '../personnel.service';
import { VilleServiceService } from '../../ville/ville-service.service';
import { PaysServiceService } from '../../pays/pays-service.service';

@Component({
  selector: 'app-editperssonnel',
  standalone: true,
  imports: [RouterModule,CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './editperssonnel.component.html',
  styleUrl: './editperssonnel.component.css'
})
export class EditperssonnelComponent {
  currentTime = new Date();
  currentDay = new Date();

  personnelForm: FormGroup;
  selectedFiles: File[] = [];
  cities: Ville[] = [];
  countries: Pays[] = [];
  companies: Entreprise[] = [];
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private personnelService: PersonnelService, private router: Router,private cityService: VilleServiceService,
    private countryService: PaysServiceService) {
    this.personnelForm = this.fb.group({
      lastname: ['', Validators.required],
      firstname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      date_card_validity: ['', Validators.required],
      phone: ['', Validators.required],
      father_name: [''],
      father_phone: [''],
      mother_name: [''],
      birthday: ['', Validators.required],
      place_birth: [''],
      profession: [''],
      genre: ['', Validators.required],
      contract_type: [''],
      marital_status: ['', Validators.required],
      position: [''],
      num_children: [0],
      open_close: [false],
      city_id: [null, Validators.required],
      // country_id: [null, Validators.required],
      attachment: [null], // For file upload
    });
  }
  ngOnInit(): void {
    this.loadCities();
    this.loadCountries();
    // this.loadCompanies();
  }

  loadCities(): void {
    this.cityService.getAll().subscribe(
      (data) => {
        this.cities = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des villes', error);
      }
    );
  }

  loadCountries(): void {
    this.countryService.getAll().subscribe(
      (data) => {
        this.countries = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des pays', error);
      }
    );
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
  onSubmit(): void {
    if (this.personnelForm.valid) {
      const formData = new FormData();
      // Ajouter les champs de formulaire
    formData.append('statut', this.personnelForm.get('statut')?.value);
    formData.append('lastname', this.personnelForm.get('lastname')?.value);
    formData.append('firstname', this.personnelForm.get('firstname')?.value);
    formData.append('email', this.personnelForm.get('email')?.value);
    formData.append('date_card_validity', this.personnelForm.get('date_card_validity')?.value);
    formData.append('phone', this.personnelForm.get('phone')?.value);
    formData.append('father_name', this.personnelForm.get('father_name')?.value);
    formData.append('father_phone', this.personnelForm.get('father_phone')?.value);
    formData.append('mother_name', this.personnelForm.get('mother_name')?.value);
    formData.append('birthday', this.personnelForm.get('birthday')?.value);
    formData.append('place_birth', this.personnelForm.get('place_birth')?.value);
    formData.append('profession', this.personnelForm.get('profession')?.value);
    formData.append('genre', this.personnelForm.get('genre')?.value);
    formData.append('contract_type', this.personnelForm.get('contract_type')?.value);
    formData.append('marital_status', this.personnelForm.get('marital_status')?.value);
    formData.append('position', this.personnelForm.get('position')?.value);
    formData.append('num_children', this.personnelForm.get('num_children')?.value);
    formData.append('open_close', this.personnelForm.get('open_close')?.value);
    formData.append('city_id', this.personnelForm.get('city_id')?.value);
    formData.append('country_id', this.personnelForm.get('country_id')?.value);


      // Ajouter plusieurs fichiers à FormData
      if (this.selectedFiles.length > 0) {
        this.selectedFiles.forEach((file, index) => {
          formData.append('attachments[]', file, file.name);
        });
      }

      this.personnelService.create(formData).subscribe({
        next: response => {

          console.log('Personnel ajouté avec succès', response);
          this.errorMessage = ''; // Réinitialiser le message d'erreur
        },
        error: err => {
          console.error('Erreur lors de l\'ajout du personnel', err);
          this.errorMessage = 'Une erreur est survenue lors de l\'ajout du personnel. Veuillez réessayer.';
        }
      });
    } else {
      this.errorMessage = 'Le formulaire est invalide. Veuillez vérifier les champs.';
    }
  }


  // Gérer la sélection de plusieurs fichiers
  onFileSelected(event: any): void {
    const files = event.target.files;
    this.selectedFiles = Array.from(files); // Convertir en tableau de fichiers
  }


}
