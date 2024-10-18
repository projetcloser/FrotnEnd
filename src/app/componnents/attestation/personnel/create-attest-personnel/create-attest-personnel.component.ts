import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AttestPersonnelService } from '../attest-personnel.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MembreServiceService } from '../../../membre/membre-service.service';

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

  constructor(
    private formBuilder: FormBuilder,
    private attestPersonnelService: AttestPersonnelService,
    private router: Router,
    private membreService: MembreServiceService
  ) {
    this.addForm = this.formBuilder.group({
      // social_reason: ['', Validators.required],
      author: [{ value: '', disabled: true }],
      object: [{ value: 'usage personnel', disabled: true }],
      member_id: [''],
      // nui: ['', Validators.required],
      // type: ['', Validators.required],
      // country_id: ['', Validators.required],
      // city_id: ['', Validators.required],
      // contact_person: ['', Validators.required],
      // contact_person_phone: ['', Validators.required],
      // status: [1],
      // neighborhood: [''],
      created_at: [new Date()],
    });
  }

  onSubmit(): void {
    if (this.addForm.valid) {
      this.attestPersonnelService.create(this.addForm.value).subscribe(() => {
        this.router.navigate(['/attestations']); // Redirection après la création
      });
    }
  }

  ngOnInit() {
    // Récupérer la liste des membres
    this.membreService.getAll().subscribe(data => {
      this.membres = data;
    });

    // Récupérer l'auteur (utilisateur connecté) et la date
    this.addForm.patchValue({
      date: new Date().toLocaleDateString(), // Date actuelle formatée
      auteur: this.attestPersonnelService.getCurrentUser() // Auteur connecté
    });


  }

  cancel() {
    this.router.navigate(['/Closer/attestPersonnel']);
  }

}
