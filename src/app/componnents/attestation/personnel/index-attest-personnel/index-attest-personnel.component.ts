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
   signatureImage = 'assets/img/1.jpg';
   qrCodeImage = 'assets/img/2.jpg';

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
   generatePdf(attest: AttestPersonnel): void {
    const doc = new jsPDF('portrait');

    // Récupérer la date du jour
    const today = new Date();
    const formattedDate = today.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    // En-tête bilingue
    doc.setFontSize(12);
    doc.text('République du Cameroun', 20, 20);
    doc.text('Republic of Cameroon', 140, 20);
    doc.text('Paix - Travail - Patrie', 20, 30);
    doc.text('Peace - Work - Fatherland', 140, 30);

    doc.setFontSize(14);
    doc.text('Ordre National des Ingénieurs de Génie Civil', 60, 50);
    doc.text('National Order of Civil Engineers', 65, 60);

    // Numéro de référence
    doc.setFontSize(12);
    doc.text('N° 0901 / 01 /Pdt/SG/ONIGC/24', 80, 80);

    // Titre central - ATTESTATION
    doc.setFontSize(18);
    doc.text('A T T E S T A T I O N', 75, 100);

    // Corps du texte
    doc.setFontSize(14);
    doc.text('Le Président de l’Ordre', 20, 120);
    doc.text('atteste que', 20, 130);

    // Nom de l'ingénieur et matricule
    doc.setFontSize(16);
    doc.text('l’Ingénieur NNOMO AMOUGOU THIERRY FABRICE', 20, 140);
    doc.text('est bien inscrit au Tableau de l’Ordre pour l’année 2024', 20, 150);
    doc.text(`sous le matricule: ${this.getmemberMatricule(attest.member_id)}`, 20, 160);

    // Texte relatif à l'exercice de la profession
    doc.setFontSize(14);
    doc.text('A ce titre, il est autorisé à exercer la profession', 20, 170);
    doc.text('d’Ingénieur de Génie Civil pour la période allant', 20, 180);
    doc.text('du 1er janvier 2024 au 31 décembre 2024', 20, 190);
    doc.text('et à faire prévaloir la présente attestation', 20, 200);
    doc.text('pour usage personnel.', 20, 210);

    // Date et signature
    doc.text(`Fait à Yaoundé, le ${formattedDate}`, 20, 220);
    doc.text('pour servir et valoir ce que de droit.', 20, 230);
    doc.text('Le Président de l\'Ordre', 140, 250);

    // Footer avec QR code et coordonnées
    const qrCodeImg = new Image();
    qrCodeImg.src = 'assets/img/1.jpg'; // Chemin vers l'image du QR code
    qrCodeImg.onload = () => {
      doc.addImage(qrCodeImg, 'PNG', 150, 260, 40, 40); // Position du QR code

      const signatureImg = new Image();
      signatureImg.src = 'assets/img/2.jpg'; // Chemin vers l'image de la signature numérique
      signatureImg.onload = () => {
        doc.addImage(signatureImg, 'PNG', 30, 260, 40, 40); // Position de la signature numérique

        // Ajouter le texte du footer
        doc.setFontSize(10);
        doc.text('Ce document est généré par CLOSER.(c)', 70, 270);
        doc.text('Le QR-CODE atteste de son authenticité', 70, 280);
        doc.text('Montée Elig Essono - Yaoundé - 20822- (+237) 677.66.10.66 / 655.01.02.03 - noceonigc@yahoo.fr - www.onigc.cm', 20, 290);
        doc.text('Comptes bancaires : BICEC Yaoundé – Vallée sous le N° 31615665001-03 / ECOBANK Yaoundé - Hippodrome sous le N° 01316146701-72', 20, 300);

        // Sauvegarder le PDF
        doc.save(`attestation_${attest}.pdf`);
      };
    };
  }


}
