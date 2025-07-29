import { useParams } from "react-router";
import { useFirebase } from "../context/Firebase";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import BookCover from "../components/BookCover";
import Card from "react-bootstrap/Card";
import { Col, Row } from "react-bootstrap";

const BookDetailPage = () => {
  const { bookId } = useParams(); // get an object with id
  const firebase = useFirebase();
  const [book, setBook] = useState(null);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    //returns a promise
    const fetchBook = async () => {
      const doc = await firebase.getBookById(bookId);
      if (doc.exists()) {
        setBook({ id: doc.id, ...doc.data() });
      } else {
        // Fallback: try from mock data
        const res = await fetch("/mockapi.json");
        const data = await res.json();
        const mockBook = data.find((b) => b.id.toString() === bookId);
        if (mockBook) setBook(mockBook);
      }
    };
    fetchBook();
  }, [bookId, firebase]);

  if (book == null) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  const placeOrder = async () => {
    const result = await firebase.placeOrder(
      bookId,
      qty,
      book.title,
      book.price
    );
    console.log("Order Placed", result);
  };

  console.log(book);
  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Book Details</h1>
      <Card className="mx-auto shadow p-4" style={{ maxWidth: "800px" }}>
        <Row className="g-4 align-items-center">
          <Col md={5}>
            <Card>
              <BookCover
                isbn={book.isbn}
                imageURL={book.imageURL}
                title={book.title}
              />
            </Card>
          </Col>
          {/* Body */}
          <Col md={7} className="ps-md-4">
            <h2 className="my-3">{book.title}</h2>
            <p>
              <strong>Author:</strong> {book.author}
            </p>
            <p>
              <strong>Genre:</strong> {book.genre}
            </p>
            <p>
              <strong>Price:</strong> ₹{book.price}
            </p>
            <p>
              <strong>Description:</strong> {book.description}
            </p>

            <Form.Group className="mb-3 mt-3" controlId="formBasicQuantity">
              <Form.Label>Qty:</Form.Label>
              <Form.Control
                onChange={(e) => setQty(e.target.value)}
                value={qty}
                type="Number"
                placeholder="Enter Qty"
                style={{ maxWidth: "120px" }}
              />
            </Form.Group>

            <Button onClick={placeOrder} variant="success" className="mt-2">
              Buy now
            </Button>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default BookDetailPage;
