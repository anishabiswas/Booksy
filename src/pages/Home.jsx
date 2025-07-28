import BookCard from "../components/Card.";
import { useFirebase } from "../context/Firebase";
import { useEffect, useState } from "react";
import { getToken } from "firebase/messaging";
import { messaging } from "../context/Firebase";

const HomePage = () => {
  const firebase = useFirebase();
  const [books, setBooks] = useState([]);
  const [mockBooks, setMockBooks] = useState([]);

  async function requestPermission() {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      //generate token
      const token = await getToken(messaging, {
        vapidKey:
          "BAPRqBBkwjBCouU5oB91Ju4ETAYGbZYppdmNSySX9VU_er43yGa6MB8o5bVfBhIKUvVsGYmbNJ8YbwXv92m6ds4",
      });
      console.log("token is generated ", token);
    } else if (permission === "denied") {
      alert("you denied for the notification. Please, allow it.");
    }
  }

  useEffect(() => {
    // Req user for notification permission
    requestPermission();
  }, []);

  useEffect(() => {
    //user entered firestore books
    const fetchBooks = async () => {
      const result = await firebase.getBooksFromTheList();
      const firestoreBooks = result.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBooks(firestoreBooks);
    };
    fetchBooks();
  }, [firebase]);

  useEffect(() => {
    //Load mock books from public/mockapi.json
    const fetchMockBooks = async () => {
      const res = await fetch("/mockapi.json");
      const data = await res.json();
      setMockBooks(data);
    };

    fetchMockBooks();
  }, []);

  const allBooks = [...mockBooks, ...books];

  return (
    <div className="container mt-5">
      <h1 className="text-center">Welcome to Booksy</h1>
      <div className="row">
        {allBooks.map((book) => (
          <div
            className="col-md-3 d-flex justify-content-center mb-4"
            key={book.id}
          >
            <BookCard {...book} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
