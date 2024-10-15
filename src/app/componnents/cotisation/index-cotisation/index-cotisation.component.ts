import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { PaginationComponent } from "../../../components/pagination/pagination.component";
import { Cotisation } from '../cotisation';
import { CotisationService } from '../cotisation.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Membre } from '../../../models/membre';
import { Caisse } from '../../../models/caisse';
import { MembreServiceService } from '../../membre/membre-service.service';
import { CaisseServiceService } from '../../Caisse/caisse-service.service';

@Component({
  selector: 'app-index-cotisation',
  standalone: true,
  imports: [PaginationComponent,CommonModule,FormsModule,ReactiveFormsModule,RouterModule],
  templateUrl: './index-cotisation.component.html',
  styleUrl: './index-cotisation.component.css'
})
export class IndexCotisationComponent {

  constructor(private router: Router,private cotisationService: CotisationService,
    private membersService: MembreServiceService,private caisseService: CaisseServiceService) {}
  cotisations: Cotisation[] = [];
  membres: Membre[]=[];
  caisses: Caisse[]=[];

  ngOnInit(): void {
    this.loadcotisations();
    this.loadCaisses();
    this.loadMembers();
  }

  loadcotisations() {
    this.cotisationService.getCotisations().subscribe((data: Cotisation[]) => {
      this.cotisations = data;
    });
  }

  // Récupérer les villes
  loadMembers(): void {
    this.membersService.getAll().subscribe(data => {
      this.membres = data;
      console.log('membre : ', this.membres);

    });
  }

  // Trouver le nom du pays à partir de l'ID
  getmembresName(member_id: number): string {
    const membre = this.membres.find(c => c.id === member_id);
    return membre ? membre.firstname : 'Non défini';
  }

   // Récupérer les villes
   loadCaisses(): void {
    this.caisseService.getAll().subscribe(data => {
      this.caisses = data;
      console.log('caisses : ', this.caisses);
    });
  }

  // Trouver le nom du pays à partir de l'ID
  getCaissesName(cashflow_id: number): string {
    const caisses = this.caisses.find(c => c.id === cashflow_id);
    return caisses ? caisses.name : 'Non défini';
  }

  navigateToForm() {
    this.router.navigate(['/Closer/nouvelle-cotisation']);
  }

  navigateToFormEdit() {
    this.router.navigate(['/Closer/modifier-cotisation']);
  }

   // Méthode de confirmation avant la suppression
   confirmDelete(id: number) {
    const confirmed = confirm("Êtes-vous sûr de vouloir supprimer cet élément ?");
    if (confirmed) {
      this.deletePersonnel(id);
    }
  }

  // Suppression de la personne avec l'ID donné
  deletePersonnel(id: number) {
    this.cotisationService.deleteCotisation(id).subscribe(res => {
      this.cotisations = this.cotisations.filter(item => item.id !== id);
     //  console.log('activites deleted successfully!');
      alert("cotisations deleted successfully!")
 })
  }

}
