import { createContext, useContext } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const FirebaseContext = createContext(null);

const firebaseConfig = {
  apiKey: "AIzaSyDnGPTKQ533tCdrRMONsBKHxuG8bd3IEwM",
  authDomain: "booksy-e61b6.firebaseapp.com",
  projectId: "booksy-e61b6",
  storageBucket: "booksy-e61b6.firebasestorage.app",
  messagingSenderId: "174567715488",
  appId: "1:174567715488:web:8a9e889cfa60679dac4fc5",
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

export const useFirebase = () => useContext(FirebaseContext); // custom hook(normal fun) to access the state of context

export const FirebaseProvider = (props) => {
  const createNewUser = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        console.log("successfully achieved", user);
        // ...
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  const signInUser = async (email, password) => {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  };
  return (
    <FirebaseContext.Provider value={{ createNewUser, signInUser }}>
      {props.children}
    </FirebaseContext.Provider>
  );
};
