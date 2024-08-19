import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-index-cachet',
  standalone: true,
  imports: [],
  templateUrl: './index-cachet.component.html',
  styleUrl: './index-cachet.component.css'
})
export class IndexCachetComponent {
  constructor(private router: Router) {}

  navigateToForm() {
    this.router.navigate(['/nouveau-cachet']);
  }

  navigateToFormEdit() {
    this.router.navigate(['/modifier-cachet']);
  }
}
