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
  otpForm: FormGroup;
  resetPasswordForm: FormGroup;
  currentStep: number = 1;
  message: string = '';

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.forgotPasswordForm = this.fb.group({
      matricule: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
    this.otpForm = this.fb.group({
      otp: ['', Validators.required]
    });
    this.resetPasswordForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    });
  }

  onSubmitStep1() {
    if (this.forgotPasswordForm.valid) {
      const { matricule, email } = this.forgotPasswordForm.value;
      this.authService.sendOtp(matricule, email).subscribe(() => {
        this.currentStep = 2;
      }, error => {
        this.message = "Erreur lors de l'envoi du code.";
      });
    }
  }

  onSubmitStep2() {
    if (this.otpForm.valid) {
      const { otp } = this.otpForm.value;
      this.authService.verifyOtp(otp).subscribe(() => {
        this.currentStep = 3;
      }, error => {
        this.message = "Code invalide.";
      });
    }
  }

  onSubmitStep3() {
    if (this.resetPasswordForm.valid) {
      const { newPassword, confirmPassword } = this.resetPasswordForm.value;
      if (newPassword === confirmPassword) {
        this.authService.resetPassword(newPassword).subscribe(() => {
          this.message = "Mot de passe réinitialisé avec succès.";
          this.currentStep = 1;
          this.resetForms();
        }, error => {
          this.message = "Erreur lors de la réinitialisation.";
        });
      } else {
        this.message = "Les mots de passe ne correspondent pas.";
      }
    }
  }

  resetForms() {
    this.forgotPasswordForm.reset();
    this.otpForm.reset();
    this.resetPasswordForm.reset();
  }

}
