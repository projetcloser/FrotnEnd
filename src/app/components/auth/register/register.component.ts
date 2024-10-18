import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { User } from '../model/user';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  matricule: string = '';
  email: string = '';
  password: string = '';
  persoId: number | null = null;
  roleId: number | null = null;
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onRegister() {
    const registerData = {
      matricule: this.matricule,
      email: this.email,
      password: this.password,
      persoId: this.persoId,
      roleId: this.roleId,
    };

    this.authService.register(registerData).subscribe(
      (response: any) => {
        this.router.navigate(['/login']); // Redirige vers la page de connexion après enregistrement
      },
      (error) => {
        this.errorMessage = 'Registration failed. Please try again.';
      }
    );
  }
}
