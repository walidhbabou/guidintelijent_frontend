import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SignupPage } from './signup.page';
import { AuthService } from '../core/services/auth.service';
import { BackendEndpointsService } from '../core/services/backend-endpoints.service';

describe('SignupPage', () => {
  let component: SignupPage;
  let fixture: ComponentFixture<SignupPage>;
  let authService: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['signup', 'login']);

    await TestBed.configureTestingModule({
      declarations: [SignupPage],
      imports: [CommonModule, FormsModule, ReactiveFormsModule, IonicModule, HttpClientTestingModule],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        BackendEndpointsService
      ]
    }).compileComponents();

    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form fields', () => {
    expect(component.fullName).toBe('');
    expect(component.email).toBe('');
    expect(component.phone).toBe('');
    expect(component.password).toBe('');
    expect(component.confirmPassword).toBe('');
    expect(component.acceptTerms).toBeFalsy();
  });

  it('should toggle password visibility', () => {
    expect(component.showPassword).toBeFalsy();
    component.showPassword = !component.showPassword;
    expect(component.showPassword).toBeTruthy();
  });
});
