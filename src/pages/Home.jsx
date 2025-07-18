import BookCard from "../components/Card.";
import { useFirebase } from "../context/Firebase";
import React, { useEffect, useState } from "react";
import CardGroup from "react-bootstrap/CardGroup";

const HomePage = () => {
  const firebase = useFirebase();
  const [books, setBooks] = useState([]);

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
