import { AuthService } from './../../../components/auth/auth.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-index-user',
  standalone: true,
  imports: [CommonModule,RouterModule,ReactiveFormsModule],
  templateUrl: './index-user.component.html',
  styleUrl: './index-user.component.css'
})
export class IndexUserComponent {

  User: any[] = [];
  membres: any[] = []; // Liste des membres

  constructor(
    private AuthService: AuthService,
    // private membreService: MembreServiceService   // Injecter le service des membres
  ) {}

  ngOnInit(): void {
    // this.loadMembres();
    this.loadAmendes();
  }

  // loadMembres() {
  //   this.membreService.getAll().subscribe(data => {
  //     this.membres = data;
  //   });
  // }

  loadAmendes() {
    this.AuthService.getUser().subscribe(data => {
      this.User = data.data;
      console.log('user:',data);

    });
  }

  getMembreName(membreId: number): string {
    const membre = this.membres.find(m => m.id === membreId);
    return membre ? membre.firstname : 'Inconnu'; // Remplacez 'name' par le champ approprié dans votre modèle
  }

  // deleteAmende(id: number) {
  //   this.amendeService.deleteAmende(id).subscribe(() => {
  //     this.amendes = this.amendes.filter(item => item.id !== id);
  //       //  console.log('activites deleted successfully!');
  //        alert("amendes deleted successfully!")
  //   });
  // }

}
