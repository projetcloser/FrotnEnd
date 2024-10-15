import { Component, OnInit } from '@angular/core';
import { Membre } from '../../../models/membre';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DetteServiceService } from '../dette-service.service';
import { MembreServiceService } from '../../membre/membre-service.service';
import { Router, RouterModule } from '@angular/router';
import { Dette } from '../model/dette';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-dette',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule,RouterModule],
  templateUrl: './create-dette.component.html',
  styleUrl: './create-dette.component.css'
})
export class CreateDetteComponent  implements OnInit {
  detteForm!: FormGroup;
  membres: Membre[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private detteService: DetteServiceService,
    private membreService: MembreServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.detteForm = this.formBuilder.group({
      membre_id: ['', Validators.required], // Champ pour sélectionner un membre
      montant: ['', [Validators.required, Validators.min(0)]], // Montant de la dette
      date_echeance: ['', Validators.required], // Date d'échéance
      statut: ['Non payé', Validators.required] // Statut par défaut "Non payé"
    });

    this.loadMembres(); // Charger la liste des membres
  }

  loadMembres(): void {
    this.membreService.getAll().subscribe(data => {
      this.membres = data;
    });
  }

  onSubmit(): void {
    if (this.detteForm.valid) {
      const nouvelleDette: Dette = this.detteForm.value;
      this.detteService.addDette(nouvelleDette).subscribe(() => {
        this.router.navigate(['/Closer/dettes']); // Rediriger vers la liste des dettes après ajout
      });
    }
  }
}
