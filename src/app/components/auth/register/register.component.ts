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
  name: string = '';
  email: string = '';
  password: string = '';
  errorMessage: string = '';


  constructor(private authService: AuthService, private router: Router) {}

  register() {
    const newUser: User = { name: this.name, email: this.email, password: this.password };
    this.authService.register(newUser).subscribe(
      () => {
        this.router.navigate(['/Closer/login']);
      },
      error => {
        this.errorMessage = 'Erreur lors de l\'inscription';
      }
    );
  }
}
