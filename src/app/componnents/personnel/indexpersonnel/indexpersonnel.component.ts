import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';


import { PersonnelService } from '../personnel.service';
import { Personnel } from '../personnel';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';


@Component({
  selector: 'app-indexpersonnel',
  standalone: true,
  imports: [FormsModule,
    CommonModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    RouterModule

  ],
  templateUrl: './indexpersonnel.component.html',
  styleUrl: './indexpersonnel.component.css'
})
export class IndexpersonnelComponent implements OnInit {



  personnels: Personnel[] = [];

  filteredPersonnel: any[] = []; // Liste filtrée pour l'affichage
  searchTerm: string = ''; // Terme de recherche

  currentTime = new Date();
  currentDay = new Date();

  // seracc back
  searchForm: FormGroup;


  constructor(private fb: FormBuilder,private router: Router,private personnelService:PersonnelService) {
    this.searchForm = this.fb.group({
      keyword: [''],
      year: [''],
      motif: [''],
      company_id: [''],
      member_id: [''],
    });
  }

  ngOnInit(): void {
    this.getAllPersonnels();
  }

  // Récupérer la liste des personnels
  getAllPersonnels(): void {
    this.personnelService.getAll().subscribe(
      (data: Personnel[]) => {
        console.log('Données récupérées :', data); // Vérifiez ce qui est renvoyé
        this.personnels = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des personnels', error);
      }
    );
  }

  onSearch() {
    const filters = this.searchForm.value;
    this.personnelService.searchStaff(filters).subscribe((data) => {
      this.personnels = data;
    });
  }

  // Méthode pour naviguer vers les détails
  viewPersonnel(id: number): void {
    this.router.navigate(['/personnel-details', id]);
  }

  navigateToForm() {
    this.router.navigate(['/Closer/nouvelle-personne']);
  }

  navigateToFormEdit(id: number) {
    this.router.navigate(['/modifier-personne']);
  }

  // Méthode de confirmation avant la suppression
  confirmDelete(id: number) {
    const confirmed = confirm("Êtes-vous sûr de vouloir supprimer cet élément ?");
    if (confirmed) {
      this.deletePersonnel(id);
    }
  }



  deletePersonnel(id:number){
    this.personnelService.delete(id).subscribe(res => {
         this.personnels = this.personnels.filter(item => item.id !== id);
        //  console.log('activites deleted successfully!');
         alert("personnels deleted successfully!")
    })
  }


  submit() {
    // Logic for final submission
    console.log('Final submission');
  }


  exportToExcel(): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.personnels);
    const workbook: XLSX.WorkBook = {
      Sheets: { 'Liste des personnelles': worksheet },
      SheetNames: ['Liste des personnelles']
    };

    // Générer le fichier Excel en binaire
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

    // Appeler la méthode pour sauvegarder le fichier
    this.saveAsExcelFile(excelBuffer, 'Liste_Membres');
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    saveAs(data, `${fileName}_export_${new Date().getTime()}.xlsx`);
  }

  // onSearch(): void {
  //   const term = this.searchTerm.toLowerCase();
  //   this.filteredPersonnel = this.personnels.filter(person =>
  //     person.lastname.toLowerCase().includes(term) ||
  //     person.firstname.toLowerCase().includes(term) ||
  //     person.email.toLowerCase().includes(term)
  //     // person.?phone.includes(term)
  //   );
  // }





}
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
