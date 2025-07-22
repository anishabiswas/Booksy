import BookCard from "../components/Card.";
import { useFirebase } from "../context/Firebase";
import React, { useEffect, useState } from "react";
import CardGroup from "react-bootstrap/CardGroup";
import { getToken } from "firebase/messaging";
import { messaging } from "../context/Firebase";

const HomePage = () => {
  const firebase = useFirebase();
  const [books, setBooks] = useState([]);

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
      alert("you denied for the notif");
    }
  }

  useEffect(() => {
    // Req user for notification permission
    requestPermission();
  }, []);

  useEffect(() => {
    const fetchBooks = async () => {
      const result = await firebase.getBooksFromTheList();
      setBooks(result.docs);
    };
    fetchBooks();
  }, [firebase]);
  return (
    <div className="container mt-5">
      <h1 className="text-center">Welcome to Booksy</h1>
      <CardGroup>
        {books.map((book) => (
          <BookCard key={book.id} id={book.id} {...book.data()} />
        ))}
      </CardGroup>
    </div>
  );
};

export default HomePage;
