import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AttestPersonnel } from '../attest-personnel';
import { AttestPersonnelService } from '../attest-personnel.service';
import { Membre } from '../../../../models/membre';
import jsPDF from 'jspdf'; // Assurez-vous d'avoir installé jsPDF: `npm install jspdf`
import QRCode from 'qrcode';
import html2canvas from 'html2canvas';
import { HttpClientModule } from '@angular/common/http';
import { PaginationComponent } from '../../../../components/pagination/pagination.component';
import { PaginationService } from '../../../../components/pagination.service';

@Component({
  selector: 'app-index-attest-personnel',
  standalone: true,
  imports: [FormsModule,
    CommonModule, ReactiveFormsModule, RouterModule, HttpClientModule, PaginationComponent],
  templateUrl: './index-attest-personnel.component.html',
  styleUrl: './index-attest-personnel.component.css'
})
export class IndexAttestPersonnelComponent implements OnInit {
  constructor(private router: Router, private attestPersonnelService: AttestPersonnelService,
    private paginationService: PaginationService) { }

  attestations: AttestPersonnel[] = [];
  membres: Membre[] = []

  // pagination
  paginatedData: any[] = []; // Données de la page courante

  currentPage: number = 1;
  pageSize: number = 10;
  totalItems: number = 0;

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
      // pagination
      this.totalItems = this.attestations.length;
      this.updatePage();

    });
  }


  getMemberALL(): void {
    this.attestPersonnelService.getMember().subscribe(members => {
      this.membres = members;
    });
  }

  getMemberName(countryId: number): string {
    const member = this.membres.find(p => p.id === countryId);
    return member ? member.lastname : 'Inconnu';
  }

  getmemberMatricule(countryId: number) {
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
  // generatePdf(attest: AttestPersonnel): void {

  //   const doc = new jsPDF('portrait');

  //   // Récupérer la date du jour
  //   const today = new Date();
  //   const formattedDate = today.toLocaleDateString('fr-FR', {
  //     year: 'numeric',
  //     month: 'long',
  //     day: 'numeric'
  //   });

  //   // En-tête bilingue
  //   doc.setFontSize(12);
  //   doc.text('République du Cameroun', 20, 20);
  //   doc.text('Republic of Cameroon', 140, 20);
  //   doc.text('Paix - Travail - Patrie', 20, 30);
  //   doc.text('Peace - Work - Fatherland', 140, 30);

  //   doc.setFontSize(14);
  //   doc.text('Ordre National des Ingénieurs de Génie Civil', 60, 50);
  //   doc.text('National Order of Civil Engineers', 65, 60);

  //   // Numéro de référence
  //   doc.setFontSize(12);
  //   doc.text('N° 0901 / 01 /Pdt/SG/ONIGC/24', 80, 80);

  //   // Titre central - ATTESTATION
  //   doc.setFontSize(18);
  //   doc.text('A T T E S T A T I O N', 75, 100);

  //   // Corps du texte
  //   doc.setFontSize(14);
  //   doc.text('Le Président de l’Ordre', 20, 120);
  //   doc.text('atteste que', 20, 130);

  //   // Nom de l'ingénieur et matricule
  //   doc.setFontSize(16);
  //   doc.text('l’Ingénieur NNOMO AMOUGOU THIERRY FABRICE', 20, 140);
  //   doc.text('est bien inscrit au Tableau de l’Ordre pour l’année 2024', 20, 150);
  //   doc.text(`sous le matricule: ${this.getmemberMatricule(attest.member_id)}`, 20, 160);

  //   // Texte relatif à l'exercice de la profession
  //   doc.setFontSize(14);
  //   doc.text('A ce titre, il est autorisé à exercer la profession', 20, 170);
  //   doc.text('d’Ingénieur de Génie Civil pour la période allant', 20, 180);
  //   doc.text('du 1er janvier 2024 au 31 décembre 2024', 20, 190);
  //   doc.text('et à faire prévaloir la présente attestation', 20, 200);
  //   doc.text('pour usage personnel.', 20, 210);

  //   // Date et signature
  //   doc.text(`Fait à Yaoundé, le ${formattedDate}`, 20, 220);
  //   doc.text('pour servir et valoir ce que de droit.', 20, 230);
  //   doc.text('Le Président de l\'Ordre', 140, 250);

  //   // Footer avec QR code et coordonnées
  //   const qrCodeImg = new Image();
  //   qrCodeImg.src = 'assets/img/1.jpg'; // Chemin vers l'image du QR code
  //   qrCodeImg.onload = () => {
  //     doc.addImage(qrCodeImg, 'PNG', 150, 260, 40, 40); // Position du QR code

  //     const signatureImg = new Image();
  //     signatureImg.src = 'assets/img/2.jpg'; // Chemin vers l'image de la signature numérique
  //     signatureImg.onload = () => {
  //       doc.addImage(signatureImg, 'PNG', 30, 260, 40, 40); // Position de la signature numérique

  //       // Ajouter le texte du footer
  //       doc.setFontSize(10);
  //       doc.text('Ce document est généré par CLOSER.(c)', 70, 270);
  //       doc.text('Le QR-CODE atteste de son authenticité', 70, 280);
  //       doc.text('Montée Elig Essono - Yaoundé - 20822- (+237) 677.66.10.66 / 655.01.02.03 - noceonigc@yahoo.fr - www.onigc.cm', 20, 290);
  //       doc.text('Comptes bancaires : BICEC Yaoundé – Vallée sous le N° 31615665001-03 / ECOBANK Yaoundé - Hippodrome sous le N° 01316146701-72', 20, 300);

  //       // Sauvegarder le PDF
  //       doc.save(`attestation_${attest}.pdf`);
  //     };
  //   };
  // }


  // generatePdf(attest: AttestPersonnel): void {
  //   const doc = new jsPDF('portrait');

  //   // Récupérer la date du jour
  //   const today = new Date();
  //   const formattedDate = today.toLocaleDateString('fr-FR', {
  //     year: 'numeric',
  //     month: 'long',
  //     day: 'numeric'
  //   });

  //   // En-tête bilingue
  //   doc.setFontSize(12);
  //   doc.text('République du Cameroun', 20, 20);
  //   doc.text('Republic of Cameroon', 140, 20);
  //   doc.text('Paix - Travail - Patrie', 20, 30);
  //   doc.text('Peace - Work - Fatherland', 140, 30);

  //   // Ordre National
  //   doc.setFontSize(14);
  //   doc.text('Ordre National des Ingénieurs de Génie Civil', 50, 50);
  //   doc.text('National Order of Civil Engineers', 55, 60);

  //   // Numéro de référence
  //   doc.setFontSize(12);
  //   doc.text(`N° 00145789`, 80, 80);

  //   // Titre central - ATTESTATION
  //   doc.setFontSize(18);
  //   doc.setTextColor(0, 0, 128); // Couleur bleue
  //   doc.text('A T T E S T A T I O N', 75, 100);

  //   // Corps du texte
  //   doc.setFontSize(14);
  //   doc.setTextColor(0, 0, 0); // Noir par défaut
  //   doc.text('Le Président de l’Ordre', 20, 120);
  //   doc.text('atteste que', 20, 130);
  //   doc.text(`l’Ingénieur ABANDA Jean Roger`, 20, 140);
  //   doc.text(`est bien inscrit au Tableau de l’Ordre pour l’année 2004`, 20, 150);
  //   doc.text(`sous le matricule 02414.`, 20, 160);

  //   doc.text('A ce titre, il est autorisé à exercer la profession', 20, 170);
  //   doc.text('d’Ingénieur de Génie Civil pour la période allant', 20, 180);
  //   doc.text(`du 1er janvier 2025au 31 décembre 2025.`, 20, 190);
  //   doc.text('et à faire prévaloir la présente attestation pour usage personnel.', 20, 200);

  //   // Date et lieu
  //   doc.text(`Fait à Yaoundé, le 26/12/2024`, 20, 220);

  //   // QR Code
  //   // const qrCodeData = `
  //   //   N° Attestation: 00122
  //   //   Nom de l’Ingénieur: ABANDA Jean Roger
  //   //   Année: 2024
  //   //   Matricule: 02141
  //   //   Date: 26/12/2024
  //   // `;
  //   // const qrCodeSize = 50;
  //   // const qrCode = new QRCode({
  //   //     content: qrCodeData,
  //   //     width: qrCodeSize,
  //   //     height: qrCodeSize,
  //   // });
  //   // const qrCodeBase64 = qrCode.toDataURL();
  //   // doc.addImage(qrCodeBase64, 'PNG', 20, 240, qrCodeSize, qrCodeSize);

  //   // Cachet et signature
  //   doc.addImage('path/to/cachet.png', 'PNG', 120, 240, 50, 40);
  //   doc.setFontSize(12);
  //   doc.text('Le Président de l’Ordre', 130, 290);

  //   // Footer
  //   doc.setFontSize(10);
  //   doc.setTextColor(54, 95, 145); // Bleu foncé
  //   doc.text('Montée Elig Essono - Yaoundé - BP 20822 - (+237) 677.66.10.66 / 655.01.02.03', 20, 300);
  //   doc.text('Email: noceonigc@yahoo.fr - www.onigc.cm', 20, 310);

  //   doc.save(`Attestation_andy.pdf`);
  // }
  // generatePdf(attest: AttestPersonnel): void {
  //   const doc = new jsPDF('portrait', 'mm', 'A4');

  //   // Récupérer les données

  //   // Date actuelle formatée
  //   const today = new Date();
  //   const formattedDate = today.toLocaleDateString('fr-FR', {
  //     year: 'numeric',
  //     month: 'long',
  //     day: 'numeric'
  //   });

  //   // En-tête bilingue
  //   doc.setFontSize(12);
  //   doc.text('République du Cameroun', 20, 20);
  //   doc.text('Republic of Cameroon', 140, 20);
  //   doc.text('Paix - Travail - Patrie', 20, 30);
  //   doc.text('Peace - Work - Fatherland', 140, 30);

  //   // Ordre National
  //   doc.setFontSize(14);
  //   doc.setFont('helvetica', 'bold');
  //   doc.text('Ordre National des Ingénieurs de Génie Civil', 50, 50);
  //   doc.text('National Order of Civil Engineers', 55, 60);

  //   // Numéro de référence
  //   doc.setFontSize(12);
  //   doc.text(`N° 00000`, 130, 70);

  //   // Titre central - ATTESTATION
  //   doc.setFontSize(18);
  //   doc.setTextColor(0, 0, 128); // Bleu
  //   doc.text('A T T E S T A T I O N', 75, 90);

  //   // Corps du texte
  //   doc.setFontSize(14);
  //   doc.setTextColor(0, 0, 0); // Noir
  //   doc.text('Le Président de l’Ordre', 20, 110);
  //   doc.text('atteste que', 20, 120);

  //   // Nom de l'ingénieur
  //   doc.setFont('helvetica', 'bold');
  //   doc.text(`l’Ingénieur xxxxxxx`, 20, 130);
  //   doc.setFont('helvetica', 'normal');
  //   doc.text(`est bien inscrit au Tableau de l’Ordre pour l’année xxxx`, 20, 140);
  //   doc.text(`sous le matricule xx-xxxx`, 20, 150);

  //   // Validité
  //   doc.text(
  //     `A ce titre, il est autorisé à exercer la profession d’Ingénieur de Génie Civil pour la période allant du 1er janvier xxxx au 31 décembre xxxxx`,
  //     20,
  //     160
  //   );
  //   doc.text(`et à faire prévaloir la présente attestation dans le cadre de xxxxx`, 20, 170);

  //   // Date et lieu
  //   doc.text(`Fait à Yaoundé, le xxxxx`, 20, 190);

  //   // QR Code
  //   // const qrCodeText = `N° Attestation: ${ref}\nNom de l’ingénieur: ${ingenieur}\nTableau de l’Ordre: ${annee}\nMatricule: ${matricule}\nDate: ${formattedDate}`;
  //   // const qrCodeSize = 30; // Taille du QR code
  //   // const qrCodeX = 20; // Position X du QR
  //   // const qrCodeY = 200; // Position Y du QR

  //   // const qrCodeCanvas = document.createElement('canvas');
  //   // QRCode.toCanvas(qrCodeCanvas, qrCodeText, { width: qrCodeSize });
  //   // const qrCodeDataURL = qrCodeCanvas.toDataURL('image/png');
  //   // doc.addImage(qrCodeDataURL, 'PNG', qrCodeX, qrCodeY, qrCodeSize, qrCodeSize);

  //   // Cachet
  //   doc.addImage('assets/img/signe.jpg', 'PNG', 130, 200, 50, 50);

  //   // Bas de page
  //   doc.setFontSize(10);
  //   doc.setFont('helvetica', 'italic');
  //   doc.text('Ce document est généré par CLOSER (c)', 20, 270);
  //   doc.text('Le QR-CODE atteste de son authenticité', 20, 275);
  //   doc.setFont('helvetica', 'bold');
  //   doc.text(
  //     'Montée Elig Essono - Yaoundé - 20822 - (+237) 677.66.10.66 / 655.01.02.03 - noceonigc@yahoo.fr - www.onigc.cm',
  //     20,
  //     280
  //   );

  //   // Exporter le PDF
  //   doc.save(`Attestation_xxxx.pdf`);
  // }

  generatePdf(attest: AttestPersonnel): void {
    const doc = new jsPDF('portrait', 'mm', 'A4');

    // Date actuelle formatée
    const today = new Date();
    const formattedDate = today.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    // En-tête avec une image
    try {
      doc.addImage('assets/img/header.jpg', 'PNG', 10, 5, 190, 45);
    } catch (error) {
      console.error('Erreur lors de l’ajout de l’en-tête :', error);
    }

    // Numéro de référence
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text(`N° 0972 / 01 /Pdt/SG/ONIGC/24`, 120, 60);

    // Titre central - ATTESTATION
    doc.setFontSize(24);
    // doc.setTextColor(0, 0, 128); // Bleu
    doc.text('A T T E S T A T I O N', 102, 85, { align: 'center' });

    // Corps du texte
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0); // Noir
    doc.text('Le Président de l’Ordre', 70, 100);
    doc.setFont('helvetica', 'normal');
    doc.text('atteste que', 85, 108);

    // Nom de l'ingénieur
    doc.setFont('helvetica', 'bold');
    doc.text(`l’Ingénieur DJABARA Appolinaire`, 55, 116);
    doc.setFont('helvetica', 'normal');
    doc.text(
      `est bien inscrit au Tableau de l’Ordre pour l’année 2024`,
      35,
      124
    );
    doc.text(`sous le matricule 24- 3614`, 70, 132);

    // Validité
    doc.setFontSize(14);
    doc.text(
      `A ce titre, il est autorisé à exercer la profession `,
      50,
      146
    );
    doc.text(
      `d’Ingénieur de Génie Civil pour la période allant `,
      50,
      154
    );
    doc.text(
      `du 1er janvier xxxxx au 31 décembre xxxxx.`,
      53,
      162
    );
    doc.text(
      `et à faire prévaloir la présente attestation`,
      53,
      170
    );
    doc.setTextColor(0, 0, 128);
    doc.text(
      `pour  usage personnel`,
      72,
      178
    );

    // Date et lieu
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(0, 0, 0); // Noir
    doc.text(`Fait à Yaoundé, le ${formattedDate}  pour servir et valoir ce que de droit.`, 20, 190);



    // QR Code
    const qrCodeText = `N° Attestation: xxx\nNom de l’ingénieur: xxx\nTableau de l’Ordre: xxxx\nMatricule: xxxx\nDate: ${formattedDate}`;
    const qrCodeSize = 30; // Taille du QR code
    try {
      const qrCodeCanvas = document.createElement('canvas');
      QRCode.toCanvas(qrCodeCanvas, qrCodeText, { width: qrCodeSize });
      const qrCodeDataURL = qrCodeCanvas.toDataURL('image/png');
      doc.addImage(qrCodeDataURL, 'PNG', 38, 215, qrCodeSize, qrCodeSize);
    } catch (error) {
      console.error('Erreur lors de la génération du QR Code :', error);
    }



    // Cachet
    try {
      doc.addImage('assets/img/signe2.png', 'PNG', 130, 213, 40, 40);
    } catch (error) {
      console.error('Erreur lors de l’ajout du cachet :', error);
    }
    doc.setFont('helvetica', 'bold');
    doc.line(130, 216, 185, 216); // Ligne horizontale
    doc.text(
      `Le Président de l'Ordre`,
      130,
      215
    );

    // Bas de page
    doc.setFontSize(10);
    doc.setFont('helvetica', 'italic');
    doc.text('Ce document est généré par CLOSER (c)', 20, 250);
    doc.text('Le QR-CODE atteste de son authenticité', 20, 255);
    try {
      doc.addImage('assets/img/footer.jpg', 'PNG', 20, 260, 170, 15);
    } catch (error) {
      console.error('Erreur lors de l’ajout du pied de page :', error);
    }

    // Exporter le PDF
    const fileName = `Attestation_xxxx.pdf`;
    doc.save(fileName);
  }



  // pagination

  updatePage(): void {
    this.paginatedData = this.paginationService.paginate(
      this.attestations,
      this.currentPage,
      this.pageSize
    );
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.updatePage();
  }


}
