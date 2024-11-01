import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Amende } from '../model/amende';
import { AmendeServiceService } from '../amende-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MembreServiceService } from '../../membre/membre-service.service';
import { AuthService } from '../../../components/auth/auth.service';

@Component({
  selector: 'app-create-amende',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './create-amende.component.html',
  styleUrl: './create-amende.component.css'
})
export class CreateAmendeComponent implements OnInit {
  amendeForm: FormGroup;
  isEditMode: boolean = false;
  amendeId: number | null = null;
  membres: any[] = []; // Liste des membres
  user: any = {};

  constructor(
    private fb: FormBuilder,
    private amendeService: AmendeServiceService,
    private authService: AuthService,
    private membreService: MembreServiceService, // Injecter le service des membres
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.amendeForm = this.fb.group({
      fine_date: [{ value: '', disabled: true }], // Champ désactivé pour la date
      author: [{ value: '', disabled: true }], // Champ désactivé pour l'auteur
      object: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(0)]],
      member_id: ['', Validators.required],
    });
  }

  ngOnInit() {

    // Récupérer l'auteur (utilisateur connecté) et la date
    this.amendeForm.patchValue({
      fine_date: new Date().toLocaleDateString(), // Date actuelle formatée
      auteur:  this.authService.getUserProfile().subscribe(
        (response: any) => {
          this.user = response;
          console.log('Utilisateur amende connecté:', this.user);  // Vérifie les données ici
          // Mettre à jour le champ 'author' avec le nom de l'utilisateur
          this.amendeForm.patchValue({ author: this.user.name });

        },
        (error) => {
            console.error('Erreur lors de la récupération du profil utilisateur:', error);
        }
    ) // Auteur connecté
    });

    // Récupérer la liste des membres
    this.loadmembres();

  }


  loadmembres(){
    // Récupérer la liste des membres
    this.membreService.getAll().subscribe(data => {
      this.membres = data;
    });

  }
// Soumission du formulaire
onSubmit() {
  if (this.amendeForm.valid) {
    const amendeData = this.amendeForm.getRawValue(); // Récupère toutes les valeurs même celles désactivées
    this.amendeService.createAmende(amendeData).subscribe(() => {
      this.router.navigate(['/Closer/amendes']);
    });
  }
}

  // onSubmit() {
  //   if (this.amendeForm.valid) {
  //     this.amendeService.createAmende(this.amendeForm.value).subscribe(() => {
  //       this.router.navigate(['/Closer/amendes']);
  //     });
  //   }
  // }
  cancel() {
    this.router.navigate(['/Closer/amendes']);
  }
}
