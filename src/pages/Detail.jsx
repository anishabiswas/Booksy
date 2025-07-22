import { useParams } from "react-router";
import { useFirebase } from "../context/Firebase";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";

const BookDetailPage = () => {
  const params = useParams(); // get an object with id
  const firebase = useFirebase();
  const [book, setBook] = useState(null);

  useEffect(() => {
    //returns a promise

    firebase.getBookById(params.bookId).then((value) => setBook(value.data()));
  }, []);

  if (book == null) {
    return <div>Loading...</div>;
  }

  console.log(book);
  return (
    <div className="container mt-5">
      <h1 className="text-center">Book Details</h1>
      <h2>{book.name}</h2>
      <img
        src={book.imageURL}
        alt="book name"
        style={{ width: "50%", borderRadius: "10px" }}
      />
      <p>Price: Rs. {book.price}</p>
      <p>ISBN Number. {book.isbn}</p>
      <h1>Owner Details</h1>
      <p>Name: {book.displayName}</p>
      <p>Email: {book.userEmail}</p>
      {/* <img src={book.photoURL} alt="user" /> */}
      <Button variant="success">Buy now</Button>
    </div>
  );
};

export default BookDetailPage;
