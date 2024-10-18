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
  password_confirmation: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  // register() {
  //   this.authService.register(this.name, this.email, this.password, this.password_confirmation).subscribe(
  //     (response: any) => {
  //       localStorage.setItem('token', response.token);
  //       this.router.navigate(['/dashboard']);
  //     },
  //     error => {
  //       this.errorMessage = 'Registration failed';
  //     }
  //   );
  // }
}
