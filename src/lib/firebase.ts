
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  projectId: 'taskbatao',
  appId: '1:99780414671:web:f50791766ba192894a7bba',
  storageBucket: 'taskbatao.firebasestorage.app',
  apiKey: 'AIzaSyB2RbPCV8JDmgp4wd8FNqjCiBM67KOSLHo',
  authDomain: 'taskbatao.firebaseapp.com',
  measurementId: '',
  messagingSenderId: '99780414671',
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

export { app, auth };
