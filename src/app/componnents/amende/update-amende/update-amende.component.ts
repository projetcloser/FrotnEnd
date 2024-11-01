import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AmendeServiceService } from '../amende-service.service';
import { MembreServiceService } from '../../membre/membre-service.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Amende } from '../model/amende';
import { AuthService } from '../../../components/auth/auth.service';

@Component({
  selector: 'app-update-amende',
  standalone: true,
  imports: [CommonModule,RouterModule,FormsModule,ReactiveFormsModule],
  templateUrl: './update-amende.component.html',
  styleUrl: './update-amende.component.css'
})
export class UpdateAmendeComponent implements OnInit {
  amendeForm!: FormGroup;
  membres: any[] = [];
  amendeId!: number;
  user: any = {};


  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private amendeService: AmendeServiceService,
    private authService: AuthService,
    private membreService: MembreServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.amendeId = +this.route.snapshot.paramMap.get('id')!;
    this.initializeForm();
    this.loadAmende();
    this.loadMembres();

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

  }

  // Initialisation du formulaire avec les validators
  initializeForm(): void {
    this.amendeForm = this.fb.group({
      fine_date: [{ value: '', disabled: true }, Validators.required],
      author: ['', Validators.required],
      object: ['', Validators.required],
      amount: ['', Validators.required],
      member_id: ['', Validators.required]
    });
  }

  // Charger les données de l'amende pour l'édition
  loadAmende(): void {
    this.amendeService.getAmende (this.amendeId).subscribe((amende: Amende) => {
      this.amendeForm.patchValue({
        fine_date: amende.fine_date,
        author: amende.author,
        object: amende.object,
        amount: amende.amount,
        member_id: amende.member_id
      });
    });
  }

  // Charger la liste des membres pour la sélection
  loadMembres(): void {
    this.membreService.getAll().subscribe((membres) => {
      this.membres = membres;
    });
  }

  // Méthode pour mettre à jour l'amende
  onUpdate(): void {
    if (this.amendeForm.valid) {
      const updatedAmende = { ...this.amendeForm.value, id: this.amendeId };
      // const updatedAmende = this.amendeForm.getRawValue(); // Récupère toutes les valeurs même celles désactivées
      this.amendeService.updateAmende(this.amendeId, updatedAmende).subscribe(() => {
        this.router.navigate(['/Closer/amendes']);
      });
    }
  }

  // Annuler et retourner à la liste
  cancel(): void {
    this.router.navigate(['/Closer/amendes']);
  }
}
