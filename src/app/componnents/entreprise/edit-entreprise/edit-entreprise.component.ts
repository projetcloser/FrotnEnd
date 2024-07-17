import { Component } from '@angular/core';
import { Entreprise } from '../../../models/entreprise';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EntrepriseServiceService } from '../entreprise-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PaysServiceService } from '../../pays/pays-service.service';
import { VilleServiceService } from '../../ville/ville-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-entreprise',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './edit-entreprise.component.html',
  styleUrl: './edit-entreprise.component.css'
})
export class EditEntrepriseComponent {

  id!:number;
  compagnies!:Entreprise;
  form!:FormGroup;

  countries: any[] = [];

  constructor( public compagniesService: EntrepriseServiceService, private router:Router, private route:ActivatedRoute,
    private fb: FormBuilder, private countryService: PaysServiceService, cityService:VilleServiceService
  ){}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.form = new FormGroup({
      nom: new FormControl('',[Validators.required]),
      descrip: new FormControl('',[Validators.required]),
      dtedebut: new FormControl('',[Validators.required]),
      dtefin: new FormControl('',[Validators.required]),
      etat: new FormControl('',[Validators.required]),
    });

    this.compagniesService.find(this.id).subscribe({
      next: (compagnies) => {
        this.form.patchValue(compagnies);
      },
      error: (err) => {
        console.error('Error fetching compagnies', err);
      }
    });

    this.countryService.getAll().subscribe({
      next: (countries) => {
        this.countries = countries;
      },
      error: (err) => {
        console.error('Error fetching countries', err);
      }
    });
  }

  get f(){
    return this.form.controls;
  }
  submit(): void {
    console.log(this.form.value);
    this.compagniesService.update(this.id, this.form.value).subscribe({
      next: (res) => {
        alert('compagnies updated successfully!');
        this.router.navigateByUrl('compagnies/index');
      },
      error: (err) => {
        console.error('Error updating compagnies', err);
      }
    });
  }
}
