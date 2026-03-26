import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { BackendEndpointsService } from './backend-endpoints.service';
import { environment } from '../../../environments/environment';

export interface LoginRequest {
  username: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly TOKEN_KEY = 'access_token';
  private readonly REFRESH_TOKEN_KEY = 'refresh_token';
  private readonly DEV_AUTH_BASE_URL = 'http://localhost:8001/api/auth';

  constructor(
    private http: HttpClient,
    private backendEndpoints: BackendEndpointsService
  ) {}

  login(credentials: LoginRequest): Observable<AuthResponse> {
    const baseUrl = environment.production ? this.backendEndpoints.authBaseUrl : this.DEV_AUTH_BASE_URL;
    const url = `${baseUrl}/signin`;
    return this.http.post<AuthResponse>(url, {
      username: credentials.username,
      password: credentials.password
    }).pipe(
      tap(response => {
        this.saveTokens(response);
      }),
      catchError(this.handleError)
    );
  }

  signup(data: any): Observable<any> {
    const baseUrl = environment.production ? this.backendEndpoints.authBaseUrl : this.DEV_AUTH_BASE_URL;
    const url = `${baseUrl}/signup`;
    return this.http.post<any>(url, data).pipe(
      catchError(this.handleError)
    );
  }

  logout(): Observable<any> {
    const baseUrl = environment.production ? this.backendEndpoints.authBaseUrl : this.DEV_AUTH_BASE_URL;
    const url = `${baseUrl}/logout`;
    return this.http.post<any>(url, {}).pipe(
      tap(() => {
        this.clearTokens();
      }),
      catchError(this.handleError)
    );
  }

  getAccessToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  getRefreshToken(): string | null {
    return localStorage.getItem(this.REFRESH_TOKEN_KEY);
  }

  isLoggedIn(): boolean {
    return !!this.getAccessToken();
  }

  private saveTokens(response: AuthResponse): void {
    localStorage.setItem(this.TOKEN_KEY, response.accessToken);
    localStorage.setItem(this.REFRESH_TOKEN_KEY, response.refreshToken);
  }

  private clearTokens(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.REFRESH_TOKEN_KEY);
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Une erreur s\'est produite';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Erreur: ${error.error.message}`;
    } else {
      errorMessage = error.error?.message || `Code d'erreur: ${error.status}`;
    }
    return throwError(() => new Error(errorMessage));
  }
}
