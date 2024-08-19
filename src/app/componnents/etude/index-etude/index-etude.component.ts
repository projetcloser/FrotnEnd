import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-index-etude',
  standalone: true,
  imports: [],
  templateUrl: './index-etude.component.html',
  styleUrl: './index-etude.component.css'
})
export class IndexEtudeComponent {
  constructor(private router: Router) {}
  navigateToForm() {
    this.router.navigate(['/nouvelle-etude']);
  }

}
