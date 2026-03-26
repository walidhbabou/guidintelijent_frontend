import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { LoginPage } from './login.page';
import { LoginPageModule } from './login.module';
import { AuthService } from '../core/services/auth.service';
import { BackendEndpointsService } from '../core/services/backend-endpoints.service';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;
  let authService: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['login', 'logout', 'isLoggedIn']);

    await TestBed.configureTestingModule({
      declarations: [LoginPage],
      imports: [CommonModule, FormsModule, ReactiveFormsModule, IonicModule, HttpClientTestingModule],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        BackendEndpointsService
      ]
    }).compileComponents();

    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have email and password inputs', () => {
    expect(component.email).toBeDefined();
    expect(component.password).toBeDefined();
  });

  it('should toggle password visibility', () => {
    expect(component.showPassword).toBeFalsy();
    component.togglePassword();
    expect(component.showPassword).toBeTruthy();
    component.togglePassword();
    expect(component.showPassword).toBeFalsy();
  });
});
