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
      ref_dem_part: ['', Validators.required],
      // type: ['', Validators.required],
      cashflow_id: [],
      // city_id: ['', Validators.required],
      // contact_person: ['', Validators.required],
      // contact_person_phone: ['', Validators.required],
      // status: [1],
      // neighborhood: [''],
      date: [{ value: '', disabled: true }],
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
      date: formattedDate, // Date actuelle formatée
      auteur:  this.authService.getUserProfile().subscribe(
        (response: any) => {
          this.user = response;
          console.log('Utilisateur attestation connecté:', this.user);  // Vérifie les données ici
          // Mettre à jour le champ 'author' avec le nom de l'utilisateur
          this.addForm.patchValue({ author: this.user.name });

        },
        (error) => {
            console.error('Erreur lors de la récupération du profil utilisateur:', error);
        }
    ) // Auteur connecté
    });
    this.loadCaisse();

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
      this.attestPersonnelService.create(formData).subscribe(() => {
        this.router.navigate(['/Closer/attestPersonnel']); // Redirection après la création
      });
    }
  }

  cancel() {
    this.router.navigate(['/Closer/attestPersonnel']);
  }

}
