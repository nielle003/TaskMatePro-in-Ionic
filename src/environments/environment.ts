// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "AIzaSyBK_iI-ejmWsk2y_tBufCwAI9oJBWwzZRY",
    authDomain: "taskmatepro-85f50.firebaseapp.com",
    projectId: "taskmatepro-85f50",
    storageBucket: "taskmatepro-85f50.firebasestorage.app",
    messagingSenderId: "634112080614",
    appId: "1:634112080614:web:193cd2969e6e354f265927",
    measurementId: "G-8JW5YS4B91"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
