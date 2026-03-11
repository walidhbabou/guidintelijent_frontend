import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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

  constructor(private router: Router) { }

  ngOnInit() {
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  login() {
    // TODO: Implement login logic
    console.log('Login with:', this.email, this.password);
    // Navigate to home after successful login
    this.router.navigate(['/tabs/tab1']);
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
    // TODO: Navigate to signup page
    this.router.navigate(['/signup']);
  }
}
