import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router";
import BookCover from "./BookCover";

const BookCard = ({ id, title, price, author, genre, imageURL, isbn }) => {
  const navigate = useNavigate();

  return (
    <Card className="shadow-sm m-3" style={{ width: "25rem" }}>
      {/* Cover Image */}
      <BookCover isbn={isbn} imageURL={imageURL} title={title} />
      {/* Card Body */}
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">by {author}</Card.Subtitle>
        <Card.Text>
          <strong>Genre:</strong> {genre}
          <br />
          <strong>Price:</strong> ₹{price}
        </Card.Text>
        <Button variant="primary" onClick={(e) => navigate(`/book/view/${id}`)}>
          More Details
        </Button>
      </Card.Body>
    </Card>
  );
};

export default BookCard;
