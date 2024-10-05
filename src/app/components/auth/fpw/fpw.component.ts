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
    this.authService.forgotPassword(this.email).subscribe(users => {
      if (users && users.length > 0) {
        this.message = 'Email envoyé pour réinitialiser le mot de passe';
      } else {
        this.message = 'Email non trouvé';
      }
    });
  }

}
