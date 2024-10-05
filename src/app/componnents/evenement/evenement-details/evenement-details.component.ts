import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EvenementService } from '../evenement.service';
import { Evenement } from '../evenement';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-evenement-details',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './evenement-details.component.html',
  styleUrl: './evenement-details.component.css'
})
export class EvenementDetailsComponent implements OnInit {
  evenement: Evenement | undefined;
  constructor(
    private route: ActivatedRoute,
    private evenementService: EvenementService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.evenementService.getEvenementById(id).subscribe((data: Evenement) => {
      this.evenement = data;
    });
  }
}
