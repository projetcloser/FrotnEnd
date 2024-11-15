import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AnnonceServiceService } from '../annonce-service.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../components/auth/auth.service';
import { Poste } from '../../poste/poste';
import { PosteService } from '../../poste/poste.service';

@Component({
  selector: 'app-create-annonce',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './create-annonce.component.html',
  styleUrl: './create-annonce.component.css'
})
export class CreateAnnonceComponent implements OnInit {
  annonceForm!: FormGroup;
  fichiers: string[] = [];
  user: any = {};
  groupe:Poste[]=[];
  constructor(
    private fb: FormBuilder,
    private annonceService: AnnonceServiceService,
    private authService: AuthService,
    private groupeService:PosteService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.annonceForm = this.fb.group({
      object: ['', Validators.required],
      body: ['', Validators.required],
      author: [''],
      fichiers: ['']
    });

    // Récupérer l'auteur (utilisateur connecté) et la date
    this.annonceForm.patchValue({
      date: new Date().toLocaleDateString(), // Date actuelle formatée
      auteur:  this.authService.getUserProfile().subscribe(
        (response: any) => {
          this.user = response;
          console.log('Utilisateur annonce connecté:', this.user);  // Vérifie les données ici
          // Met à jour le champ author avec le nom de l'utilisateur connecté
           this.annonceForm.get('author')?.setValue(this.user.name);

        },
        (error) => {
            console.error('Erreur lors de la récupération du profil utilisateur:', error);
        }
    ) // Auteur connecté
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

 // Gestion de la sélection des fichiers
onFileChange(event: any): void {
  const files = event.target.files;
  if (files.length > 0) {
    for (const file of files) {
      this.fichiers.push(file); // Ajoute l'objet File, pas seulement le nom
    }
    this.annonceForm.patchValue({
      fichiers: this.fichiers
    });
  }
}


  // Soumission du formulaire
  onSubmit(): void {
    if (this.annonceForm.valid) {
      const annonce = this.annonceForm.value;
      annonce.auteur = 'Utilisateur connecté'; // Remplacez par la session réelle de l'utilisateur

      this.annonceService.createAnnonce(annonce).subscribe(() => {
        this.router.navigate(['/Closer/annonces']); // Redirection après création
      });
    }
  }

}
// export class CreateAnnonceComponent implements OnInit {
//   annonceForm!: FormGroup;
//   fichiers: File[] = [];
//   user: any = {};

//   constructor(
//     private fb: FormBuilder,
//     private annonceService: AnnonceServiceService,
//     private authService: AuthService,
//     private router: Router
//   ) {}

//   ngOnInit(): void {
//     this.annonceForm = this.fb.group({
//       object: ['', Validators.required],
//       body: ['', Validators.required],
//       author: [''],
//       // date: [new Date().toLocaleDateString()]
//     });

//     // Récupérer l'utilisateur connecté
//     this.authService.getUserProfile().subscribe(
//       (response: any) => {
//         this.user = response;
//         console.log('Utilisateur connecté:', this.user);

//         // Mettre à jour le champ 'author' avec le nom de l'utilisateur
//         this.annonceForm.patchValue({ author: this.user.name });
//       },
//       (error) => {
//         console.error('Erreur lors de la récupération du profil utilisateur:', error);
//       }
//     );
//   }

//   // Gestion de la sélection des fichiers
//   // onFileChange(event: any): void {
//   //   const files = event.target.files;
//   //   if (files.length > 0) {
//   //     this.fichiers = Array.from(files);
//   //   }
//   // }

//   onFileChange(event: any) {
//     const file = (event.target as HTMLInputElement)?.files?.[0];
//     this.annonceForm.patchValue({
//       fichiers: file
//     })
//   }

//   // Soumission du formulaire
//   onSubmit(): void {
//     if (this.annonceForm.valid) {
//       const formData = new FormData();

//       // Vérification avant ajout dans FormData
//       formData.append('object', this.annonceForm.get('object')?.value || '');
//       formData.append('body', this.annonceForm.get('body')?.value || '');
//       formData.append('author', this.annonceForm.get('author')?.value || '');
//       formData.append('fichiers', this.annonceForm.controls['fichiers'].value);
//       // formData.append('date', this.annonceForm.get('date')?.value || '');

//       // Ajoutez les fichiers à FormData
//       this.fichiers.forEach((file) => {
//         formData.append('fichiers[]', file);
//       });

//     // Affichage des valeurs de FormData avant l'envoi
//       formData.forEach((value, key) => {
//         console.log(`${key}: ${value}`);
//       });



//       // Envoyez le FormData au service
//       this.annonceService.createAnnonce(formData).subscribe({
//         next: () => {
//           console.log(formData);

//           this.router.navigate(['/Closer/annonces']);
//         },
//         error: (error) => {
//           console.error("Erreur lors de la création de l'annonce:", error);
//         }
//       });
//     } else {
//       console.log('Formulaire invalide:', this.annonceForm.errors);
//     }
//   }
// }

