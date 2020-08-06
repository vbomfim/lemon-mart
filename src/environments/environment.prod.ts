import { AuthMode } from 'src/app/auth/auth.enum';

export const environment = {
  production: true,
  authMode: AuthMode.Firebase,
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
