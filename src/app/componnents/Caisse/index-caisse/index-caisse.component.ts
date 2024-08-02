import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-index-caisse',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './index-caisse.component.html',
  styleUrl: './index-caisse.component.css'
})
export class IndexCaisseComponent {
  constructor(private router: Router) {}
  navigateToForm() {
    this.router.navigate(['/nouvelle-caisse']);
  }

}
