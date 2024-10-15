import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AmendeServiceService } from '../amende-service.service';
import { MembreServiceService } from '../../membre/membre-service.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Amende } from '../model/amende';

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

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private amendeService: AmendeServiceService,
    private membreService: MembreServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.amendeId = +this.route.snapshot.paramMap.get('id')!;
    this.initializeForm();
    this.loadAmende();
    this.loadMembres();
  }

  // Initialisation du formulaire avec les validators
  initializeForm(): void {
    this.amendeForm = this.fb.group({
      date: [{ value: '', disabled: true }, Validators.required],
      auteur: [{ value: '', disabled: true }, Validators.required],
      objet: ['', Validators.required],
      montant: ['', Validators.required],
      membre_id: ['', Validators.required]
    });
  }

  // Charger les données de l'amende pour l'édition
  loadAmende(): void {
    this.amendeService.getAmende (this.amendeId).subscribe((amende: Amende) => {
      this.amendeForm.patchValue({
        date: amende.date,
        auteur: amende.auteur,
        objet: amende.objet,
        montant: amende.montant,
        membre_id: amende.membre_id
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
