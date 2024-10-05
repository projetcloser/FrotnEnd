import { Component, OnInit  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Import pour les animations
// import { ToastrModule, ToastrService } from 'ngx-toastr'; // Import de Toastr

import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PaysServiceService } from '../pays-service.service';
import { Pays } from '../../../models/pays';
import { CommonModule } from '@angular/common';
// import { PaysModule } from '../pays/pays.module';

@Component({
  selector: 'app-create-pays',
  standalone: true,
  imports: [FormsModule,
    CommonModule,
    ReactiveFormsModule,
    // PaysModule
  ],
  templateUrl: './create-pays.component.html',
  styleUrl: './create-pays.component.css'
})
export class CreatePaysComponent implements OnInit{
  countryForm: FormGroup;
  countryId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private paysService: PaysServiceService,
    private route: ActivatedRoute,
    private router: Router,
    // private toastr: ToastrService // Assurez-vous que ToastrService est injecté ici
  ) {
    this.countryForm = this.fb.group({
      name: ['', Validators.required]
    });
  }

  ngOnInit(): void {

  }

   // Soumettre le formulaire pour créer un nouveau pays
   onSubmit() {
    if (this.countryForm.valid) {
      const newCountry: Pays = {
        id: 0,
        name: this.countryForm.get('name')?.value
      };

      this.paysService.create(newCountry).subscribe(
        () => {
          // this.toastr.success('Pays créé avec succès !', 'Succès'); // Notification de succès
          this.router.navigate(['/pays']);
        },
        (error) => {
          // this.toastr.error('Une erreur est survenue lors de la création du pays.', 'Erreur'); // Notification d'erreur
          console.error('Erreur lors de la création du pays:', error);
        }
      );
    } else {
      // this.toastr.warning('Le formulaire est invalide, veuillez vérifier les champs.', 'Attention');
      console.log('Formulaire invalide');
    }
  }
}

