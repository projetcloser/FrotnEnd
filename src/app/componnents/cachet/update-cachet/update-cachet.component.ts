import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Cachet } from '../cachet';
import { CachetService } from '../cachet.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { VilleServiceService } from '../../ville/ville-service.service';
import { PaysServiceService } from '../../pays/pays-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update-cachet',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule,RouterModule],
  templateUrl: './update-cachet.component.html',
  styleUrl: './update-cachet.component.css'
})
export class UpdateCachetComponent {

  companyForm!: FormGroup;
  companyId!: number;
  company!: Cachet;
  countries: any[] = [];
  cities: any[] = [];
  members: any[] = [];

  currentTime = new Date();
  currentDay = new Date();

    // Définir les options de statut
    statusOptions = [
      { value: 1, label: 'En cours de fabrication' },
      { value: 2, label: 'Disponible' },
      { value: 3, label: 'Envoyée' },
      { value: 4, label: 'Livrée' },
    ];

  constructor( public companyService: CachetService, private router:Router, private route:ActivatedRoute,
    private fb: FormBuilder, private countryService: PaysServiceService, cityService:VilleServiceService
  ){}

  ngOnInit(): void {
    // this.id = this.route.snapshot.params['id'];
    this.companyId = Number(this.route.snapshot.paramMap.get('id'));

    // Charger l'entreprise à mettre à jour
    this.companyService.find(this.companyId).subscribe((data: Cachet) => {
      this.company = data;

      this.companyForm = this.fb.group({
        receipt_number: [this.company.receipt_number],
        author: [this.company.author],
        phone: [this.company.phone],
        year: [this.company.year],
        // nui: [this.company.nui],
        // type: [this.company.company_type],
        member_id: [this.company.member_id],
        city_id: [this.company.city_id],
        status: [this.company.status]
      });
    });

    // Charger la liste des pays
    this.companyService.getCountries().subscribe((data: any[]) => {
      this.countries = data;
    });

    // Charger la liste des villes
    this.companyService.getCities().subscribe((data: any[]) => {
      this.cities = data;
    });

      // Charger la liste des villes
      this.companyService.getMembers().subscribe((data: any[]) => {
        this.members = data;
      })

      
  }
  onSubmit(): void {
    if (this.companyForm.valid) {
      this.companyService.updateCachet(this.companyId, this.companyForm.value).subscribe(() => {
        this.router.navigate(['/Closer/cachet']);
      });
    }
  }

}
