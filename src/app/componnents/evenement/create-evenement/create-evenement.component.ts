import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { EvenementService } from '../evenement.service';
import { Router, RouterModule } from '@angular/router';
import { Evenement } from '../evenement';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../components/auth/auth.service';

@Component({
  selector: 'app-create-evenement',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule,RouterModule],
  templateUrl: './create-evenement.component.html',
  styleUrl: './create-evenement.component.css'
})
export class CreateEvenementComponent {
  evenementForm: FormGroup;

  currentTime = new Date();
  currentDay = new Date();
  user: any = {};

  constructor(
    private fb: FormBuilder,
    private evenementService: EvenementService,
    private authService: AuthService,
    private router: Router
  ) {
    this.evenementForm = this.fb.group({
      title: [''],
      author: [''],
      place: [''],
      price: [0],
      participants: [{ value: 0, disabled: true }],
      // neighborhood: [''],
      start_date: [''],
      end_date: [''],
      // status: [1, Validators.required]
    });
  }

  ngOnInit(){
     // Récupérer l'auteur (utilisateur connecté) et la date
     this.evenementForm.patchValue({
      date: new Date().toLocaleDateString(), // Date actuelle formatée
      auteur:  this.authService.getUserProfile().subscribe(
        (response: any) => {
          this.user = response;
          console.log('Utilisateur annonce connecté:', this.user);  // Vérifie les données ici
          // Met à jour le champ author avec le nom de l'utilisateur connecté
           this.evenementForm.get('author')?.setValue(this.user.name);

        },
        (error) => {
            console.error('Erreur lors de la récupération du profil utilisateur:', error);
        }
    ) // Auteur connecté
    });
  }

  onSubmit() {
    if (this.evenementForm.valid) {
      const newEvenement: Evenement = this.evenementForm.value;
      console.log('evenement avnt la soumission dans le formulaire', newEvenement);

      this.evenementService.createEvenement(newEvenement).subscribe(() => {
        this.router.navigate(['/Closer/evenement']);
      });
    }
  }

}
