import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-index-evenement',
  standalone: true,
  imports: [],
  templateUrl: './index-evenement.component.html',
  styleUrl: './index-evenement.component.css'
})
export class IndexEvenementComponent {
  constructor(private router: Router) {}

  navigateToForm() {
    this.router.navigate(['/nouveau-evenement']);
  }

  navigateToFormEdit() {
    this.router.navigate(['/modifier-evenement']);
  }
}
