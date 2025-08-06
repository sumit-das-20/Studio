
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  projectId: 'taskbatao',
  appId: '1:99780414671:web:f50791766ba192894a7bba',
  storageBucket: 'taskbatao.appspot.com',
  apiKey: 'AIzaSyB2RbPCV8JDmgp4wd8FNqjCiBM67KOSLHo',
  authDomain: 'taskbatao.firebaseapp.com',
  measurementId: 'G-S1JNB92V1L',
  messagingSenderId: '99780414671',
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

export { app, auth };
