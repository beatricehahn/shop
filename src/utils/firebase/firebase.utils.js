import { initializeApp } from 'firebase/app'; // creates an App instance
// import { getAnalytics } from 'firebase/analytics'; // Google analytics
import { 
    getAuth, 
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyApLg4NPX_bXtPWKRXQ9HzkeX3So4jBbgM",
    authDomain: "shopdb-a53e8.firebaseapp.com",
    projectId: "shopdb-a53e8",
    storageBucket: "shopdb-a53e8.appspot.com",
    messagingSenderId: "198078775646",
    appId: "1:198078775646:web:67429e4d5c2e9689448fcf",
    measurementId: "G-8PLB4KP642"
  };
  
// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// logEvent(analytics, 'notification_recieved');

const googleProvider = new GoogleAuthProvider(); // a class connected to Firebase's Google Auth version

googleProvider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);

// database access
export const db = getFirestore();

export const createUserDocFromAuth = async (
    userAuth,
    additionalInformation ={}
) => {
    if (!userAuth) return;
    
    // check for existing document reference
    // doc takes three params: database, collection, unique identifier (uid)
    const userDocRef = doc(db, 'users', userAuth.uid);
    console.log(userDocRef);

    // This object helps you check if it exists
    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot);
    console.log(userSnapshot.exists());

    // Check if snapshot exists
    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date(); // when User signs in

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation
            });
        } catch (error) {
            console.log('Error creating user', error.message);
        }

        return userDocRef;
    }
};

// create an authenticated user
export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;
    return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;
    return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

// observer listener
export const onAuthStateChangedListener = (callback) => {
    onAuthStateChanged(auth, callback);
}
