import { Injectable } from '@angular/core';
import { API_PATHS, buildBackendUrl } from '../config/backend.config';

@Injectable({
  providedIn: 'root'
})
export class BackendEndpointsService {
  get authBaseUrl(): string {
    return buildBackendUrl(API_PATHS.auth);
  }

  get coreBaseUrl(): string {
    return buildBackendUrl(API_PATHS.core);
  }

  get aiBaseUrl(): string {
    return buildBackendUrl(API_PATHS.ai);
  }

  build(path: string): string {
    return buildBackendUrl(path);
  }
}
