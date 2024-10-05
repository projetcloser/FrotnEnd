import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AttestPersonnel } from '../attest-personnel';
import { AttestPersonnelService } from '../attest-personnel.service';
import { Membre } from '../../../../models/membre';

@Component({
  selector: 'app-index-attest-personnel',
  standalone: true,
  imports: [FormsModule,
    CommonModule,ReactiveFormsModule,RouterModule],
  templateUrl: './index-attest-personnel.component.html',
  styleUrl: './index-attest-personnel.component.css'
})
export class IndexAttestPersonnelComponent implements OnInit{
  constructor(private router: Router,private attestPersonnelService: AttestPersonnelService) {}

  attestations: AttestPersonnel[] = [];
  membres:Membre[]=[]

  ngOnInit(): void {
    this.getAttestations();
    this.getMemberALL();
  }

  getAttestations(): void {
    this.attestPersonnelService.getAll().subscribe((data: AttestPersonnel[]) => {
      this.attestations = data;

    });
  }


  getMemberALL(): void {
    this.attestPersonnelService.getMember().subscribe(members => {
      this.membres = members;
    });
  }

  getMemberName(countryId: number): string {
    const member = this.membres.find(p => p.id === countryId);
    return member ? member.firstname : 'Inconnu';
  }

  // Formater la date pour afficher seulement l'année
  formatDate(date: Date): string {
    return new Date(date).getFullYear().toString();
  }

  navigateToForm() {
    this.router.navigate(['/nouveau-attestPersonnel']);
  }

  navigateToFormEdit() {
    this.router.navigate(['/modifier-personne']);
  }

}
