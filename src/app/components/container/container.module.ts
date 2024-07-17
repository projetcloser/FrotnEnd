import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ContainerComponent } from './container.component';
import { FormatNamePipe } from '../../pipes/format-name.pipe';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    ContainerComponent,
    FormatNamePipe

  ]
})
export class ContainerModule { }
