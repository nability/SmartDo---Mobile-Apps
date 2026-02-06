import { initializeApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDItL8huRYuw_dH-v79r9umbXpD6acXSA4",
  authDomain: "projectuas-3d168.firebaseapp.com",
  projectId: "projectuas-3d168",
  storageBucket: "projectuas-3d168.firebasestorage.app",
  messagingSenderId: "990878890216",
  appId: "1:990878890216:web:199d544384c40d9f75f15d"
};

const app = initializeApp(firebaseConfig);

// Export dengan tipe data yang jelas
export const auth: Auth = getAuth(app);
export const db: Firestore = getFirestore(app);