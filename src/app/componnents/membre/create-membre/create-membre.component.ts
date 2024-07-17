import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Membre } from '../../../models/membre';
import { MembreServiceService } from '../membre-service.service';
import { Router } from '@angular/router';
import { PaysServiceService } from '../../pays/pays-service.service';
import { VilleServiceService } from '../../ville/ville-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-membre',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './create-membre.component.html',
  styleUrl: './create-membre.component.css'
})
export class CreateMembreComponent {
  form!:FormGroup;
  membre: Membre[] = [];
  country:any;
  city:any;

  constructor(public membreService:MembreServiceService, private router:Router,private countryService:PaysServiceService,
    private cityService:VilleServiceService
  ){

  }

  ngOnInit():void{
    this.form = new FormGroup({
      social_reason: new FormControl('',[Validators.required]),
      author: new FormControl('',[Validators.required]),
      phone: new FormControl('',[Validators.required]),
      email: new FormControl('',[Validators.required]),
      nui: new FormControl('',[Validators.required]),
      type: new FormControl('',[Validators.required]),
      country_id: new FormControl('',[Validators.required]),
      city_id: new FormControl('',[Validators.required]),
      neighborhoodp: new FormControl('',[Validators.required]),
      contact_person: new FormControl('',[Validators.required]),
      contact_person_phone: new FormControl('',[Validators.required]),
      status: new FormControl('',[Validators.required]),
    });

    this.countryService.getAll().subscribe({
      next: (country) => {
        this.country = country;
      },
      error: (err) => {
        console.error('Error fetching country', err);
      }
    });

    this.cityService.getAll().subscribe({
      next: (city) => {
        this.city = city;
      },
      error: (err) => {
        console.error('Error fetching city', err);
      }
    });

  }


  get f(){
    return this.form.controls;
  }

  submit(){
    console.log(this.form.value);
    this.membreService.create(this.form.value).subscribe((res:any)=>{
      alert('members  created Successfull!!');
      this.router.navigateByUrl('membre/index');
    })
  }
}
