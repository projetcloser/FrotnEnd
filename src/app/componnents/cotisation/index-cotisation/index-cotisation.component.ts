import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-index-cotisation',
  standalone: true,
  imports: [],
  templateUrl: './index-cotisation.component.html',
  styleUrl: './index-cotisation.component.css'
})
export class IndexCotisationComponent {

  constructor(private router: Router) {}

  navigateToForm() {
    this.router.navigate(['/nouvelle-cotisation']);
  }

  navigateToFormEdit() {
    this.router.navigate(['/modifier-cotisation']);
  }

}
