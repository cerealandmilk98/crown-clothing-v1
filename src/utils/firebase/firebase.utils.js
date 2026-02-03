// initialize firebase app
import { initializeApp } from "firebase/app";

// firebase auth tools
import {
  getAuth,
  signInWithCredential,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
// firestore
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

// firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDRegLlpVeUD5N4-YG4qlp41AHEcrNTi4c",
  authDomain: "crwn-clothing-db-f8e2f.firebaseapp.com",
  projectId: "crwn-clothing-db-f8e2f",
  storageBucket: "crwn-clothing-db-f8e2f.firebasestorage.app",
  messagingSenderId: "378223075931",
  appId: "1:378223075931:web:6667db3593be8bb642557e",
};

const firebaseApp = initializeApp(firebaseConfig);

// google provider
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});

// sign in with google + auth
export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

// database
export const db = getFirestore();

// creating user
export const createUserDocumentFromAuth = async (useAuth) => {
  const userDocRef = doc(db, "users", useAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = useAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }

  return userDocRef;
};
