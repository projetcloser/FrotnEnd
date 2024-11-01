import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PosteService } from '../poste.service';
import { AuthService } from '../../../components/auth/auth.service';
import { MembreServiceService } from '../../membre/membre-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-poste',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule,],
  templateUrl: './create-poste.component.html',
  styleUrl: './create-poste.component.css'
})
export class CreatePosteComponent implements OnInit {
  amendeForm: FormGroup;
  isEditMode: boolean = false;
  amendeId: number | null = null;
  membres: any[] = []; // Liste des membres
  user: any = {};

  constructor(
    private fb: FormBuilder,
    private amendeService: PosteService,
    private authService: AuthService,
    private membreService: MembreServiceService, // Injecter le service des membres
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.amendeForm = this.fb.group({
      // date: [{ value: '', disabled: true }], // Champ désactivé pour la date
      // auteur: [{ value: '', disabled: true }], // Champ désactivé pour l'auteur
      label: ['', Validators.required],
      // montant: ['', [Validators.required, Validators.min(0)]],
      // membre_id: ['', Validators.required],
    });
  }

  ngOnInit() {
    // Récupérer la liste des membres
    this.membreService.getAll().subscribe(data => {
      this.membres = data;
    });

    // Récupérer l'auteur (utilisateur connecté) et la date
    this.amendeForm.patchValue({
      date: new Date().toLocaleDateString(), // Date actuelle formatée
      auteur:  this.authService.getUserProfile().subscribe(
        (response: any) => {
          this.user = response;
          console.log('Utilisateur amende connecté:', this.user);  // Vérifie les données ici

        },
        (error) => {
            console.error('Erreur lors de la récupération du profil utilisateur:', error);
        }
    ) // Auteur connecté
    });


  }



// Soumission du formulaire
onSubmit() {
  if (this.amendeForm.valid) {
    const amendeData = this.amendeForm.getRawValue(); // Récupère toutes les valeurs même celles désactivées
    this.amendeService.createAmende(amendeData).subscribe(() => {
      this.router.navigate(['/Closer/poste']);
    });
  }
}

  cancel() {
    this.router.navigate(['/Closer/poste']);
  }
}
