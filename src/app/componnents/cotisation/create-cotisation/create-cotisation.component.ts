import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Membre } from '../../../models/membre';
import { Cotisation } from '../cotisation';
import { CotisationService } from '../cotisation.service';
import { Router, RouterModule } from '@angular/router';
import { CaisseServiceService } from '../../Caisse/caisse-service.service';
import { MembreServiceService } from '../../membre/membre-service.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../components/auth/auth.service';
import { error } from 'jquery';
import { PersonnelService } from '../../personnel/personnel.service';
import { Personnel } from '../../personnel/personnel';

@Component({
  selector: 'app-create-cotisation',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule,RouterModule  ],
  templateUrl: './create-cotisation.component.html',
  styleUrl: './create-cotisation.component.css'
})
export class CreateCotisationComponent implements OnInit{
  cotisationForm!: FormGroup;
  cotisations: Cotisation[] = [];
  caisses: any[] = [];
  membres: any[] = [];
  staffs:  any[] = [];
  user: any = {};

  currentTime = new Date();
  currentDay = new Date();
  currentYear: number = new Date().getFullYear(); // Récupère l'année actuelle




  constructor(public cotisationService:CotisationService,
    private caisseService:CaisseServiceService,private membreService:MembreServiceService,
    private authService: AuthService,
    private personnelservice:PersonnelService,
    private router:Router,private fb: FormBuilder,){

  }

  ngOnInit():void{
    this.cotisationForm = this.fb.group({
      cashflow_id: [''],
      member_id: [''],
      // pay_year: [this.currentYear], // Année actuelle
      pay_year: [{ value: '', disabled: true }],
      ref_ing_cost: [{ value: this.generateRefIngCost(), disabled: true }],
      amount: [0], // Valeur par défaut
      pay: [60000], // Valeur par défaut
      status: ['OK'],
      staff_id:[''],
      author: [{ value: '', disabled: true }],
      open_close: [0],
    });

    this.loadCaisse();
    this.loadMembers();
    this.loadUserProfile();
    this.loadStaff();

    // Récupérer l'auteur (utilisateur connecté) et la date
    const formattedDate = new Date().toISOString().split('T')[0]; // Date au format YYYY-MM-DD
    // Récupérer l'auteur (utilisateur connecté) et la date
    this.cotisationForm.patchValue({
      pay_year: formattedDate, // Date actuelle formatée
      auteur:  this.authService.getUserProfile().subscribe(
        (response: any) => {
          this.user = response;
          console.log('Utilisateur amende connecté:', this.user);  // Vérifie les données ici
          // Mettre à jour le champ 'author' avec le nom de l'utilisateur
          this.cotisationForm.patchValue({ author: this.user.name });

        },
        (error) => {
            console.error('Erreur lors de la récupération du profil utilisateur:', error);
        }
    ) // Auteur connecté
    });

     // Surveillez les changements du champ 'pay'
    this.cotisationForm.get('pay')?.valueChanges.subscribe((payValue: number) => {
      const calculatedAmount = 60000 - (payValue || 0); // Calcule le montant restant
      this.cotisationForm.patchValue({ amount: calculatedAmount }); // Met à jour 'amount'
    });

  }

  loadMembers() {
    this.membreService.getAll().subscribe((data) => {
      console.log('membre',data);
      this.membres = data;
    });
  }

  loadCaisse() {
    this.caisseService.getAll().subscribe((data) => {
      console.log('caisse',data);
      this.caisses = data;
    });
  }
  loadStaff(){
    this.personnelservice.getAll().subscribe((data)=>{
      this.staffs = data;
      console.log('staff:', this.staffs);

    });
  }

  get f(){
    return this.cotisationForm.controls;
  }

  generateRefIngCost(): string {
    // Simple logic to generate a unique reference like 'RC001'
    const date = new Date();
    const randomPart = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `RC${date.getFullYear()}${randomPart}`;
  }

  onSubmit() {
    if (this.cotisationForm.valid) {
      const formData = this.cotisationForm.getRawValue(); // Récupère même les champs désactivés comme ref_ing_cost
      this.cotisationService.createCotisation(formData).subscribe(() => {
        this.router.navigate(['/Closer/cotisation']);
        console.log('Cotisation modifiée avec succès!')
      },
      error=> {
        console.error('Erreur lors de l\'ajout de la cotisation', error);

      }
    );
    }else {
      console.error('Le formulaire est invalide');
    }
  }

  loadUserProfile(): void {
    this.authService.getUserProfile().subscribe(
        (response: any) => {
          this.user = response;
          console.log('Utilisateur connecté:', this.user)  // Vérifie les données ici

        },
        (error) => {
            console.error('Erreur lors de la récupération du profil utilisateur:', error);
        }
    );
}
}
