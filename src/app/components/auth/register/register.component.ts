import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../model/user';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MembreServiceService } from '../../../componnents/membre/membre-service.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  amendeForm: FormGroup;
  isEditMode: boolean = false;
  amendeId: number | null = null;
  membres: any[] = []; // Liste des membres
  user: any = {};

  constructor(
    private fb: FormBuilder,

    private authService: AuthService,
    private membreService: MembreServiceService, // Injecter le service des membres
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.amendeForm = this.fb.group({
      // fine_date: [{ value: '', disabled: true }], // Champ désactivé pour la date
      password: [], // Champ désactivé pour l'auteur
      // name	: ['', Validators.required],
      matricule	: ['', [Validators.required]],
      email:['', Validators.required],
      roleId: ['', Validators.required],
      persoId: ['', Validators.required],
    });
  }

  ngOnInit() {
    // Récupérer la liste des membres
    this.loadmembres();
  }


  loadmembres(){
    // Récupérer la liste des membres
    this.membreService.getAll().subscribe(data => {
      this.membres = data;
    });

  }
// // Soumission du formulaire
// onSubmit() {
//   if (this.amendeForm.valid) {
//     // const amendeData = this.amendeForm.getRawValue(); // Récupère toutes les valeurs même celles désactivées
//     console.log(this.amendeForm.value);
//     this.authService.register(this.amendeForm.value).subscribe(() => {
//       console.log(this.amendeForm.value);

//       this.router.navigate(['/Closer/list-utulisateur']);
//     });
//   }
// }

onSubmit() {
  if (this.amendeForm.valid) {
    // Debug : Afficher les données envoyées
    console.log('Données soumises :', this.amendeForm.value);

    this.authService.register(this.amendeForm.value).subscribe({
      next: () => {
        console.log('Inscription réussie');
        this.router.navigate(['/Closer/list-utulisateur']);
      },
      error: (err) => {
        console.error('Erreur de l\'API :', err);

        if (err.status === 400) {
          // Récupérez les détails des erreurs depuis err.error (si disponibles)
          const errorDetails = err.error;
          console.log('Détails de l\'erreur :', errorDetails);

          // Affichez un message d'erreur à l'utilisateur (exemple avec une alerte)
          alert(`Erreur : ${errorDetails.message || 'Données invalides'}`);
        } else {
          alert('Une erreur inattendue s\'est produite.');
        }
      },
    });
  } else {
    console.log('Formulaire invalide', this.amendeForm.errors);
  }
}

  cancel() {
    this.router.navigate(['/Closer/list-utulisateur']);
  }
}
