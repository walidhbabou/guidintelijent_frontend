// src/app/login/login.page.spec.ts - Exemple amélioré de test unitaire
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginPage } from './login.page';
import { AuthService } from '../core/services/auth.service';
import { of, throwError } from 'rxjs';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;
  let authService: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['login']);

    await TestBed.configureTestingModule({
      declarations: [LoginPage],
      imports: [ReactiveFormsModule],
      providers: [{ provide: AuthService, useValue: authServiceSpy }],
    }).compileComponents();

    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('devrait créer le component', () => {
    expect(component).toBeTruthy();
  });

  describe('Form Validation', () => {
    it('devrait invalider le formulaire avec des champs vides', () => {
      expect(component.loginForm.valid).toBeFalsy();
    });

    it('devrait valider le formulaire avec des données valides', () => {
      component.loginForm.patchValue({
        email: 'user@example.com',
        password: 'password123',
      });
      expect(component.loginForm.valid).toBeTruthy();
    });

    it('devrait invalider un email incorrect', () => {
      const emailControl = component.loginForm.get('email');
      emailControl?.setValue('invalidemail');
      expect(emailControl?.hasError('email')).toBeTruthy();
    });
  });

  describe('Login Method', () => {
    it('devrait appeler AuthService.login avec les bonnes données', () => {
      authService.login.and.returnValue(of({ token: 'test-token' }));
      component.loginForm.patchValue({
        email: 'user@example.com',
        password: 'password123',
      });
      component.login();
      expect(authService.login).toHaveBeenCalledWith('user@example.com', 'password123');
    });

    it('devrait affi cher une erreur en cas d\'échec de connexion', () => {
      authService.login.and.returnValue(
        throwError(() => new Error('Invalid credentials'))
      );
      component.loginForm.patchValue({
        email: 'user@example.com',
        password: 'wrongpassword',
      });
      component.login();
      expect(component.errorMessage).toContain('Invalid credentials');
    });
  });

  describe('UI Interactions', () => {
    it('devrait désactiver le bouton submit si le formulaire est invalide', () => {
      const submitButton = fixture.debugElement.query(
        (el) => el.name === 'button' && el.nativeElement.type === 'submit'
      );
      expect(submitButton.nativeElement.disabled).toBeTruthy();
    });

    it('devrait activer le bouton submit si le formulaire est valide', () => {
      component.loginForm.patchValue({
        email: 'user@example.com',
        password: 'password123',
      });
      fixture.detectChanges();
      const submitButton = fixture.debugElement.query(
        (el) => el.name === 'button' && el.nativeElement.type === 'submit'
      );
      expect(submitButton.nativeElement.disabled).toBeFalsy();
    });
  });
});
