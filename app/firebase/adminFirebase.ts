import 'server-only';

// this file is used by nextauth,our authenticated users are created either in dev or production depending on the environment we are on
import { cert, initializeApp as initializeAdminApp, getApps } from "firebase-admin/app";
import { getFirestore as getAdminFirestore } from "firebase-admin/firestore";




const isDevelopment = process.env.NODE_ENV === 'development';

if (!getApps().length) {
  initializeAdminApp({
    credential: cert({
      projectId: process.env.AUTH_FIREBASE_PROJECT_ID,
      clientEmail: process.env.AUTH_FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.AUTH_FIREBASE_PRIVATE_KEY,
    }),
  });

  if (isDevelopment) {
    //firebase admin sdk checks for these env variables to connect to the emulators when development environment
    process.env.FIRESTORE_EMULATOR_HOST = '127.0.0.1:8080';
    process.env.FIREBASE_STORAGE_EMULATOR_HOST = '127.0.0.1:9199';
  }
}


// Initialize Firestore
const adminFirestore = getAdminFirestore();




export { adminFirestore };
