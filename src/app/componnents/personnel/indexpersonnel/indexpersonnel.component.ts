import { Component, OnInit } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';


import { PersonnelService } from '../personnel.service';
import { Personnel } from '../personnel';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@Component({
  selector: 'app-indexpersonnel',
  standalone: true,
  imports: [FormsModule,
    CommonModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    RouterModule

  ],
  templateUrl: './indexpersonnel.component.html',
  styleUrl: './indexpersonnel.component.css'
})
export class IndexpersonnelComponent implements OnInit {



  personnels: Personnel[] = [];

  currentTime = new Date();
  currentDay = new Date();

  constructor(private router: Router,private personnelService:PersonnelService) {}

  ngOnInit(): void {
    this.getAllPersonnels();
  }

  // Récupérer la liste des personnels
  getAllPersonnels(): void {
    this.personnelService.getAll().subscribe(
      (data: Personnel[]) => {
        console.log('Données récupérées :', data); // Vérifiez ce qui est renvoyé
        this.personnels = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des personnels', error);
      }
    );
  }

  // Méthode pour naviguer vers les détails
  viewPersonnel(id: number): void {
    this.router.navigate(['/personnel-details', id]);
  }

  navigateToForm() {
    this.router.navigate(['/Closer/nouvelle-personne']);
  }

  navigateToFormEdit(id: number) {
    this.router.navigate(['/modifier-personne']);
  }

  // Méthode de confirmation avant la suppression
  confirmDelete(id: number) {
    const confirmed = confirm("Êtes-vous sûr de vouloir supprimer cet élément ?");
    if (confirmed) {
      this.deletePersonnel(id);
    }
  }



  deletePersonnel(id:number){
    this.personnelService.delete(id).subscribe(res => {
         this.personnels = this.personnels.filter(item => item.id !== id);
        //  console.log('activites deleted successfully!');
         alert("personnels deleted successfully!")
    })
  }


  submit() {
    // Logic for final submission
    console.log('Final submission');
  }






}
