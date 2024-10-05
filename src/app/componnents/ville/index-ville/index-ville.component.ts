import { Component, OnInit } from '@angular/core';
import { Ville } from '../../../models/ville';
import { Router } from '@angular/router';
import { VilleServiceService } from '../ville-service.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Pays } from '../../../models/pays';

@Component({
  selector: 'app-index-ville',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './index-ville.component.html',
  styleUrl: './index-ville.component.css'
})
export class IndexVilleComponent implements OnInit{

  villes: Ville[] = [];
  pays: Pays[] = [];

  // add
  villeForm!: FormGroup;
  countries: Pays[] = [];  // Stocker les pays ici


  constructor(private router: Router, private villeService: VilleServiceService,private formBuilder: FormBuilder,) {}

  ngOnInit(): void {
    this.getVilles();
    this.getCountriesALL();

    // add
    this.villeForm = this.formBuilder.group({
      name: ['', Validators.required],       // Champ pour le nom de la ville
      country_id: ['', Validators.required]   // Champ pour sélectionner le pays (id)
    });
  }

  getVilles(): void {
    this.villeService.getAll().subscribe(
      (data) => {
        console.log(data);

        this.villes = data; // Assigner directement les données au tableau de villes
      },
      error => {
        console.error('Erreur lors de la récupération des ville :', error);
      }
    );
  }


  getCountriesALL(): void {
    this.villeService.getCountries().subscribe(pays => {
      this.pays = pays;
    });
  }

  getCountryName(countryId: number): string {
    const country = this.pays.find(p => p.id === countryId);
    return country ? country.name : 'Inconnu';
  }

  deleteVille(id: number): void {
    this.villeService.delete(id).subscribe({
      next: () => {
        console.log(`Ville avec l'id ${id} supprimée avec succès`);
        this.getVilles(); // Recharger les villes après la suppression
      },
      error: (error) => {
        console.error('Erreur lors de la suppression de la ville :', error);
      }
    });
  }

  // add
   // Méthode pour soumettre le formulaire
   onSubmit(): void {
    if (this.villeForm.valid) {
      const newVille: Ville = {
        id: 0,  // Laissez l'ID à 0, car le serveur générera un ID automatiquement
        name: this.villeForm.value.name,
        country_id: this.villeForm.value.country_id
      };

      this.villeService.create(newVille).subscribe(
        (response) => {
          console.log('Ville créée avec succès', response);
          this.router.navigate(['/ville']);  // Redirection vers la liste des villes après succès
        },
        (error) => {
          console.error('Erreur lors de la création de la ville :', error);
        }
      );
    }
  }





}
