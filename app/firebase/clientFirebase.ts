import 'server-only';


//firebase initialization
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getStorage, connectStorageEmulator } from "firebase/storage";





// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_APIKEY,
  authDomain:process.env.FIREBASE_AUTHDOMAIN ,
  projectId:process.env.FIREBASE_PROJECT_ID ,
  storageBucket:process.env.FIREBASE_STORAGE_BUCKET ,
  messagingSenderId:process.env.FIREBASE_MESSAGING_SENDER_ID ,
  appId:process.env.FIREBASE_APP_ID 
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const storage = getStorage(app);






// we need to use emulators to interact with firestore and storage in our local dev
// and make sure to run in a new terminal 'firebase emulators:start'

if (process.env.NODE_ENV === 'development') {
 connectFirestoreEmulator(db, '127.0.0.1', 8080);
 connectStorageEmulator(storage, "127.0.0.1", 9199);
}

export { db, storage };
