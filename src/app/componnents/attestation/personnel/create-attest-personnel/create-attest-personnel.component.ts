import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AttestPersonnelService } from '../attest-personnel.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-attest-personnel',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './create-attest-personnel.component.html',
  styleUrl: './create-attest-personnel.component.css'
})
export class CreateAttestPersonnelComponent {
  addForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private attestPersonnelService: AttestPersonnelService,
    private router: Router
  ) {
    this.addForm = this.formBuilder.group({
      social_reason: ['', Validators.required],
      author: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.email],
      nui: ['', Validators.required],
      type: ['', Validators.required],
      country_id: ['', Validators.required],
      city_id: ['', Validators.required],
      contact_person: ['', Validators.required],
      contact_person_phone: ['', Validators.required],
      status: [1],
      neighborhood: [''],
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
}
