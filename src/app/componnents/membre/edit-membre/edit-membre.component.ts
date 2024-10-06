import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-membre',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './edit-membre.component.html',
  styleUrl: './edit-membre.component.css'
})
export class EditMembreComponent {
  currentTime = new Date();
  currentDay = new Date();
  membreForm!: FormGroup;
}
