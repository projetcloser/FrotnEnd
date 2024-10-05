import { Component } from '@angular/core';
import { Pays } from '../../../models/pays';
import { PaysServiceService } from '../pays-service.service';
import { LoadingComponent } from '../../../components/loading/loading.component';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-index-pays',
  standalone: true,
  imports: [LoadingComponent,RouterModule, RouterLink, CommonModule,],
  templateUrl: './index-pays.component.html',
  styleUrl: './index-pays.component.css'
})
export class IndexPaysComponent {
  countries: Pays[]=[];
  currentPage = 1;
  pageSize = 5; // Nombre de pays par page
  totalCountries = 0; // Nombre total de pays (à ajuster selon ta logique)
  // en voyer le loading
  isLoading:boolean = true;

constructor(public paysService: PaysServiceService,private router: Router){}

navigateToForm() {
  this.router.navigate(['/pays/create']);
}


ngOnInit(): void{
  this.getCountries();
}
getCountries(): void {
  this.paysService.getAll().subscribe((data) => {
    this.countries = data;
    this.totalCountries = data.length; // Mettre à jour cette logique pour obtenir le total depuis le serveur
  }, error => {
    console.error('Erreur lors de la récupération des pays', error);
  });
}


nextPage() {
  this.currentPage++;
  this.getCountries();
}

previousPage() {
  if (this.currentPage > 1) {
    this.currentPage--;
    this.getCountries();
  }
}

goToPage(page: number) {
  this.currentPage = page;
  this.getCountries();
}
  /**
 * Write code on Method
 *
 * @return response()
 */
  deletePost(id:number){
    this.paysService.delete(id).subscribe(res => {
         this.countries = this.countries.filter(item => item.id !== id);
        //  console.log('activites deleted successfully!');
         alert("projt deleted successfully!")
    })
  }
}
