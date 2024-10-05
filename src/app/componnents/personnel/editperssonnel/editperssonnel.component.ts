import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-editperssonnel',
  standalone: true,
  imports: [RouterModule,CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './editperssonnel.component.html',
  styleUrl: './editperssonnel.component.css'
})
export class EditperssonnelComponent {
  currentTime = new Date();
  currentDay = new Date();

}
