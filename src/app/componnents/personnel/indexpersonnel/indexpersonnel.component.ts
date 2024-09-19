import { Component } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-indexpersonnel',
  standalone: true,
  imports: [FormsModule,
    CommonModule,ReactiveFormsModule
  ],
  templateUrl: './indexpersonnel.component.html',
  styleUrl: './indexpersonnel.component.css'
})
export class IndexpersonnelComponent {

  constructor(private router: Router) {}

  navigateToForm() {
    this.router.navigate(['/nouvelle-personne']);
  }

  navigateToFormEdit() {
    this.router.navigate(['/modifier-personne']);
  }


  currentStep: number = 1;

  nextStep() {
    if (this.currentStep < 4) {
      this.currentStep++;
    }
  }

  previousStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  submit() {
    // Logic for final submission
    console.log('Final submission');
  }

}