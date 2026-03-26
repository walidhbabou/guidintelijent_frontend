// src/app/core/services/auth.service.spec.ts - Exemple test service
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService],
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('devrait être créé', () => {
    expect(service).toBeTruthy();
  });

  describe('login', () => {
    it('devrait envoyer les bonnes données et retourner le token', () => {
      const mockResponse = { token: 'test-token', user: { id: 1, email: 'user@example.com' } };

      service.login('user@example.com', 'password123').subscribe((response) => {
        expect(response.token).toBe('test-token');
      });

      const req = httpMock.expectOne('/api/auth/login');
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual({
        email: 'user@example.com',
        password: 'password123',
      });
      req.flush(mockResponse);
    });

    it('devrait gérer les erreurs de login', () => {
      service.login('user@example.com', 'wrongpassword').subscribe(
        () => fail('should have failed'),
        (error) => {
          expect(error.status).toBe(401);
        }
      );

      const req = httpMock.expectOne('/api/auth/login');
      req.flush('Invalid credentials', { status: 401, statusText: 'Unauthorized' });
    });
  });

  describe('logout', () => {
    it('devrait nettoyer les données de l\'utilisateur', () => {
      service.logout();
      expect(service.getCurrentUser()).toBeNull();
      expect(service.getToken()).toBeNull();
    });
  });

  describe('isAuthenticated', () => {
    it('devrait retourner false si pas de token', () => {
      service.logout();
      expect(service.isAuthenticated()).toBeFalsy();
    });

    it('devrait retourner true si un token existe', () => {
      localStorage.setItem('token', 'test-token');
      expect(service.isAuthenticated()).toBeTruthy();
      localStorage.removeItem('token');
    });
  });
});
