import { createContext, useContext, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";
import {
  getFirestore,
  addDoc,
  collection,
  getDocs,
  doc,
  getDoc,
  Firestore,
} from "firebase/firestore";
import { uploadToCloudinary } from "../services/cloudinary";
import { getMessaging } from "firebase/messaging";

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
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(firebaseApp);
export const messaging = getMessaging(firebaseApp);

export const useFirebase = () => useContext(FirebaseContext); // custom hook(normal fun) to access the state of context

export const FirebaseProvider = (props) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, []);

  const isLoggedIn = user ? true : false;

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

  const signinWithGoogle = () => signInWithPopup(auth, googleProvider);

  const handleBookListing = async (
    title,
    author,
    description,
    genre,
    isbn,
    price,
    coverPic
  ) => {
    try {
      if (coverPic.size > 300 * 1024) {
        alert("Please upload an image under 300 KB.");
        return;
      }

      const imageUrl = await uploadToCloudinary(coverPic);
      await addDoc(collection(db, "books"), {
        title,
        author,
        description,
        genre,
        isbn,
        price,
        imageURL: imageUrl,
        userID: user?.uid,
        userEmail: user?.email,
        displayName: user?.displayName,
        createdAt: new Date(),
      });

      console.log("Book successfully added.");
    } catch (err) {
      console.error("Error in handleBookListing:", err);
    }
  };

  const getBooksFromTheList = async () => {
    const querySnapshot = await getDocs(collection(db, "books"));
    return querySnapshot;
  };

  const getBookById = async (id) => {
    const bookRef = doc(db, "books", id);
    const result = await getDoc(bookRef);
    return result;
  };

  const placeOrder = async (bookId, qty, title, price) => {
    const collectionRef = collection(db, "books", bookId, "orders");
    const result = await addDoc(collectionRef, {
      userID: user?.uid,
      userEmail: user?.email,
      title,
      price,
      qty: Number(qty),
      orderedAt: new Date(),
      bookId,
    });
    return result;
  };

  return (
    <FirebaseContext.Provider
      value={{
        createNewUser,
        signInUser,
        signinWithGoogle,
        isLoggedIn,
        handleBookListing,
        getBooksFromTheList,
        getBookById,
        placeOrder,
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};
