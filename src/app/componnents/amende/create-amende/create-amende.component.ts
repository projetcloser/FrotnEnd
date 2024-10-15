import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Amende } from '../model/amende';
import { AmendeServiceService } from '../amende-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MembreServiceService } from '../../membre/membre-service.service';

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

  constructor(
    private fb: FormBuilder,
    private amendeService: AmendeServiceService,
    private membreService: MembreServiceService, // Injecter le service des membres
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.amendeForm = this.fb.group({
      date: [{ value: '', disabled: true }], // Champ désactivé pour la date
      auteur: [{ value: '', disabled: true }], // Champ désactivé pour l'auteur
      objet: ['', Validators.required],
      montant: ['', [Validators.required, Validators.min(0)]],
      membre_id: ['', Validators.required],
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
      auteur: this.amendeService.getCurrentUser() // Auteur connecté
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
