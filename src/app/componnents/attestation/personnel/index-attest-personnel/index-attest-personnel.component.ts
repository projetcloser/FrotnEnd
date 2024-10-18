import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AttestPersonnel } from '../attest-personnel';
import { AttestPersonnelService } from '../attest-personnel.service';
import { Membre } from '../../../../models/membre';
import jsPDF from 'jspdf'; // Assurez-vous d'avoir installé jsPDF: `npm install jspdf`
import html2canvas from 'html2canvas';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-index-attest-personnel',
  standalone: true,
  imports: [FormsModule,
    CommonModule,ReactiveFormsModule,RouterModule,HttpClientModule ],
  templateUrl: './index-attest-personnel.component.html',
  styleUrl: './index-attest-personnel.component.css'
})
export class IndexAttestPersonnelComponent implements OnInit{
  constructor(private router: Router,private attestPersonnelService: AttestPersonnelService) {}

  attestations: AttestPersonnel[] = [];
  membres:Membre[]=[]

   // Image de la signature (fichier PNG dans le dossier assets)
   signatureImage = 'assets/signature.png';

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

  getmemberMatricule(countryId: number){
    const member = this.membres.find(p => p.id === countryId);
    return member ? member.matricule : 'Inconnu';
  }

  // Formater la date pour afficher seulement l'année
  formatDate(date: Date): string {
    return new Date(date).getFullYear().toString();
  }

  navigateToForm() {
    this.router.navigate(['/Closer/nouveau-attestPersonnel']);
  }

  navigateToFormEdit() {
    this.router.navigate(['/Closer/modifier-personne']);
  }

   // Méthode pour générer un PDF pour l'attestation
   generatePdf(attest: AttestPersonnel) {
    const doc = new jsPDF('landscape');

    // En-tête
    doc.setFontSize(12);
    doc.text('République du Cameroun', 10, 10);
    doc.text('Republic of Cameroon', 230, 10);
    doc.text('Paix - Travail - Patrie', 10, 20);
    doc.text('Peace - Work - Fatherland', 230, 20);

    doc.setFontSize(14);
    doc.text('Ordre National des Ingénieurs de Génie Civil', 100, 30);
    doc.text('National Order of Civil Engineers', 105, 40);

    doc.setLineWidth(0.5);
    doc.line(10, 50, 290, 50); // Ligne sous l'en-tête

    // Contenu central
    doc.setFontSize(16);
    doc.text('A T T E S T A T I O N', 120, 60);

    doc.setFontSize(12);
    doc.text(`Le Président de l'Ordre`, 10, 80);
    doc.text('atteste que', 10, 90);

    doc.setFontSize(14);
    doc.text(`${this.getMemberName(attest.memnbre_id)}`, 10, 100);
    doc.text('est bien inscrit au Tableau de l’Ordre pour l’année 2024', 10, 110);
    doc.text(`sous le matricule: ${this.getmemberMatricule(attest.memnbre_id)}`, 10, 120);

    doc.text('A ce titre, il est autorisé à exercer la profession', 10, 130);
    doc.text('d’Ingénieur de Génie Civil pour la période allant', 10, 140);
    doc.text('du 1er janvier 2024 au 31 décembre 2024', 10, 150);
    doc.text('et à faire prévaloir la présente attestation', 10, 160);

    doc.text('pour usage personnel.', 10, 170);

    doc.text('Fait à Yaoundé, le 04 Janvier 2024', 10, 180);
    doc.text('pour servir et valoir ce que de droit.', 10, 190);

    doc.text('Le Président de l\'Ordre', 200, 200);

    // Footer avec QR code et coordonnées (à générer avec html2canvas ou insérer comme image)
    html2canvas(document.querySelector("#qrcode") as HTMLElement).then((canvas: HTMLCanvasElement) => {
      const imgData = canvas.toDataURL('image/png');
      doc.addImage(imgData, 'PNG', 230, 220, 50, 50);

      // Ajouter l'image de la signature numérique
      doc.addImage(this.signatureImage, 'PNG', 70, 120, 50, 50); // Positionner la signature numérique

      doc.save('attestation.pdf');
    });

  }

}
