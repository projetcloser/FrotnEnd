import { Component, OnInit } from '@angular/core';
import { Dette } from '../model/dette';
import { Membre } from '../../../models/membre';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { DetteServiceService } from '../dette-service.service';
import { MembreServiceService } from '../../membre/membre-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-details-dette',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule,RouterModule],
  templateUrl: './details-dette.component.html',
  styleUrl: './details-dette.component.css'
})
export class DetailsDetteComponent implements OnInit {
  debtId!: number;
  debt!: Dette;
  member!: Membre;

  constructor(
    private route: ActivatedRoute,
    private debtService: DetteServiceService,
    private memberService: MembreServiceService
  ) {}

  ngOnInit(): void {
    this.debtId = Number(this.route.snapshot.paramMap.get('id'));
    this.getDebtDetails();
    // this.getMemberDetails(memberId);
  }

  getDebtDetails(): void {
    this.debtService.getDetteById(this.debtId).subscribe((debt: Dette) => {
      this.debt = debt;
      this.getMemberDetails(debt.membre_id); // Récupérer les détails du membre
    });
  }

  getMemberDetails(memberId: number): void {
    this.memberService.find(memberId).subscribe((data: Membre) => {
      this.member = data;
      console.log('Détails du membre:', this.member);

    });
  }
}
