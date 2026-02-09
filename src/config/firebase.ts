import { initializeApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {

};

const app = initializeApp(firebaseConfig);

// Export dengan tipe data yang jelas
export const auth: Auth = getAuth(app);
export const db: Firestore = getFirestore(app);
