import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-index-profession',
  standalone: true,
  imports: [FormsModule,
    CommonModule,ReactiveFormsModule],
  templateUrl: './index-profession.component.html',
  styleUrl: './index-profession.component.css'
})
export class IndexProfessionComponent {
  constructor(private router: Router) {}

  navigateToForm() {
    this.router.navigate(['/nouveau-profession']);
  }

  navigateToFormEdit() {
    this.router.navigate(['/modifier-personne']);
  }

}
