// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyDJET3l3DV8itYoTccdhLzv3xQ8JMoiSvU',
    authDomain: 'whiskeytaste-307bd.firebaseapp.com',
    databaseURL: 'https://whiskeytaste-307bd.firebaseio.com',
    projectId: 'whiskeytaste-307bd',
    storageBucket: 'whiskeytaste-307bd.appspot.com',
    messagingSenderId: '960794625142'
  }
}

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
