import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyASV6STz8chGkUAQQiGQg_7ZqcdkhzMco8',
  authDomain: 'disneyplusclone-rahul4dev.firebaseapp.com',
  projectId: 'disneyplusclone-rahul4dev',
  storageBucket: 'disneyplusclone-rahul4dev.appspot.com',
  messagingSenderId: '549837073497',
  appId: '1:549837073497:web:bc1f78ae5d5fca83135548',
  measurementId: 'G-N9ZVR2R5KT',
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth();

// for google authentication
const provider = new GoogleAuthProvider();
const storage = getStorage();

const authHandler = signInWithPopup(auth, provider)
  .then((result) => console.log(result))
  .catch((err) => alert(err.message));

export { auth, provider, storage, authHandler };
export default db;
