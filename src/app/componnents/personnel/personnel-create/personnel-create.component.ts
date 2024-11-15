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
import { AuthService } from '../../../components/auth/auth.service';

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

  user: any = {};

  countries: any[] = [];
  cities: any[] = []
  errorMessage: string | null = ''; // Variable pour stocker les erreurs globales


  constructor(private fb: FormBuilder, private personnelService: PersonnelService,
    private authService: AuthService,
     private router: Router,private cityService: VilleServiceService,
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
        author:[{value:this.user.name, disabled: true }],
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
     // Récupérer l'auteur (utilisateur connecté) et la date
     this.personnelForm.patchValue({
      fine_date: new Date().toLocaleDateString(), // Date actuelle formatée
      author:  this.authService.getUserProfile().subscribe(
        (response: any) => {
          this.user = response;
          console.log('Utilisateur amende connecté:', this.user);  // Vérifie les données ici
          // Mettre à jour le champ 'author' avec le nom de l'utilisateur
          this.personnelForm.patchValue({ author: this.user.name });

        },
        (error) => {
            console.error('Erreur lors de la récupération du profil utilisateur:', error);
        }
    ) // Auteur connecté
    });

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
    const file = (event.target as HTMLInputElement)?.files?.[0];
    this.personnelForm.patchValue({
      attachment_file: file
    })
  }


  // onSubmit(): void {
  //   if (this.personnelForm.valid) {
  //     const formData = new FormData();

  //     // Ajouter tous les champs du formulaire dans formData
  //     Object.keys(this.personnelForm.controls).forEach(key => {
  //       formData.append(key, this.personnelForm.get(key)?.value);
  //     });

  //     // Ajouter les fichiers s'il y en a
  //     if (this.selectedFiles.length > 0) {
  //       this.selectedFiles.forEach(file => {
  //         formData.append('attachment_file', file, file.name);  // Ajout des fichiers dans formData
  //       });
  //     }

  //     formData.forEach((value:any, key:any) => {
  //       console.log(key, value);
  //   });

  //     // Appel du service pour ajouter le personnel
  //     this.personnelService.create(formData).subscribe(
  //       response => {
  //         console.log('Personnel ajouté avec succès !', response);
  //         this.router.navigate(['/Closer/personnel']);  // Redirection après succès
  //       },
  //       error => {
  //         console.error('Erreur lors de l\'ajout du personnel', error);

  //       }
  //     );
  //   } else {
  //     console.error('Le formulaire est invalide');
  //   }
  // }


  onSubmit(): void {
    const formData:any = new FormData();
    formData.append('author', this.user.name);
    formData.append('date_card_validity', this.personnelForm.value.date_card_validity);
    formData.append('lastname', this.personnelForm.value.lastname);
    formData.append('firstname', this.personnelForm.value.firstname);
    formData.append('email', this.personnelForm.value.email);
    formData.append('father_name', this.personnelForm.value.father_name);
    formData.append('father_phone', this.personnelForm.value.father_phone);
    formData.append('phone', this.personnelForm.value.phone);
    formData.append('mother_name', this.personnelForm.value.mother_name);
    formData.append('birthday', this.personnelForm.value.birthday);
    formData.append('place_birth', this.personnelForm.value.place_birth);
    formData.append('profession', this.personnelForm.value.profession);
    formData.append('gender', this.personnelForm.value.gender);
    formData.append('contract_type', this.personnelForm.value.contract_type);
    formData.append('position', this.personnelForm.value.position);
    formData.append('marital_status', this.personnelForm.value.marital_status);
    formData.append('num_children', this.personnelForm.value.num_children);
    // formData.append('phone_2', this.personnelForm.value.mother_name);
    formData.append('city_id', this.personnelForm.value.city_id);
    formData.append('country_id', this.personnelForm.value.country_id);
    formData.append('attachment_file', this.personnelForm.controls['attachment_file'].value);
    // formData.append('folder', this.personnelForm.controls['folder'].value);

     // Ajout conditionnel des fichiers s'ils sont présents
      if (this.personnelForm.get('attachment_file')?.value) {
        formData.append('attachment_file', this.personnelForm.get('attachment_file')?.value);
      }
      // if (this.personnelForm.get('folder')?.value) {
      //   formData.append('folder', this.personnelForm.get('folder')?.value);
      // }

    formData.forEach((value:any, key:any) => {
      console.log(key, value);
  });

    // console.log('Données envoyées :', this.personnelForm.value);
    this.personnelService.create(formData).subscribe(
      data => {
        // this.loadingNewExamen = false
        if (data.code === 200) {
          this.router.navigate(['/Closer/personnel']);
        } else {
          console.log('erreur : ', data.message);

        }
      }


    );


  }

}
