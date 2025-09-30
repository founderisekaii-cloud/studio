import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  projectId: 'studio-7431626649-b1dea',
  appId: '1:15295763075:web:ec42d22080843c786701b6',
  apiKey: 'AIzaSyDHRUQn3vkbC-iBmHRJdMA41KtNxIaU7PQ',
  authDomain: 'studio-7431626649-b1dea.firebaseapp.com',
  measurementId: '',
  messagingSenderId: '15295763075',
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

export { app, auth };
