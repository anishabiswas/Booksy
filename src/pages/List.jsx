import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useFirebase } from "../context/Firebase";

const List = () => {
  const [name, setName] = useState("");
  const [isbn, setIsbn] = useState("");
  const [price, setPrice] = useState("");
  const [coverPic, setCoverPic] = useState("");

  const firebase = useFirebase();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await firebase.handleBookListing(name, isbn, price, coverPic);
    setName("");
    setIsbn("");
    setPrice("");
    setCoverPic("");
  };

  return (
    <div className="container mt-3">
      <Form>
        <Form.Group className="mb-3" controlId="formBasicBookName">
          <Form.Label>Book Name</Form.Label>
          <Form.Control
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
            placeholder="Enter Book name"
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
