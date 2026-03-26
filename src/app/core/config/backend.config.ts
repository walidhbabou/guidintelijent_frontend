import { Capacitor } from '@capacitor/core';
import { environment } from '../../../environments/environment';

const isNativePlatform = Capacitor.isNativePlatform();
const isAndroidNative = isNativePlatform && Capacitor.getPlatform() === 'android';

export const API_PATHS = {
  auth: `${environment.apiBasePath}/auth`,
  core: `${environment.apiBasePath}/core`,
  ai: `${environment.apiBasePath}/ai`
};

export function getBackendBaseUrl(): string {
  const useProxy = !environment.production && !isNativePlatform && environment.useProxyInBrowserDev;

  if (useProxy) {
    return '';
  }

  if (isAndroidNative) {
    return environment.apiGatewayUrlAndroidEmulator;
  }

  return environment.apiGatewayUrl;
}

export function buildBackendUrl(path: string): string {
  return `${getBackendBaseUrl()}${path}`;
}
