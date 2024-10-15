import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Annonce } from '../model/annonce';
import { ActivatedRoute, Router } from '@angular/router';
import { AnnonceServiceService } from '../annonce-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update-annonce',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './update-annonce.component.html',
  styleUrl: './update-annonce.component.css'
})
export class UpdateAnnonceComponent implements OnInit {
  annonceForm!: FormGroup;
  annonce: Annonce | null = null;
  selectedFiles: File[] = [];
  fichiers: string[] = [];

  constructor(
    private fb: FormBuilder,
    private annonceService: AnnonceServiceService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const annonceId = this.route.snapshot.paramMap.get('id');

    // Conversion de l'ID en number si l'ID existe
    if (annonceId) {
      const id = Number(annonceId); // Utilisation de Number() ou parseInt(annonceId)

      // Appel du service pour récupérer les données de l'annonce
      this.annonceService.getAnnonceById(id).subscribe((annonce) => {
        this.annonce = annonce;
        this.initForm();
      });
    } else {
      // Gérer le cas où l'ID est null ou invalide
      console.error('ID d\'annonce non valide');
      this.router.navigate(['/Closer/annonces']); // Redirection vers la liste des annonces si l'ID est invalide
    }
  }


  initForm() {
    this.annonceForm = this.fb.group({
      object: [this.annonce?.object || '', Validators.required],
      contenu: [this.annonce?.contenu || '', Validators.required]
    });
  }

   // Gestion de la sélection des fichiers
   onFileChange(event: any): void {
    const files = event.target.files;
    if (files.length > 0) {
      for (const file of files) {
        this.fichiers.push(file.name); // Simulation d'ajout de fichiers
      }
      this.annonceForm.patchValue({
        fichiers: this.fichiers
      });
    }
  }

  // Soumission du formulaire
  onSubmit(): void {
    if (this.annonceForm.valid) {
      const annonce = this.annonceForm.value;
      annonce.auteur = 'Utilisateur connecté'; // Remplacez par la session réelle de l'utilisateur

      this.annonceService.createAnnonce(annonce).subscribe(() => {
        this.router.navigate(['/Closer/annonces']); // Redirection après création
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/Closer/annonces']);
  }
}
