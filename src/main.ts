import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBK_iI-ejmWsk2y_tBufCwAI9oJBWwzZRY",
  authDomain: "taskmatepro-85f50.firebaseapp.com",
  projectId: "taskmatepro-85f50",
  storageBucket: "taskmatepro-85f50.firebasestorage.app",
  messagingSenderId: "634112080614",
  appId: "1:634112080614:web:193cd2969e6e354f265927",
  measurementId: "G-8JW5YS4B91"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));

  