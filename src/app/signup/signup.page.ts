import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

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

  constructor(private router: Router, private location: Location) { }

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
    if (this.password !== this.confirmPassword) {
      console.log('Passwords do not match');
      return;
    }
    // TODO: Implement signup logic
    console.log('Signup with:', this.fullName, this.email, this.phone);
    this.router.navigate(['/tabs/tab1']);
  }

  signupWithGoogle() {
    // TODO: Implement Google signup
    console.log('Signup with Google');
    this.router.navigate(['/tabs/tab1']);
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
