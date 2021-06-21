import React, { useContext, useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { UserContext } from "../App";
import { updateUserInfo } from "../firebase/firebase";

const UserProfile = () => {
  const history = useHistory();
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);
  const [user, setUser] = useState(loggedInUser);

  const handleChange = (e) => {
    const userInfo = { ...user };
    userInfo[e.target.name] = e.target.value;
    setUser(userInfo);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoggedInUser(user);
    localStorage.setItem("user", JSON.stringify(user));
    updateUserInfo(user).then(() => {
      history.push("/session");
    });
  };

  return (
    <section className="custom-height d-flex align-items-center bg-primary">
      <Container>
        <Row>
          <Col md={10} lg={8} className="offset-md-1 offset-lg-2">
            <Card body className="p-3">
              <h2>User Information</h2>
              <hr />
              <Form onSubmit={handleSubmit} className="pb-3">
                <Form.Group controlId="name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    name="name"
                    placeholder="Enter name"
                    onChange={handleChange}
                    value={user.name}
                  />
                </Form.Group>

                <Form.Group controlId="email">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    required
                    type="email"
                    placeholder="Enter email"
                    value={user.email}
                    disabled
                  />
                </Form.Group>

                <Form.Group controlId="name">
                  <Form.Label>Photo URL</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    name="photo"
                    placeholder="Enter name"
                    value={user.photo}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Button variant="primary" type="submit">
                  Update Information
                </Button>
              </Form>

              <Link to="/session" className="common_link btn btn-danger">
                Go Back
              </Link>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default UserProfile;
