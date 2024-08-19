import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-index-requette',
  standalone: true,
  imports: [],
  templateUrl: './index-requette.component.html',
  styleUrl: './index-requette.component.css'
})
export class IndexRequetteComponent {
  constructor(private router: Router) {}
  navigateToForm() {
    this.router.navigate(['/nouvelle-demande']);
  }

  navigateToFormEdit() {
    this.router.navigate(['/modifier-demande']);
  }
}
