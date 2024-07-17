import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EntrepriseServiceService } from '../entreprise-service.service';
import { Router, RouterModule } from '@angular/router';
import { Entreprise } from '../../../models/entreprise';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-entreprise',
  standalone: true,
  imports: [RouterModule,ReactiveFormsModule,CommonModule],
  templateUrl: './create-entreprise.component.html',
  styleUrl: './create-entreprise.component.css'
})
export class CreateEntrepriseComponent {
  form!:FormGroup;
  compagnie: Entreprise[] = [];

  constructor(public entrepriseService:EntrepriseServiceService, private router:Router){

  }

  ngOnInit():void{
    this.form = new FormGroup({
      nom: new FormControl('',[Validators.required]),
      descrip: new FormControl('',[Validators.required]),
      dtedebut: new FormControl('',[Validators.required]),
      dtefin: new FormControl('',[Validators.required]),
      etat: new FormControl('',[Validators.required]),
      // contry_id: new FormControl('',[Validators.required]),
    });

    // this.projetService.getAll().subscribe({
    //   next: (projet) => {
    //     this.projet = projet;
    //   },
    //   error: (err) => {
    //     console.error('Error fetching projet', err);
    //   }
    // });

  }

  get f(){
    return this.form.controls;
  }

  submit(){
    console.log(this.form.value);
    this.entrepriseService.create(this.form.value).subscribe((res:any)=>{
      alert('compagnie  created Successfull!!');
      this.router.navigateByUrl('projet/index');
    })
  }
}
