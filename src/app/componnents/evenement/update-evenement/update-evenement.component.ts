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
  evenementForm!: FormGroup; // Déclarez le formulaire
  evenement!: Evenement;
  evenementId!: number;

  currentTime = new Date();
  currentDay = new Date();

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private evenementService: EvenementService,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    this.evenementId = Number(this.route.snapshot.paramMap.get('id'));

    // Charger l'événement à mettre à jour
    this.evenementService.getEvenementById(this.evenementId).subscribe((data: Evenement) => {
      this.evenement = data;

      console.log(data);


       // Initialisez le formulaire ici
      this.evenementForm = this.fb.group({
        title: [this.evenement.title],
        author: [this.evenement.author],
        place: [ this.evenement.place],
        price: [this.evenement.price],
        participants: [this.evenement.participants],
        // neighborhood: [''],
        start_date: [this.evenement.start_date],
        end_date: [this.evenement.end_date],
      });


    });
  }

  onSubmit(): void {
    if (this.evenementForm.valid) {
      this.evenementService.updateEvenement(this.evenementId, this.evenementForm.value).subscribe(() => {
        // Rediriger après la mise à jour ou afficher un message de succès
        this.router.navigate(['/Closer/evenement']);
        alert('voulez vous modifier!')
      });
    } else {
      console.error('Le formulaire est invalide');
    }
  }
}
