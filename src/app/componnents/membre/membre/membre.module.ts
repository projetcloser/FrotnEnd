import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexMembreComponent } from '../index-membre/index-membre.component';
import { EditMembreComponent } from '../edit-membre/edit-membre.component';
import { CreateMembreComponent } from '../create-membre/create-membre.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FormatNamePipe } from '../../../pipes/format-name.pipe';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    IndexMembreComponent,
    EditMembreComponent,
    CreateMembreComponent,
    FormatNamePipe
  ]
})
export class MembreModule { }
