import { NonPayeService } from './../non-paye.service';
import jsPDF from 'jspdf';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { NonPaye } from '../non-paye';
import { Membre } from '../../../../models/membre';
import { Entreprise } from '../../../../models/entreprise';
import { EntrepriseServiceService } from '../../../entreprise/entreprise-service.service';
import { PaginationComponent } from '../../../../components/pagination/pagination.component';
import { PaginationService } from '../../../../components/pagination.service';
import { Payment } from '../payer/payment';
import QRCode from 'qrcode';

@Component({
  selector: 'app-index-non-paye',
  standalone: true,

  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule, PaginationComponent],

  templateUrl: './index-non-paye.component.html',
  styleUrl: './index-non-paye.component.css'
})
export class IndexNonPayeComponent {
  attestations: NonPaye[] = [];
  statusFilter = 1; // Filtre par défaut : non payé
  members: Membre[] = [];
  companies: Entreprise[] = [];

  // seracc back
  searchForm: FormGroup;

  // pagination
  paginatedData: any[] = []; // Données de la page courante

  currentPage: number = 1;
  pageSize: number = 10;
  totalItems: number = 0;

  constructor(private fb: FormBuilder, private router: Router,
    private attestationService: NonPayeService, private entrepriseService: EntrepriseServiceService,
    private paginationService: PaginationService) {

    this.searchForm = this.fb.group({
      keyword: [''],
      company_id: [''],
      year: [''],
      motif: [''],
      member_id: [''],
    });
  }

  ngOnInit(): void {
    // this.loadAttestations();
    this.loadAttestationsByStatus(this.statusFilter);
    this.getMemberALL();
    this.getCompanies();
  }

  loadAttestationsByStatus(status: number): void {
    this.attestationService.getAttestationsByStatus(status).subscribe(
      (data) => {
        this.attestations = data;
        // pagination
        this.totalItems = this.attestations.length;
        this.updatePage();
      },
      (error) => {
        console.error('Erreur lors du chargement des attestations', error);
      }
    );
  }
  onSearch() {
    const filters = this.searchForm.value;
    this.attestationService.searchStaff(filters).subscribe((data) => {
      this.attestations = data;
    });
  }

  // loadAttestations(): void {
  //   this.attestationService.getAttestations().subscribe(data => {
  //     this.attestations = data;
  //     console.log('info sur attestationentreprise', this.attestations);

  //   });
  // }



  deleteAttestation(id: number): void {
    this.attestationService.deleteAttestation(id).subscribe(() => {
      // this.loadAttestations();
      this.loadAttestationsByStatus(this.statusFilter);
      console.log('Suppression confirmée pour l\'ID:', id);

    });
  }

  navigateToForm() {
    this.router.navigate(['/Closer/nouvelle-attestation-non_paye']);
  }

  navigateToFormEdit() {
    this.router.navigate(['/Closer/modifier-attestation-non_paye,']);
  }

  // Méthode de confirmation avant la suppression
  confirmDelete(id: number) {
    const confirmed = confirm("Êtes-vous sûr de vouloir supprimer cet élément ?");
    if (confirmed) {
      this.deleteAttestation(id);
    }
  }

  // Suppression de la personne avec l'ID donné
  deletePersonnel(id: number) {
    // Vous pouvez appeler ici votre service pour la suppression, par exemple :
    // this.attestationService.(id).subscribe(response => { ... });
    console.log('Suppression confirmée pour l\'ID:', id);
    // Redirection ou autre logique après la suppression
  }


  getCompanies(): void {
    this.entrepriseService.getAll().subscribe(data => {
      this.companies = data;
      console.log('info sur les companies ayant une attestation d\'esntreprise', this.companies);

    });
  }

  getCompaniesNames(idCompanies: number): string {
    const entreprises = this.companies.find(e => e.id === idCompanies);
    return entreprises ? entreprises.social_reason : 'Inconnue';
  }

