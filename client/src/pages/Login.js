import React, { useContext, useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import StatusAlert, { StatusAlertService } from "react-status-alert";
import { UserContext } from "../App";
import { auth } from "../firebase/firebase";

const Login = ({ history, location }) => {
  const { setLoggedInUser } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { from } = location.state || { from: { pathname: "/session" } };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { user } = await auth.signInWithEmailAndPassword(email, password);
      const userData = {
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
      };
      localStorage.setItem("user", JSON.stringify(userData));
      setLoggedInUser(userData);
      history.replace(from);
    } catch (error) {
      StatusAlertService.showError(error.message);
    }
  };

  return (
    <section className="custom-height d-flex align-items-center bg-light bg-primary">
      <Container>
        <Row>
          <Col md={10} lg={6} className="offset-md-1 offset-lg-3">
            <Card body className="p-4">
              <h1>Sign In</h1>
              <hr />
              <Form onSubmit={handleSubmit} className="pb-3">
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    required
                    type="email"
                    placeholder="Enter email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                  />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    required
                    type="password"
                    placeholder="Enter password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                  />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Sign In
                </Button>
              </Form>
              <StatusAlert />
              <Link to="/signup">Don't have an account? Sign Up</Link>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Login;
