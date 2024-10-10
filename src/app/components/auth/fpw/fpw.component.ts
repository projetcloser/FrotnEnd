import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-fpw',
  standalone: true,
  imports: [],
  templateUrl: './fpw.component.html',
  styleUrl: './fpw.component.css'
})
export class FpwComponent {

  email: string = '';
  message: string = '';

  constructor(private authService: AuthService) {}

  forgotPassword() {
    this.authService.forgotPassword(this.email).subscribe(
      () => {
        this.message = 'Password reset link has been sent to your email';
      },
      error => {
        this.message = 'Failed to send reset link';
      }
    );
  }

}
