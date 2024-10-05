import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AttestPersonnelService } from '../attest-personnel.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-update-attest-personnel',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './update-attest-personnel.component.html',
  styleUrl: './update-attest-personnel.component.css'
})
export class UpdateAttestPersonnelComponent implements OnInit{

  attestationId!: number;
  newStatus!: number;

  constructor(
    private route: ActivatedRoute,
    private attestService: AttestPersonnelService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Récupérer l'ID de l'attestation à partir de l'URL
    this.attestationId = this.route.snapshot.params['id'];
    
    // Appeler une méthode pour modifier le statut
    // this.modifierStatut();
  }

  modifierStatut(newStatus: number) {
    // Mettre à jour le statut en fonction de la sélection de l'utilisateur
    this.attestService.updateStatut(this.attestationId, newStatus).subscribe(response => {
      // Rediriger vers la liste des attestations après modification
      this.router.navigate(['/attestPersonnel']);
    });
  }

}
