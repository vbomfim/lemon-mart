// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { AuthMode } from 'src/app/auth/auth.enum';

export const environment = {
  production: false,
  authMode: AuthMode.InMemory,
  firebase: {
    apiKey: 'AIzaSyD65QAO6loE7CWQPjYY-fMEuRu82XW_ARU',
    authDomain: 'lemonmart-9ec2a.firebaseapp.com',
    databaseURL: 'https://lemonmart-9ec2a.firebaseio.com',
    projectId: 'lemonmart-9ec2a',
    storageBucket: 'lemonmart-9ec2a.appspot.com',
    messagingSenderId: '196003795616',
    appId: '1:196003795616:web:98cda4b0ab06ebd02d2fc5',
    measurementId: 'G-EN9BNPM08W',
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
