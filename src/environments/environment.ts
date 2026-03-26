// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // URL du gateway backend en navigateur local
  apiGatewayUrl: 'http://localhost:8081',
  // URL du gateway backend depuis l'emulateur Android (localhost de la machine hote)
  apiGatewayUrlAndroidEmulator: 'http://10.0.2.2:8081',
  // Prefix commun des routes backend
  apiBasePath: '/api',
  // En dev web: false = utilise directement le gateway, true = utilise le proxy Angular
  useProxyInBrowserDev: false
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
