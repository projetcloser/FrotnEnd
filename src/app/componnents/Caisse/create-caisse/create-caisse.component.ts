import { Component, OnInit } from '@angular/core';
import { Caisse } from '../../../models/caisse';
import { CaisseServiceService } from '../caisse-service.service';
import { Router } from '@angular/router';
import { Personnel } from '../../personnel/personnel';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-caisse',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './create-caisse.component.html',
  styleUrl: './create-caisse.component.css'
})
export class CreateCaisseComponent implements OnInit{
  caisseForm!: FormGroup;
  personnels: Personnel[] = [];

  constructor(private caisseService: CaisseServiceService, private router: Router,private fb: FormBuilder,) { }

  ngOnInit(): void {
    this.caisseForm = this.fb.group({
      name: ['', Validators.required],
      personnel_id: [null, Validators.required],
      code: ['', Validators.required],
      balance: [0, Validators.required],
      created_at: [new Date().toISOString().split('T')[0], Validators.required]
    });

    // Récupérer la liste des personnels
    this.caisseService.getPersonnels().subscribe(data => {
      this.personnels = data;
    });
  }

  // Soumission du formulaire
  onSubmit(): void {
    if (this.caisseForm.valid) {
      const caisseData = this.caisseForm.value;
      this.caisseService.create(caisseData).subscribe(() => {
        this.router.navigate(['/caisse']);
      });
    }
  }
}
