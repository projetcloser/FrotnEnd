import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PaginationComponent } from "../../../components/pagination/pagination.component";

@Component({
  selector: 'app-index-cotisation',
  standalone: true,
  imports: [PaginationComponent],
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
