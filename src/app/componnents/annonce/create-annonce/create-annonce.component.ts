import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AnnonceServiceService } from '../annonce-service.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-annonce',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './create-annonce.component.html',
  styleUrl: './create-annonce.component.css'
})
export class CreateAnnonceComponent implements OnInit {
  annonceForm!: FormGroup;
  fichiers: string[] = [];

  constructor(
    private fb: FormBuilder,
    private annonceService: AnnonceServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.annonceForm = this.fb.group({
      object: ['', Validators.required],
      contenu: ['', Validators.required],
      fichiers: ['']
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

}
