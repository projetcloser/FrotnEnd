import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Membre } from '../../../models/membre';
import { Dette } from '../model/dette';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { DetteServiceService } from '../dette-service.service';
import { MembreServiceService } from '../../membre/membre-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update-dette',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule,RouterModule],
  templateUrl: './update-dette.component.html',
  styleUrl: './update-dette.component.css'
})
export class UpdateDetteComponent implements OnInit {
  debtForm: FormGroup;
  debtId!: number;
  members: Membre[] = [];
  debt!: Dette;

  constructor(
    private formBuilder: FormBuilder,
    private debtService: DetteServiceService,
    private memberService: MembreServiceService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.debtForm = this.formBuilder.group({
      membre_id: ['', Validators.required],
      montant: ['', [Validators.required, Validators.min(0)]],
      date_echeance: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.debtId = Number(this.route.snapshot.paramMap.get('id'));
    this.getDebtDetails();
    this.getMembers();
  }

  getDebtDetails(): void {
    this.debtService.getDetteById(this.debtId).subscribe((debt: Dette) => {
      this.debt = debt;

      // Initialiser le formulaire avec les valeurs récupérées
      this.debtForm = this.formBuilder.group({
        membre_id: [debt.membre_id, Validators.required],
        montant: [debt.montant, [Validators.required, Validators.min(0)]],
        date_echeance: [debt.date_echeance, Validators.required]
      });
    });
  }

  getMembers(): void {
    this.memberService.getAll().subscribe((members: Membre[]) => {
      this.members = members;
    });
  }

  onSubmit(): void {
    if (this.debtForm.valid) {
      this.debtService.updateDette(this.debtId, this.debtForm.value).subscribe(() => {
        this.router.navigate(['/Closer/dettes']);
      });
    }
  }

}
