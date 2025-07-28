import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useFirebase } from "../context/Firebase";

const List = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [genre, setGenre] = useState("");
  const [isbn, setIsbn] = useState("");
  const [price, setPrice] = useState("");
  const [coverPic, setCoverPic] = useState(null);

  const firebase = useFirebase();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await firebase.handleBookListing(
      title,
      author,
      description,
      genre,
      isbn,
      price,
      coverPic
    );
    setTitle("");
    setAuthor("");
    setDescription("");
    setGenre("");
    setIsbn("");
    setPrice("");
    setCoverPic(null);
  };

  return (
    <div className="container mt-3">
      <Form>
        <Form.Group className="mb-3" controlId="formBasicBookName">
          <Form.Label>Book Title</Form.Label>
          <Form.Control
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            placeholder="Enter Book name"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicBookAuthor">
          <Form.Label>Book Author</Form.Label>
          <Form.Control
            type="text"
            onChange={(e) => setAuthor(e.target.value)}
            value={author}
            placeholder="Enter Book author name"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicBookDescription">
          <Form.Label>Book Description</Form.Label>
          <Form.Control
            type="text"
            as="textarea"
            rows={3}
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            placeholder="Enter book description"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicBookGenre">
          <Form.Label>Book Genre</Form.Label>
          <Form.Control
            type="text"
            onChange={(e) => setGenre(e.target.value)}
            value={genre}
            placeholder="Eg. romance, self-help, finance, tech, classic, thriller"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicISBN">
          <Form.Label>ISBN</Form.Label>
          <Form.Control
            type="text"
            onChange={(e) => setIsbn(e.target.value)}
            value={isbn}
            placeholder="ISBN number"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPrice">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            placeholder="Enter Price"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicCoverPic">
          <Form.Label>Cover Pic</Form.Label>
          <Form.Control
            type="file"
            onChange={(e) => setCoverPic(e.target.files[0])}
          />
        </Form.Group>

        <Button variant="primary" type="submit" onClick={handleSubmit}>
          Create
        </Button>
      </Form>
    </div>
  );
};

export default List;
