import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, LoginRequest } from '../core/services/auth.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false
})
export class LoginPage implements OnInit {
  email: string = '';
  password: string = '';
  showPassword: boolean = false;
  isLoading: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private toastController: ToastController
  ) { }

  ngOnInit() {
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  login() {
    if (!this.email || !this.password) {
      this.showToast('Veuillez remplir tous les champs', 'warning');
      return;
    }

    this.isLoading = true;
    const credentials: LoginRequest = {
      username: this.email,
      password: this.password
    };

    this.authService.login(credentials).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.showToast('Connexion réussie', 'success');
        this.router.navigate(['/tabs/tab1']);
      },
      error: (error) => {
        this.isLoading = false;
        this.showToast(error.message || 'Erreur de connexion', 'danger');
      }
    });
  }

  loginWithGoogle() {
    // TODO: Implement Google login
    console.log('Login with Google');
    this.router.navigate(['/tabs/tab1']);
  }

  forgotPassword() {
    this.router.navigate(['/forgot-password']);
  }

  goToSignup() {
    this.router.navigate(['/signup']);
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
