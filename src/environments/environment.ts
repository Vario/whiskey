// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.
// import 'zone.js/dist/zone-error';

export const environment = {
  production: false,
  HttpProvider: 'http://localhost:7545',
  firebase: {
    // For other projects use different keys
    apiKey: 'AIzaSyDJET3l3DV8itYoTccdhLzv3xQ8JMoiSvU',
    authDomain: 'whiskeytaste-307bd.firebaseapp.com',
    databaseURL: 'https://whiskeytaste-307bd.firebaseio.com',
    projectId: 'whiskeytaste-307bd',
    storageBucket: 'whiskeytaste-307bd.appspot.com',
    messagingSenderId: '960794625142'
  },
  blockchain: {
    network: 4, //rinkeby testnet
    contractAdress: '0xbc84f3bf7dd607a37f9e5848a6333e6c188d926c'
  }
}
