import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-fpw',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './fpw.component.html',
  styleUrl: './fpw.component.css'
})
export class FpwComponent {

  // email: string = '';
  // message: string = '';



  // forgotPassword() {
  //   this.authService.forgotPassword(this.email).subscribe(
  //     () => {
  //       this.message = 'Password reset link has been sent to your email';
  //     },
  //     error => {
  //       this.message = 'Failed to send reset link';
  //     }
  //   );
  // }

  forgotPasswordForm: FormGroup;
  message: string = '';

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    this.authService.sendResetLink(this.forgotPasswordForm.value.email).subscribe({
      next: (res) => this.message = res.message,
      error: (err) => this.message = err.error.message
    });
  }

}
