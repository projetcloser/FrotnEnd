import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CaisseServiceService } from '../../../Caisse/caisse-service.service';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../../components/auth/auth.service';
import { MembreServiceService } from '../../../membre/membre-service.service';
import { NonPayeService } from '../non-paye.service';
import { CommonModule } from '@angular/common';
import { EntrepriseServiceService } from '../../../entreprise/entreprise-service.service';

@Component({
  selector: 'app-create-non-paye',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,RouterModule,RouterModule],
  templateUrl: './create-non-paye.component.html',
  styleUrl: './create-non-paye.component.css'
})
export class CreateNonPayeComponent {
  addForm: FormGroup;
  membres: any[] = []; // Liste des membres
  caisses: any[] = [];
  companies:any[]=[];
  user: any = {};

  reference!: string;

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
      ref_dem_part: [''],
      // city_id: ['', Validators.required],
      // contact_person: ['', Validators.required],
      // contact_person_phone: ['', Validators.required],
      // status: [1],
      // neighborhood: [''],
      year: [{ value: '', disabled: true }],
    });
  }



  ngOnInit() {
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
          this.user = response.user.name;
          console.log('Utilisateur attestation connecté:', this.user);  // Vérifie les données ici
          // Mettre à jour le champ 'author' avec le nom de l'utilisateur
          this.addForm.patchValue({ author: this.user });

        },
        (error) => {
            console.error('Erreur lors de la récupération du profil utilisateur:', error);
        }
    ) // Auteur connecté
    });
    this.loadCaisse();

    // compter le nombre d'attestation deja dans la bd
    this.attestCompaniesService.getAttestations().subscribe(attestations => {
      const numeroref = attestations.length + 1; // Le nombre d'attestations déjà présentes, +1 pour la nouvelle
      this.generateReference(numeroref);
    });

  }

  generateReference(numeroref: number): void {
    const paddedNumeroref = numeroref.toString().padStart(4, '0'); // Ajout des zéros pour avoir 4 chiffres
    const month = new Date().getMonth() + 1; // Mois actuel
    const year = new Date().getFullYear().toString().slice(-2); // Derniers 2 chiffres de l'année

    // Générer la référence
    this.reference = `ATTE ${paddedNumeroref} / ${month.toString().padStart(2, '0')} / Pdt/SG/ONIGC/${year}`;
    console.log('Référence générée :', this.reference)

      // Mettre à jour la valeur de ref_dem_part dans le formulaire
      this.addForm.patchValue({
        ref_dem_part: this.reference
      });

      // Vérifier que la valeur est bien mise à jour dans le formulaire
  console.log('Valeur de ref_dem_part dans le formulaire après patch :', this.addForm.get('ref_dem_part')?.value);
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

  onSubmit(): void {
    if (this.addForm.valid) {
      const formData = this.addForm.getRawValue(); // Récupère même les champs désactivés comme ref_ing_cost
      this.attestCompaniesService.createAttestation(formData).subscribe(() => {
        console.log(formData);

        this.router.navigate(['/Closer/attestation-non_paye']); // Redirection après la création
      });
    }
  }

  cancel() {
    this.router.navigate(['/Closer/attestation-non_paye']);
  }

}
