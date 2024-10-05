import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CaisseServiceService } from '../caisse-service.service';
import { PersonnelService } from '../../personnel/personnel.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-caisse',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './edit-caisse.component.html',
  styleUrl: './edit-caisse.component.css'
})
export class EditCaisseComponent implements OnInit{

  caisseForm: FormGroup;
  personnels: any[] = [];
  caisseId!: number;

  constructor(
    private fb: FormBuilder,
    private caisseService: CaisseServiceService,
    private personnelService: PersonnelService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.caisseForm = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      personnel_id: [null, Validators.required],
      code: ['', Validators.required],
      balance: [0, Validators.required],
      created_at: [new Date().toISOString().split('T')[0], Validators.required]
    });
  }

  ngOnInit() {
    this.caisseId = this.route.snapshot.params['id'];
    this.caisseService.find(this.caisseId).subscribe(caisse => {
      this.caisseForm.patchValue(caisse);
    });

    this.personnelService.getAll().subscribe(data => {
      this.personnels = data;
    });

    this.loadCaisseData();
  }

  loadCaisseData() {
    this.caisseService.find(this.caisseId).subscribe(data => {
      this.caisseForm.patchValue({
        code: data.code,
        name: data.name,
        balance: data.balance,
        personnel_id: data.personnel_id,
        open_close: data.open_close
      });
    });
  }

  onSubmit() {
    if (this.caisseForm.valid) {
      const updatedCaisse = {
        id: this.caisseId,
        ...this.caisseForm.value
      };
      this.caisseService.update(updatedCaisse).subscribe(() => {
        this.router.navigate(['/caisse']);
      });
    }
  }

  // onSubmit() {
  //   if (this.caisseForm.valid) {

  //     this.caisseService.update(this.caisseForm.value).subscribe(() => {
  //       this.router.navigate(['/caisse']);
  //     });
  //   }
  // }
}
