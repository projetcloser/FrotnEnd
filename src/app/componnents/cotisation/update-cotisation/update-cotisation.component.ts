import { Component } from '@angular/core';
import { CotisationService } from '../cotisation.service';
import { MembreServiceService } from '../../membre/membre-service.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CaisseServiceService } from '../../Caisse/caisse-service.service';
import { Cotisation } from '../cotisation';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update-cotisation',
  standalone: true,
  imports: [CommonModule, FormsModule,ReactiveFormsModule,RouterModule],
  templateUrl: './update-cotisation.component.html',
  styleUrl: './update-cotisation.component.css'
})
export class UpdateCotisationComponent {

  cotisationId!: number;
  cotisation!: Cotisation;
  cotisationForm!: FormGroup;
  membres: any[] = [];
  caisses: any[] = [];
  currentYear: number = new Date().getFullYear(); // Année actuelle

  currentTime = new Date();
  currentDay = new Date();

  constructor(public cotisationService:CotisationService,
    private caisseService:CaisseServiceService,private membreService:MembreServiceService,
    private router:Router, private route:ActivatedRoute,
    private fb: FormBuilder
  ){}

  ngOnInit(): void {
    // this.id = this.route.snapshot.params['id'];
    this.cotisationId = Number(this.route.snapshot.paramMap.get('id'));

   // Charger l'entreprise à mettre à jour
   this.cotisationService.getCotisationById(this.cotisationId).subscribe((data: Cotisation) => {
    this.cotisation = data;
    console.log(this.cotisation);


    this.cotisationForm = this.fb.group({
      amount: [this.cotisation.amount],
      author: [this.cotisation.author],
      member_id: [this.cotisation.member_id],
      cashflow_id: [this.cotisation.cashflow_id],
      // staff_id: [this.cotisation.staff_id],
      pay: [this.cotisation.pay],
      pay_year: [this.cotisation.pay_year],
      status: [this.cotisation.status]
    });
  });

    // Charger la liste des caisses
    this.caisseService.getAll().subscribe((data: any[]) => {
      this.caisses = data;
    });

    // Charger la liste des membres
    this.membreService.getAll().subscribe((data: any[]) => {
      this.membres = data;
    });
  }
  onSubmit(): void {
    if (this.cotisationForm.valid) {
      this.cotisationService.updateCotisation(this.cotisationId, this.cotisationForm.value).subscribe(() => {
        this.router.navigate(['/Closer/cotisation']);
      });
    }
  }
}
