import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useFirebase } from "../context/Firebase";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const firebase = useFirebase();

  const handleForm = async (e) => {
    e.preventDefault();
    console.log("Log in a user");
    try {
      const result = await firebase.signInUser(email, password);
      console.log("Successfully Logged in", result);
    } catch (err) {
      console.error("Login failed:", err.message);
    }
    setEmail("");
    setPassword("");
  };

  return (
    <div className="container mt-3">
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="Enter email"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="Password"
          />
        </Form.Group>

        <Button variant="primary" type="submit" onClick={handleForm}>
          Login
        </Button>
      </Form>
    </div>
  );
};

export default Login;
