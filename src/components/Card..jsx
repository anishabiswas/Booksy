import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useFirebase } from "../context/Firebase";

const BookCard = (props) => {
  const firebase = useFirebase();

  return (
    <Card style={{ width: "18rem", margin: "15px" }}>
      <Card.Img
        variant="top"
        src={props.imageURL}
        alt={props.name}
        style={{ height: "250px", objectFit: "cover" }}
      />
      <Card.Body>
        <Card.Title>{props.name}</Card.Title>
        <Card.Text>
          This books name is {props.name} and sold by {props.displayName}.
        </Card.Text>
        <Card.Text>This book costs Rs.{props.price}</Card.Text>
        <Button variant="primary">More to know</Button>
      </Card.Body>
    </Card>
  );
};

export default BookCard;
