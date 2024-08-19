import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-index-non-paye',
  standalone: true,
  imports: [],
  templateUrl: './index-non-paye.component.html',
  styleUrl: './index-non-paye.component.css'
})
export class IndexNonPayeComponent {
  constructor(private router: Router) {}

  navigateToForm() {
    this.router.navigate(['/nouvelle-attestation-non_paye']);
  }

  navigateToFormEdit() {
    this.router.navigate(['/modifier-attestation-non_paye']);
  }

}
