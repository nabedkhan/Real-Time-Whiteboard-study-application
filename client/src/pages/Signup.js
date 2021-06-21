import React, { useContext, useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import StatusAlert, { StatusAlertService } from "react-status-alert";
import { UserContext } from "../App";
import { auth } from "../firebase/firebase";

const Signup = ({ history }) => {
  const { setLoggedInUser } = useContext(UserContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fieldError, setFieldError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.length > 5) {
      if (password === confirmPassword) {
        setFieldError(null);
        // send user info data in firebase
        try {
          const { user } = await auth.createUserWithEmailAndPassword(
            email,
            password
          );
          user.updateProfile({
            displayName: name,
          });
          const userData = {
            name: user.displayName,
            email: user.email,
            photo: user.photoURL,
          };
          localStorage.setItem("user", JSON.stringify(userData));
          setLoggedInUser(userData);
          history.push("/session");
        } catch (error) {
          StatusAlertService.showError(error.message);
        }
      } else {
        setFieldError("Password does not match");
      }
    } else {
      setFieldError("Password should be at least 6 characters");
    }
  };
  return (
    <section className="custom-height d-flex align-items-center bg-primary">
      <Container>
        <Row>
          <Col md={10} lg={8} className="offset-md-1 offset-lg-2">
            <Card body className="p-5">
              <h2>Create a new account</h2>
              <hr />
              <Form onSubmit={handleSubmit} className="pb-3">
                <Form.Group controlId="name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Enter name"
                    onBlur={(e) => setName(e.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="email">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    required
                    type="email"
                    placeholder="Enter email"
                    onBlur={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    required
                    type="password"
                    placeholder="Enter password"
                    onBlur={(e) => setPassword(e.target.value)}
                    isInvalid={fieldError !== null}
                  />
                  <Form.Control.Feedback type="invalid">
                    {fieldError}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="confrimPassword">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    required
                    type="password"
                    placeholder="Confirm password"
                    onBlur={(e) => setConfirmPassword(e.target.value)}
                    isInvalid={fieldError !== null}
                  />
                  <Form.Control.Feedback type="invalid">
                    {fieldError}
                  </Form.Control.Feedback>
                </Form.Group>
                <Button variant="primary" type="submit">
                  Sign Up
                </Button>
              </Form>
              <StatusAlert />
              <Link to="/">Already have an account? Sign In</Link>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Signup;
