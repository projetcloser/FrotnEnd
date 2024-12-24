import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [RouterModule, CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})
export class PaginationComponent {
  @Input() totalItems: number = 0; // Nombre total d'éléments
  @Input() pageSize: number = 15; // Nombre d'éléments par page
  @Input() currentPage: number = 1; // Page actuelle

  @Output() pageChanged = new EventEmitter<number>(); // Émetteur pour informer du changement de page


  totalPages: number = 0; // Nombre total de pages
  pageNumbers: number[] = []; // Liste des numéros de pages

  // Expose Math to the template
  Math = Math;

  ngOnInit(): void {
    this.updatePagination();
  }

  ngOnChanges(): void {
    this.updatePagination();
  }

  updatePagination(): void {
    this.totalPages = Math.ceil(this.totalItems / this.pageSize);
    this.pageNumbers = Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.pageChanged.emit(this.currentPage);
    }
  }

}
