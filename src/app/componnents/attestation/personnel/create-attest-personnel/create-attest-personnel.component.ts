import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AttestPersonnelService } from '../attest-personnel.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MembreServiceService } from '../../../membre/membre-service.service';
import { CaisseServiceService } from '../../../Caisse/caisse-service.service';
import { AuthService } from '../../../../components/auth/auth.service';

@Component({
  selector: 'app-create-attest-personnel',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './create-attest-personnel.component.html',
  styleUrl: './create-attest-personnel.component.css'
})
export class CreateAttestPersonnelComponent {
  addForm: FormGroup;
  membres: any[] = []; // Liste des membres
  caisses: any[] = [];
  user: any = {};
  reference!: string;

  constructor(
    private formBuilder: FormBuilder,
    private attestPersonnelService: AttestPersonnelService,
    private caisseService:CaisseServiceService,
    private router: Router,
    private authService: AuthService,
    private membreService: MembreServiceService
  ) {
    this.addForm = this.formBuilder.group({
      // social_reason: ['', Validators.required],
      author: [{ value: '', disabled: true }],
      object: [{ value: 'usage personnel', disabled: true }],
      member_id: [],
      ref_dem_part: [''],
      // type: ['', Validators.required],
      // cashflow_id: [],
      // city_id: ['', Validators.required],
      // contact_person: ['', Validators.required],
      // contact_person_phone: ['', Validators.required],
      // status: [1],
      // neighborhood: [''],
      certification_date: [{ value: '', disabled: true }],
    });
  }



  ngOnInit() {
    // Récupérer la liste des membres
    this.membreService.getAll().subscribe(data => {
      this.membres = data;
    });

    // Récupérer l'auteur (utilisateur connecté) et la date
    const formattedDate = new Date().toISOString().split('T')[0]; // Date au format YYYY-MM-DD
    // Récupérer l'auteur (utilisateur connecté) et la date
    this.addForm.patchValue({
      certification_date: formattedDate, // Date actuelle formatée
      auteur:  this.authService.getUserProfile().subscribe(
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

    this.attestPersonnelService.getAll().subscribe(attestations => {
      const numeroref = attestations.length + 1; // Le nombre d'attestations déjà présentes, +1 pour la nouvelle
      this.generateReference(numeroref);
    });

  }

  generateReference(numeroref: number): void {
    const paddedNumeroref = numeroref.toString().padStart(4, '0'); // Ajout des zéros pour avoir 4 chiffres
    const month = new Date().getMonth() + 1; // Mois actuel
    const year = new Date().getFullYear().toString().slice(-2); // Derniers 2 chiffres de l'année

    // Générer la référence
    this.reference = `N° ${paddedNumeroref} / ${month.toString().padStart(2, '0')} / Pdt/SG/ONIGC/${year}`;
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



  onSubmit(): void {
    if (this.addForm.valid) {
      const formData = this.addForm.getRawValue(); // Récupère même les champs désactivés comme ref_ing_cost
      console.log('Données du formulaire avant soumission:', formData);
      this.attestPersonnelService.create(formData).subscribe(() => {
        console.log('Attestation créée avec succès', formData);
        this.router.navigate(['/Closer/attestPersonnel']); // Redirection après la création
      });
    } else {
      console.log('Le formulaire n\'est pas valide');
    }
  }

  cancel() {
    this.router.navigate(['/Closer/attestPersonnel']);
  }

}
