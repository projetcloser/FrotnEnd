import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NonPayeService } from '../non-paye.service';
import { CaisseServiceService } from '../../../Caisse/caisse-service.service';
import { EntrepriseServiceService } from '../../../entreprise/entreprise-service.service';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../../components/auth/auth.service';
import { MembreServiceService } from '../../../membre/membre-service.service';
import { CommonModule } from '@angular/common';
import { NonPaye } from '../non-paye';

@Component({
  selector: 'app-edit-non-paye',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,RouterModule,RouterModule],
  templateUrl: './edit-non-paye.component.html',
  styleUrl: './edit-non-paye.component.css'
})
export class EditNonPayeComponent {
  addForm: FormGroup;
  membres: any[] = []; // Liste des membres
  caisses: any[] = [];
  companies:any[]=[];
  user: any = {};

  attestations: NonPaye[] = [];
  selectedAttestation!: NonPaye | null;

  constructor(
    private formBuilder: FormBuilder,
    private attestCompaniesService: NonPayeService,
    private caisseService:CaisseServiceService,
    private companiesService:EntrepriseServiceService,
    private router: Router,
    private authService: AuthService,
    private membreService: MembreServiceService
  ) {
    this.addForm = this.formBuilder.group({
      // social_reason: ['', Validators.required],
      author: [{ value: '', disabled: true }],
      motif: [''],
      member_id: [],
      company_id: [],
      payment_amount: [0],
      // ref_dem_part: ['', Validators.required],
      // type: ['', Validators.required],
      cashflow_id: [],
      // city_id: ['', Validators.required],
      // contact_person: ['', Validators.required],
      // contact_person_phone: ['', Validators.required],
      // status: [1],
      // neighborhood: [''],
      year: [{ value: '', disabled: true }],
    });
  }



  ngOnInit() {

    this.loadAttestations();
    // Récupérer la liste des membres
    this.membreService.getAll().subscribe(data => {
      this.membres = data;
    });

    //recuperer les companies
    this.companiesService.getAll().subscribe(data =>{
      this.companies = data;
    })

    // Récupérer l'auteur (utilisateur connecté) et la date
    const formattedDate = new Date().toISOString().split('T')[0]; // Date au format YYYY-MM-DD
    // Récupérer l'auteur (utilisateur connecté) et la date
    this.addForm.patchValue({
      year: formattedDate, // Date actuelle formatée
      author:  this.authService.getUserProfile().subscribe(
        (response: any) => {
          this.user = response;
          console.log('Utilisateur attestation connecté:', this.user);  // Vérifie les données ici
          // Mettre à jour le champ 'author' avec le nom de l'utilisateur
          this.addForm?.setValue({ author: this.user.name });

        },
        (error) => {
            console.error('Erreur lors de la récupération du profil utilisateur:', error);
        }
    ) // Auteur connecté
    });
    this.loadCaisse();

  }


  // Charger toutes les attestations
  loadAttestations(): void {
    this.attestCompaniesService.getAttestations().subscribe(
      (data) => (this.attestations = data),
      (error) => console.error('Erreur lors du chargement des attestations', error)
    );
  }

  // Préparer une attestation pour l'édition
  editAttestation(attestation: NonPaye): void {
    this.selectedAttestation = attestation; // Sauvegarde de l'attestation sélectionnée
    this.addForm.patchValue(attestation); // Pré-remplir le formulaire
  }

    // Méthode pour mettre à jour une attestation
    updateAttestation(): void {
      if (this.addForm.valid && this.selectedAttestation) {
        const updatedData = { ...this.addForm.value, id: this.selectedAttestation.id };

        this.attestCompaniesService.updateAttestation(this.selectedAttestation.id, updatedData).subscribe(
          (updatedAttestation) => {
            console.log('Attestation mise à jour avec succès', updatedAttestation);
            this.loadAttestations(); // Recharge la liste des attestations
            this.addForm.reset();
            this.selectedAttestation = null;
          },
          (error) => {
            console.error('Erreur lors de la mise à jour', error);
          }
        );
      }
    }

  loadCaisse() {
    this.caisseService.getAll().subscribe((data) => {
      console.log('caisse',data);
      this.caisses = data;
    });
  }

  generateRefIngCost(): string {
    // Simple logic to generate a unique reference like 'RC001'
    const date = new Date();
    const randomPart = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `RC${date.getFullYear()}${randomPart}`;
  }



  cancel() {
    this.router.navigate(['/Closer/attestation-non_paye']);
  }


}
