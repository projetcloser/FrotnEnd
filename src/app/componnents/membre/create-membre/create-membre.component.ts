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
   pictureFile!: File; // Pour gérer le téléchargement de la photo
  folderFiles: File[] = []; // Pour gérer les fichiers du dossier
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
    this.initForm();


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

  initForm() {
    this.membreForm = this.fb.group({
      matricule: [''],
      lastname: [''],
      firstname: [''],
      email: ['', [Validators.required, Validators.email]],
      order_number: [''],
      debt: [''],
      phone: [''],
      phone_2: [''],
      author: [{ value: 'MONGO SALOMON', disabled: true }],
      status: [0],
      open_close: [false],
      city_id: [null],
      country_id:[],
      created_at: [new Date()],
      picture: [''],
      folder: ['']
    });
  }

  onPictureSelected(event: any) {
    this.pictureFile = event.target.files[0];
  }

  onFolderSelected(event: any) {
    this.folderFiles = Array.from(event.target.files);
  }

  onSubmit() {
    if (this.membreForm.invalid) {
      return;
    }

    const formData = new FormData();
    const membre: Membre = this.membreForm.value;
    membre.author = 'MONGO SALOMON'; // L'auteur assigné manuellement

    formData.append('matricule', membre.matricule);
    formData.append('lastname', membre.lastname);
    formData.append('firstname', membre.firstname);
    formData.append('email', membre.email);
    formData.append('order_number', membre.order_number);
    formData.append('debt', membre.debt);
    formData.append('phone', membre.phone);
    formData.append('phone_2', membre.phone_2);
    formData.append('author', membre.author);
    formData.append('status', String(membre.status || 0));
    formData.append('open_close', String(membre.open_close || false));
    formData.append('city_id', String(membre.city_id || 0));
    formData.append('country_id', String(membre.country_id || 0));
    formData.append('created_at', membre.created_at.toISOString());

    if (this.pictureFile) {
      formData.append('picture', this.pictureFile, this.pictureFile.name);
    }

    if (this.folderFiles.length > 0) {
      this.folderFiles.forEach((file, index) => {
        formData.append(`folder[${index}]`, file, file.name);
      });
    }

    this.membreService.create(formData).subscribe(() => {
      this.router.navigate(['/membres']);
    });
  }

}
