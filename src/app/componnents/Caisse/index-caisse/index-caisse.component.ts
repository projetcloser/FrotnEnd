import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Caisse } from '../../../models/caisse';
import { CaisseServiceService } from '../caisse-service.service';
import { FormsModule } from '@angular/forms';
import { PersonnelService } from '../../personnel/personnel.service';
import { Personnel } from '../../personnel/personnel';

@Component({
  selector: 'app-index-caisse',
  standalone: true,
  imports: [CommonModule,
    CommonModule,
    FormsModule,
    RouterModule,
  ],
  templateUrl: './index-caisse.component.html',
  styleUrl: './index-caisse.component.css'
})
export class IndexCaisseComponent implements OnInit{

  caisses: Caisse[] = [];
  personnels: Personnel[] = [];

  filteredCaisseList: any[] = [];
  searchTerm: string = '';

  currentTime = new Date();
  currentDay = new Date();
  constructor(private router: Router, private caisseService: CaisseServiceService) {}

  ngOnInit(): void {
    this.getAllCaisses();
    this.getpersonnel();
  }

  getAllCaisses(): void {
    this.caisseService.getAll().subscribe((data: Caisse[]) => {
      this.caisses = data;
    }, error => {
      console.error('Erreur lors de la récupération des caisses :', error);
    });
  }

  getpersonnel():void{
    // Récupérer la liste des personnels
    this.caisseService.getPersonnels().subscribe(data => {
      this.personnels = data;
    });
  }

  getPersonnelName(personnelId: number): string {
    const personnel = this.personnels.find(p => p.id === personnelId);
    return personnel? personnel.firstname: 'Inconnu';
  }


  navigateToForm() {
    this.router.navigate(['/Closer/nouvelle-caisse']);
  }
    // Méthode de confirmation avant la suppression
  confirmDelete(id: number) {
    const confirmed = confirm("Êtes-vous sûr de vouloir supprimer cet élément ?");
    if (confirmed) {
      this.deleteCaisse(id);
    }
  }

  // Méthode pour supprimer la caisse
  deleteCaisse(id: number): void {
    this.caisseService.delete(id).subscribe(
      () => {
        this.caisses = this.caisses.filter(c => c.id !== id);
      },
      error => {
        console.error('Erreur lors de la suppression de la caisse :', error);
        alert('Erreur lors de la suppression de la caisse. Veuillez réessayer.');
      }
    );
  }

  onSearch(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredCaisseList = this.caisses.filter(caisse =>
      caisse.name.toLowerCase().includes(term) || caisse.code.toLowerCase().includes(term)
    );
  }
}
