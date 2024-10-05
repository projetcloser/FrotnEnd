import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Membre } from '../../../models/membre';
import { MembreServiceService } from '../membre-service.service';
import { Router } from '@angular/router';
import { PaysServiceService } from '../../pays/pays-service.service';
import { VilleServiceService } from '../../ville/ville-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-membre',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './create-membre.component.html',
  styleUrl: './create-membre.component.css'
})
export class CreateMembreComponent {
   membreForm!: FormGroup;
  selectedPhoto!: File | null;
  selectedCase!: File | null;
  membre: Membre[] = [];
  country:any;
  city:any;

  currentTime = new Date();
  currentDay = new Date();

  constructor(public membreService:MembreServiceService, private router:Router,private countryService:PaysServiceService,
     private fb: FormBuilder,
    private cityService:VilleServiceService
  ){

  }

  ngOnInit():void{
     // Utilisez this.fb.group pour créer le formulaire réactif correctement
     this.membreForm = this.fb.group({
      matricule: this.fb.control('', [Validators.required]),
      lastname: this.fb.control('', [Validators.required]),
      firstname: this.fb.control('', [Validators.required]),
      email: this.fb.control('', [Validators.required, Validators.email]),
      photo: this.fb.control(null, Validators.required),
      phone: this.fb.control('', [Validators.required, Validators.pattern(/^[0-9]+$/)]),
      phone2: this.fb.control(''),
      author: this.fb.control('', Validators.required),
      gender: this.fb.control('', Validators.required),
      status: this.fb.control(1, Validators.required),
      city_id: this.fb.control(1, Validators.required),
      case: this.fb.control(null, Validators.required),
      created_at: this.fb.control(new Date(), Validators.required)
    });



    this.countryService.getAll().subscribe({
      next: (country) => {
        this.country = country;
      },
      error: (err) => {
        console.error('Error fetching country', err);
      }
    });

    this.cityService.getAll().subscribe({
      next: (city) => {
        this.city = city;
      },
      error: (err) => {
        console.error('Error fetching city', err);
      }
    });

  }


  get f(){
    return this.membreForm.controls;
  }

  // Méthode pour gérer le fichier de la photo
  onPhotoSelected(event: any): void {
    this.selectedPhoto = event.target.files[0];
  }

  // Méthode pour gérer le fichier de case
  onCaseSelected(event: any): void {
    this.selectedCase = event.target.files[0];
  }

  onSubmit(): void {
    if (this.membreForm.valid) {
      const formData = new FormData();
      formData.append('matricule', this.membreForm.get('matricule')?.value);
      formData.append('lastname', this.membreForm.get('lastname')?.value);
      formData.append('firstname', this.membreForm.get('firstname')?.value);
      formData.append('email', this.membreForm.get('email')?.value);
      formData.append('phone', this.membreForm.get('phone')?.value);
      formData.append('phone2', this.membreForm.get('phone2')?.value);
      formData.append('author', this.membreForm.get('author')?.value);
      formData.append('gender', this.membreForm.get('gender')?.value);
      formData.append('status', this.membreForm.get('status')?.value);
      formData.append('created_at', this.membreForm.get('created_at')?.value.toISOString());

      // Ajout des fichiers photo et case
      if (this.selectedPhoto) {
        formData.append('photo', this.selectedPhoto);
      }
      if (this.selectedCase) {
        formData.append('case', this.selectedCase);
      }

      // Envoi du formulaire au service
      this.membreService.create(formData).subscribe(response => {
        console.log('Membre ajouté avec succès');
        this.router.navigate(['/membres']);  // Redirection après l'ajout
      }, error => {
        console.error('Erreur lors de l\'ajout du membre', error);
      });
    } else {
      console.error('Formulaire invalide');
    }
  }

}
