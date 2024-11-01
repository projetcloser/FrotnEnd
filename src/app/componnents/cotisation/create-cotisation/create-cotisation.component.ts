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
  membres: any[] = []
  user:any[]=[]

  currentTime = new Date();
  currentDay = new Date();
  currentYear: number = new Date().getFullYear(); // Récupère l'année actuelle

  constructor(public cotisationService:CotisationService,
    private caisseService:CaisseServiceService,private membreService:MembreServiceService,private authService: AuthService,
    private router:Router,private fb: FormBuilder,){

  }

  ngOnInit():void{
    this.cotisationForm = this.fb.group({
      cashflow_id: [''],
      member_id: [''],
      pay_year: [this.currentYear], // Année actuelle
      ref_ing_cost: ['' ,[Validators.required]],
      amount: [60000], // Valeur par défaut
      pay: [60000], // Valeur par défaut
      // status: [''],
      author: [this.user],
      open_close: [0],
    });

    this.loadCaisse();
    this.loadMembers();
    this.loadUserProfile();

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

  get f(){
    return this.cotisationForm.controls;
  }

  onSubmit() {
    if (this.cotisationForm.valid) {
      // const caisseData = this.caisseForm.value;
      this.cotisationService.createCotisation(this.cotisationForm.value).subscribe(() => {
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
          this.user = response.name;
          console.log('Utilisateur connecté:', this.user)  // Vérifie les données ici

        },
        (error) => {
            console.error('Erreur lors de la récupération du profil utilisateur:', error);
        }
    );
}
}
