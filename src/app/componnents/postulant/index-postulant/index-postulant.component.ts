import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-index-postulant',
  standalone: true,
  imports: [],
  templateUrl: './index-postulant.component.html',
  styleUrl: './index-postulant.component.css'
})
export class IndexPostulantComponent {
  constructor(private router: Router) {}
  navigateToForm() {
    this.router.navigate(['/nouveau-postulant']);
  }
  navigateToFormEdit() {
    this.router.navigate(['/modifier-postulant']);
  }

}
