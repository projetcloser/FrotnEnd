import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-index-poste',
  standalone: true,
  imports: [FormsModule,
    CommonModule,ReactiveFormsModule],
  templateUrl: './index-poste.component.html',
  styleUrl: './index-poste.component.css'
})
export class IndexPosteComponent {
  constructor(private router: Router) {}

  navigateToForm() {
    this.router.navigate(['/nouveau-poste']);
  }

  navigateToFormEdit() {
    this.router.navigate(['/modifier-personne']);

}
}
