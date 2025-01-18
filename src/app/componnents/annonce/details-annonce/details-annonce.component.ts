import { Component, OnInit } from '@angular/core';
import { Annonce } from '../model/annonce';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AnnonceServiceService } from '../annonce-service.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Poste } from '../../poste/poste';
import { PosteService } from '../../poste/poste.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-details-annonce',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,CommonModule,RouterLink,TranslateModule ],
  templateUrl: './details-annonce.component.html',
  styleUrl: './details-annonce.component.css'
})
export class DetailsAnnonceComponent implements OnInit {
  annonce!: Annonce; // Assurez-vous d'importer le modèle Annonce
  groupe:Poste[]=[];

  constructor(private route: ActivatedRoute, private annonceService: AnnonceServiceService,private groupeService:PosteService,) { }

  ngOnInit(): void {
    const id =  +this.route.snapshot.paramMap.get('id')!; // Récupérer l'ID de l'annonce depuis l'URL

      this.getAnnonceDetails(id);


     // goupe
     this.groupeService.getAmendes().subscribe({
      next: (data) => {
        this.groupe = data;
      },
      error: (err) => {
        console.error('Error fetching groupe', err);
      }
    });
  }

  getAnnonceDetails(id: number) {
    this.annonceService.find(id).subscribe((data) => {
      this.annonce = data;
    });

  }




}
