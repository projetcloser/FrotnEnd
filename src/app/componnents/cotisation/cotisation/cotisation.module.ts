import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexCotisationComponent } from '../index-cotisation/index-cotisation.component';
import { CreateCotisationComponent } from '../create-cotisation/create-cotisation.component';
import { UpdateCotisationComponent } from '../update-cotisation/update-cotisation.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    IndexCotisationComponent,
    CreateCotisationComponent,
    UpdateCotisationComponent

  ]
})
export class CotisationModule { }
