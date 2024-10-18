import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { EvenementService } from '../evenement.service';
import { Router, RouterModule } from '@angular/router';
import { Evenement } from '../evenement';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-evenement',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule,RouterModule],
  templateUrl: './create-evenement.component.html',
  styleUrl: './create-evenement.component.css'
})
export class CreateEvenementComponent {
  evenementForm: FormGroup;

  currentTime = new Date();
  currentDay = new Date();

  constructor(
    private fb: FormBuilder,
    private evenementService: EvenementService,
    private router: Router
  ) {
    this.evenementForm = this.fb.group({
      title: [''],
      author: [''],
      place: [''],
      price: [0],
      participants: [0],
      // neighborhood: [''],
      start_date: [''],
      end_date: [''],
      // status: [1, Validators.required]
    });
  }
  get f() {
    return this.evenementForm.controls;  // Accès facile aux contrôles du formulaire
  }
  onSubmit() {
    if (this.evenementForm.valid) {
      const newEvenement: Evenement = this.evenementForm.value;
      this.evenementService.createEvenement(newEvenement).subscribe(() => {
        this.router.navigate(['/Closer/evenement']);
      });
    }
  }

}
