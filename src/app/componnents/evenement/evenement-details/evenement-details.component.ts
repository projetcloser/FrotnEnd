import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { EvenementService } from '../evenement.service';
import { Evenement } from '../evenement';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-evenement-details',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule,RouterModule],
  templateUrl: './evenement-details.component.html',
  styleUrl: './evenement-details.component.css'
})
export class EvenementDetailsComponent implements OnInit {
  eventId!: number;
  event!: Evenement;
  // member!: Membre;

  constructor(
    private route: ActivatedRoute,
    private eventService: EvenementService,
    // private memberService: MembreServiceService
  ) {}

  ngOnInit(): void {
    this.eventId = Number(this.route.snapshot.paramMap.get('id'));
    this.geteventDetails();
    // this.getMemberDetails(memberId);
  }

  geteventDetails(): void {
    this.eventService.getEvenementById(this.eventId).subscribe((data: Evenement) => {
      this.event = data;
      console.log('evenement', event);

      // this.getMemberDetails(event.membre_id); // Récupérer les détails du membre
    });
  }

  // getMemberDetails(memberId: number): void {
  //   this.memberService.find(memberId).subscribe((data: Membre) => {
  //     this.member = data;
  //     console.log('Détails du membre:', this.member);

  //   });
}

