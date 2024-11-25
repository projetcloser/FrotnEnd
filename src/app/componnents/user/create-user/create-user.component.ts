import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../components/auth/auth.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PersonnelService } from '../../personnel/personnel.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [CommonModule,RouterModule,ReactiveFormsModule],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.css'
})
export class CreateUserComponent {
  amendeForm: FormGroup;
  isEditMode: boolean = false;
  amendeId: number | null = null;
  membres: any[] = []; // Liste des membres
  user: any = {};

  constructor(
    private fb: FormBuilder,

    private authService: AuthService,
    private persoService: PersonnelService, // Injecter le service des membres
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.amendeForm = this.fb.group({
      email: ['', [Validators.required]], // Champ désactivé pour la date
      password: [], // Champ désactivé pour l'auteur
      matricule	: ['', [Validators.required]],
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
    this.persoService.getAll().subscribe(data => {
      this.membres = data;
    });

  }
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
    this.router.navigate(['/Closer/list-utulisateu']);
  }

}