  getMemberALL(): void {
    this.attestationService.getMember().subscribe(data => {
      this.members = data;
      console.log('info sur les membre attestation entreprise', this.members);

    });
  }

  getMemberName(countryId: number): string {
    const member = this.members.find(p => p.id === countryId);
    return member ? member.lastname : 'Inconnu';
  }


  getMemberUserName(countryId: number): string {
    const member = this.members.find(p => p.id === countryId);
    return member ? member.lastname : 'Inconnu';
  }

  getmemberMatricule(countryId: number) {

    const member = this.members.find(p => p.id === countryId);
    return member ? member.matricule : 'Inconnu';
  }

  // Formater la date pour afficher seulement l'année
  formatDate(date: Date): string {
    return new Date(date).getFullYear().toString();
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

  // paiement
  payer(item: any): void {
    const payment: Payment = {
      id: 0, // ou une valeur par défaut
      transaction_id: item.ref_dem_part,
      member_id: item.member_id,
      company_attestation_id: item.id,
      cotisation_id: 0,
      customer_name: this.getMemberName(item.member_id),
      customer_surname: this.getMemberUserName(item.member_id), // Renseignez si applicable
      amount: 1000, // Assurez-vous que l'objet `item` contient cette information
      description: 'Paiement Attestation', // Description par défaut
      currency: 'XAF', // Exemple : devise utilisée
      created_at: new Date()
    };

    this.attestationService.payer(payment).subscribe(
      (response: any) => {
        if (response && response.data && response.data.payment_url) {
          // Redirection vers l'URL de paiement
          window.open(response.data.payment_url, '_blank');
        } else {
          console.error('Erreur lors de la génération du lien de paiement', response);
        }
      },
      (error) => {
        console.error('Erreur lors du paiement', error);
      }
    );
  }

  generatePdf(attest: NonPaye): void {
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
    doc.setTextColor(0, 0, 0); // Bleu
    doc.text(
      `Démandée par`,
      45,
      178
    );
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 128); //
    doc.setFont('helvetica', 'bold');
    doc.text(
      `PRO-TECH ENGINEERING SARL`,
      80,
      178
    );
    //noir
    // doc.setFontSize(14);
    // doc.setFont('helvetica', 'normal');
    // doc.setTextColor(0, 0, 0); // Noir
    // doc.text(
    //   `pour `,
    //   25,
    //   186
    // );
    //blue
    // Configuration pour le texte en bleu
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 128); // Bleu
    doc.setFont('helvetica', 'bold');

    // Texte à insérer
    const longText = `Pour ` + ` AVIS NO. 006/AONO/SG/C.BHA/CICPM-TBEC/2024 POUR LE CONTRÔLE TECHNIQUE ET LA SURVEILLANCE DES TRAVAUX DE L'HÔTEL DE VILLE DE ROUA`;

    // Largeur maximale autorisée pour le texte (en mm)
    const maxWidth = 150;

    // Fractionner le texte pour qu'il s'adapte à la largeur spécifiée
    const wrappedText = doc.splitTextToSize(longText, maxWidth);

    // Insérer le texte fractionné sur plusieurs lignes et obtenir la hauteur résultante
    const initialY = 186; // Position de départ
    const lineHeight = 6; // Hauteur d'une ligne (approximative, ajustez si nécessaire)
    const wrappedTextHeight = wrappedText.length * lineHeight;
    doc.text(wrappedText, 35, initialY);

    // Configuration pour le texte noir
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0); // Noir


    // Calcul dynamique de la position Y pour éviter le chevauchement
    const dynamicY = initialY + wrappedTextHeight; // Ajout de marge entre les blocs de texte
    doc.text(
      `Fait à Yaoundé, le ${formattedDate} pour servir et valoir ce que de droit.`,
      20,
      dynamicY
    );




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
    const fileName = `Attestation_entreprise_xxxx.pdf`;
    doc.save(fileName);
  }

}
