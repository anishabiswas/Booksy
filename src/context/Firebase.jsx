import { createContext, useContext } from "react";
import { initializeApp } from "firebase/app";

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

export const useFirebase = () => useContext(FirebaseContext); // custom hook(normal fun) to access the state of context

export const FirebaseProvider = (props) => {
  return <FirebaseContext.Provider>{props.children}</FirebaseContext.Provider>;
};
