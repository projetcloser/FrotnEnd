import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Membre } from '../../../models/membre';
import { MembreServiceService } from '../membre-service.service';
import { Router } from '@angular/router';
import { PaysServiceService } from '../../pays/pays-service.service';
import { VilleServiceService } from '../../ville/ville-service.service';
import { CommonModule } from '@angular/common';
import { image } from 'html2canvas/dist/types/css/types/image';
import { AuthService } from '../../../components/auth/auth.service';
import { Poste } from '../../poste/poste';
import { PosteService } from '../../poste/poste.service';

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
  user: any = {};
  groupe:Poste[]=[];

  currentTime = new Date();
  currentDay = new Date();
  selectedFiles: { [key: string]: File | null } = { folder: null, picture: null };

  constructor(public membreService:MembreServiceService, private router:Router,private countryService:PaysServiceService,
     private fb: FormBuilder,
     private authService: AuthService,
    private cityService:VilleServiceService,
    private groupeService:PosteService,
  ){

  }

  ngOnInit():void{
    this.initForm();

     // Récupérer l'auteur (utilisateur connecté) et la date
     this.membreForm.patchValue({
      fine_date: new Date().toLocaleDateString(), // Date actuelle formatée
      author:  this.authService.getUserProfile().subscribe(
        (response: any) => {
          this.user = response;
          console.log('Utilisateur amende connecté:', this.user);  // Vérifie les données ici
          // Mettre à jour le champ 'author' avec le nom de l'utilisateur
          this.membreForm.patchValue({ author: this.user.name });

        },
        (error) => {
            console.error('Erreur lors de la récupération du profil utilisateur:', error);
        }
    ) // Auteur connecté
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

     // goupe
     this.groupeService.getAmendes().subscribe({
      next: (data) => {
        this.groupe = data;
      },
      error: (err) => {
        console.error('Error fetching groupe', err);
      }
    });

  }

  initForm() {
    this.membreForm = this.fb.group({
      matricule: [''],
      lastname: [''],
      firstname: [''],
      email: [''],
      order_number: [''],
      debt: [],
      phone: [''],
      phone_2: [''],
      author: [{ value: '', disabled: true }],
      status: [0],
      open_close: [false],
      city_id: [''],
      country_id:[''],
      group_id:[],
      created_at: [new Date()],
      picture: null,
      folder: null
    });
  }

  // onPictureSelected(event: any) {
  //   this.pictureFile = event.target.files[0];
  // }

  // onFolderSelected(event: any) {
  //   this.folderFiles = Array.from(event.target.files);
  // }

  // onSubmit() {
  //   if (this.membreForm.invalid) {
  //     return;
  //   }

  //   const formData = new FormData();
  //   const membre: Membre = this.membreForm.value;
  //   membre.author = 'MONGO SALOMON'; // L'auteur assigné manuellement

  //   formData.append('matricule', membre.matricule);
  //   formData.append('lastname', membre.lastname);
  //   formData.append('firstname', membre.firstname);
  //   formData.append('email', membre.email);
  //   // formData.append('order_number', membre.order_number);
  //   // formData.append('debt', membre.debt);
  //   formData.append('phone', membre.phone);
  //   formData.append('phone_2', membre.phone_2);
  //   formData.append('author', membre.author);
  //   // formData.append('status', String(membre.status || 0));
  //   // formData.append('open_close', String(membre.open_close || false));
  //   formData.append('city_id', String(membre.city_id || 0));
  //   formData.append('country_id', String(membre.country_id || 0));
  //   formData.append('created_at', membre.created_at.toISOString());

  //   if (this.pictureFile) {
  //     formData.append('picture', this.pictureFile, this.pictureFile.name);
  //   }

  //   if (this.folderFiles.length > 0) {
  //     this.folderFiles.forEach((file, index) => {
  //       formData.append(`folder[${index}]`, file, file.name);
  //     });
  //   }

  //   this.membreService.create(formData).subscribe(() => {
  //     this.router.navigate(['/Closer/membre']);
  //   });
  // }

  // onFolderSelected(event: any, field: string) {
  //   const file = event.target.files[0];
  //   if (file) {
  //     this.membreForm.get(field)?.setValue(file);
  //   }
  // }



  // onFileSelected(event: Event, fieldName: string): void {
  //   const input = event.target as HTMLInputElement;
  //   if (input.files && input.files.length > 0) {
  //     this.selectedFiles[fieldName] = input.files[0];
  //   }
  // }


  onSelectImage(event: Event) {
    const input = (event.target as HTMLInputElement)?.files?.[0];
    this.membreForm.patchValue({
      picture : input
    })
  }

  onSelectDocument(event: any) {
    const file = (event.target as HTMLInputElement)?.files?.[0];
    this.membreForm.patchValue({
      folder: file
    })
  }

  onSubmit(): void {
    const formData:any = new FormData();
    formData.append('author', this.user.name);
    formData.append('matricule', this.membreForm.value.matricule);
    formData.append('lastname', this.membreForm.value.lastname);
    formData.append('firstname', this.membreForm.value.firstname);
    formData.append('email', this.membreForm.value.email);
    formData.append('order_number', this.membreForm.value.order_number);
    formData.append('debt', this.membreForm.value.debt);
    formData.append('phone', this.membreForm.value.phone);
    formData.append('phone_2', this.membreForm.value.phone_2);
    formData.append('city_id', this.membreForm.value.city_id);
    formData.append('country_id', this.membreForm.value.country_id);
    formData.append('group_id', this.membreForm.value.group_id);
    formData.append('picture', this.membreForm.controls['picture'].value);
    formData.append('folder', this.membreForm.controls['folder'].value);

     // Ajout conditionnel des fichiers s'ils sont présents
      if (this.membreForm.get('picture')?.value) {
        formData.append('picture', this.membreForm.get('picture')?.value);
      }
      if (this.membreForm.get('folder')?.value) {
        formData.append('folder', this.membreForm.get('folder')?.value);
      }

    formData.forEach((value:any, key:any) => {
      console.log(key, value);
  });

    // console.log('Données envoyées :', this.membreForm.value);
    this.membreService.create(formData).subscribe(
      data => {
        // this.loadingNewExamen = false
        // if (data.code === 200) {
          this.router.navigate(['/Closer/membre']);
        // } else {
          // console.log('erreur : ', data.message);

        // }
      }


    );


  }

}
