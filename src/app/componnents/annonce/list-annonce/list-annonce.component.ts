import { Component, OnInit } from '@angular/core';
import { Annonce } from '../model/annonce';
import { AnnonceServiceService } from '../annonce-service.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-annonce',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './list-annonce.component.html',
  styleUrl: './list-annonce.component.css'
})
export class ListAnnonceComponent implements OnInit {
  annonces: Annonce[] = [];

  constructor(private annonceService: AnnonceServiceService,private router: Router) {}

  ngOnInit(): void {
    this.annonceService.getAnnonces().subscribe((data: Annonce[]) => {
      this.annonces = data;
    });
  }

   // Méthode pour rediriger vers le formulaire de création
   goToCreateAnnonce(): void {
    this.router.navigate(['/Closer/annonces/new']);
  }

   // Redirige vers la page de détails d'une annonce
   viewDetails(id: number): void {
    this.router.navigate(['/Closer/annonces/details', id]);
  }

  // Redirige vers le formulaire d'édition d'une annonce
  editAnnonce(id: number): void {
    this.router.navigate(['/Closer/annonces/edit', id]);
  }

  // Supprimer une annonce
  deleteAnnonce(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette annonce ?')) {
      this.annonceService.deleteAnnonce(id).subscribe(() => {
        // Mettre à jour la liste des annonces après suppression
        this.annonces = this.annonces.filter(annonce => annonce.id !== id);
      });
    }
  }

  downloadFile(fileUrl: string, fileName: string): void {
    this.annonceService.downloadFile(fileUrl).subscribe((blob) => {
      const a = document.createElement('a');
      const objectUrl = URL.createObjectURL(blob);
      a.href = objectUrl;
      a.download = fileName;
      a.click();
      URL.revokeObjectURL(objectUrl);
    });
  }

  getFileName(fichier: string): string {
    // Gérer à la fois la barre oblique '/' et la barre oblique inverse '\\'
    const fileName = fichier.split(/(\\|\/)/g).pop();
    return fileName || fichier;
  }
}
