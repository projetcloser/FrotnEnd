import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { EvenementService } from '../evenement.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Evenement } from '../evenement';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update-evenement',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule,RouterModule],
  templateUrl: './update-evenement.component.html',
  styleUrl: './update-evenement.component.css'
})
export class UpdateEvenementComponent implements OnInit {
  evenementForm: FormGroup; // Déclarez le formulaire
  evenement!: Evenement;
  evenementId!: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private evenementService: EvenementService,
    private router: Router
  ) {
    // Initialisez le formulaire ici
    this.evenementForm = this.fb.group({
      titre: ['', Validators.required],
      author: ['', Validators.required],
      lieu: ['', Validators.required],
      cout: [0, [Validators.required, Validators.min(0)]],
      participant: [1, [Validators.required, Validators.min(1)]],
      neighborhood: [''],
      date_debut: ['', Validators.required],
      date_fin: ['', Validators.required],
      status: [1, Validators.required]
    });
  }

  ngOnInit(): void {
    this.evenementId = Number(this.route.snapshot.paramMap.get('id'));

    // Charger l'événement à mettre à jour
    this.evenementService.getEvenementById(this.evenementId).subscribe((data: Evenement) => {
      this.evenement = data;

      if (this.evenement) {
        // Remplissez le formulaire avec les données de l'événement
        this.evenementForm.patchValue({
          titre: this.evenement.titre,
          author: this.evenement.author,
          lieu: this.evenement.lieu,
          cout: this.evenement.cout,
          participant: this.evenement.participant,
          // neighborhood: this.evenement.neighborhood,
          date_debut: this.evenement.date_debut,
          date_fin: this.evenement.date_fin,
          status: this.evenement.status
        });
      } else {
        console.error('Événement non trouvé ou indéfini');
      }
    });
  }

  onSubmit(): void {
    if (this.evenementForm.valid) {
      this.evenementService.updateEvenement(this.evenementId, this.evenementForm.value).subscribe(() => {
        // Rediriger après la mise à jour ou afficher un message de succès
        this.router.navigate(['/evenements']);
      });
    } else {
      console.error('Le formulaire est invalide');
    }
  }
}
