import { Component } from '@angular/core';
import { Pays } from '../../../models/pays';
import { PaysServiceService } from '../pays-service.service';
import { LoadingComponent } from '../../../components/loading/loading.component';
import { RouterLink, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-index-pays',
  standalone: true,
  imports: [LoadingComponent,RouterModule, RouterLink, CommonModule,],
  templateUrl: './index-pays.component.html',
  styleUrl: './index-pays.component.css'
})
export class IndexPaysComponent {
  pays: Pays[]=[];
  // en voyer le loading
  isLoading:boolean = true;

constructor(public paysService: PaysServiceService){}

ngOnInit(): void{
  this.paysService.getAll().subscribe(
    (data:Pays[])=>{
      this.pays = data;
      console.log(this.pays);

    },
    error => {
      console.error('Error fetching project', error);
    }
)
}

  /**
 * Write code on Method
 *
 * @return response()
 */  
  deletePost(id:number){
    this.paysService.delete(id).subscribe(res => {
         this.pays = this.pays.filter(item => item.id !== id);
        //  console.log('activites deleted successfully!');
         alert("projt deleted successfully!")
    })
  }
}
