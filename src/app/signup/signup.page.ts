import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { ToastController } from '@ionic/angular';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
  standalone: false
})
export class SignupPage implements OnInit {
  fullName: string = '';
  email: string = '';
  phone: string = '';
  password: string = '';
  confirmPassword: string = '';
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;
  acceptTerms: boolean = false;
  isLoading: boolean = false;

  constructor(
    private router: Router,
    private location: Location,
    private authService: AuthService,
    private toastController: ToastController
  ) { }

  ngOnInit() {
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPassword() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  goBack() {
    this.location.back();
  }

  signup() {
    if (!this.email || !this.password || !this.confirmPassword) {
      this.showToast('Veuillez remplir tous les champs obligatoires', 'warning');
      return;
    }

    if (!this.acceptTerms) {
      this.showToast('Veuillez accepter les conditions d\'utilisation', 'warning');
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.showToast('Les mots de passe ne correspondent pas', 'danger');
      return;
    }

    this.isLoading = true;
    this.authService.signup({
      username: this.email,
      email: this.email,
      fullName: this.fullName,
      phone: this.phone,
      password: this.password
    }).subscribe({
      next: () => {
        this.isLoading = false;
        this.showToast('Compte cree avec succes. Connectez-vous maintenant.', 'success');
        this.router.navigate(['/login']);
      },
      error: (error) => {
        this.isLoading = false;
        this.showToast(error.message || 'Erreur lors de la creation du compte', 'danger');
      }
    });
  }

  signupWithGoogle() {
    // TODO: Implement Google signup
    this.router.navigate(['/tabs/tab1']);
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  private async showToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      color
    });
    await toast.present();
  }
}
