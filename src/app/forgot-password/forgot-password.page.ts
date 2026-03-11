import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
  standalone: false
})
export class ForgotPasswordPage implements OnInit {
  email: string = '';

  constructor(private router: Router, private location: Location) { }

  ngOnInit() {
  }

  goBack() {
    this.location.back();
  }

  resetPassword() {
    // TODO: Implement reset password logic
    console.log('Reset password for:', this.email);
    // Show success message
    alert('Un e-mail de réinitialisation a été envoyé à ' + this.email);
    this.router.navigate(['/login']);
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
