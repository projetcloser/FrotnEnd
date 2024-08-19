import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-index-tresorerie',
  standalone: true,
  imports: [],
  templateUrl: './index-tresorerie.component.html',
  styleUrl: './index-tresorerie.component.css'
})
export class IndexTresorerieComponent {
  constructor(private router: Router) {}
  navigateToForm() {
    this.router.navigate(['/nouveau-transfert']);
  }

}
