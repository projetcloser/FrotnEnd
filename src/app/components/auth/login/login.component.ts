import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import * as $ from 'jquery';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.email, this.password).subscribe(user => {
      if (user) {
        // Connecté avec succès
        localStorage.setItem('user', JSON.stringify(user));
        this.router.navigate(['/Closer/dashboard']);
      } else {
        // Si les informations sont incorrectes
        this.errorMessage = "Email ou mot de passe incorrect";
      }
    });
  }

}
