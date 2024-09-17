import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-index-attest-personnel',
  standalone: true,
  imports: [FormsModule,
    CommonModule,ReactiveFormsModule],
  templateUrl: './index-attest-personnel.component.html',
  styleUrl: './index-attest-personnel.component.css'
})
export class IndexAttestPersonnelComponent {
  constructor(private router: Router) {}

  navigateToForm() {
    this.router.navigate(['/nouveau-attestPersonnel']);
  }

  navigateToFormEdit() {
    this.router.navigate(['/modifier-personne']);
  }

}
