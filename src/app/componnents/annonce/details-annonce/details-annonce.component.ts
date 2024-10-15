import { Component, OnInit } from '@angular/core';
import { Annonce } from '../model/annonce';
import { ActivatedRoute } from '@angular/router';
import { AnnonceServiceService } from '../annonce-service.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-details-annonce',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,CommonModule  ],
  templateUrl: './details-annonce.component.html',
  styleUrl: './details-annonce.component.css'
})
export class DetailsAnnonceComponent implements OnInit {
  annonce!: Annonce; // Assurez-vous d'importer le modèle Annonce

  constructor(private route: ActivatedRoute, private annonceService: AnnonceServiceService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id'); // Récupérer l'ID de l'annonce depuis l'URL
    if (id) {
      this.getAnnonceDetails(id);
    }
  }

  getAnnonceDetails(id: string) {
    this.annonceService.getAnnonceById(+id).subscribe(data => {
      this.annonce = data;
    });
  }

}
