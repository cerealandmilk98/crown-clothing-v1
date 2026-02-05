// initialize firebase app
import { initializeApp } from "firebase/app";

// firebase auth tools
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
// firestore for user
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
const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account",
});

// sign in with google + auth
export const auth = getAuth();
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

// database
export const db = getFirestore();

// creating user
export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {},
) => {
  if (!userAuth) return;

  const userDocRef = doc(db, "users", userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }

  return userDocRef;
};

// create user with email and pass
export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

// sign in with email and pass
export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};
