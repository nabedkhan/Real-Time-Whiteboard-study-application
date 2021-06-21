import React, { useContext, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Modal,
  Row,
} from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import slugify from "slugify";
import { v1 as uuid } from "uuid";
import { UserContext } from "../App";
import { auth, createNewSession } from "../firebase/firebase";

const CreateSession = () => {
  const history = useHistory();
  const id = uuid();
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);
  const [show, setShow] = useState(false);
  const [sessionName, setSessionName] = useState("");
  const [sessionDescription, setSessionDescription] = useState("");

  const handleSessionSubmit = (e) => {
    e.preventDefault();
    if (!sessionName.value || !sessionDescription.value) {
      const link = `/${slugify(sessionName, { lower: true })}/${id}`;
      const { email } = loggedInUser;
      createNewSession({
        sessionName,
        sessionDescription,
        email,
        link,
      });
      const newUser = { ...loggedInUser, isAdmin: true };
      setLoggedInUser(newUser);
      localStorage.setItem("user", JSON.stringify(newUser));
      history.push(link);
    }
  };
  const handleLogout = async () => {
    await auth.signOut();
    setLoggedInUser(null);
    localStorage.removeItem("user");
  };

  return (
    <section className="custom-height d-flex align-items-center bg-primary">
      <Container>
        <Row>
          <Col md={10} lg={8} className="text-center offset-md-1 offset-lg-3">
            <Card body className="p-5">
              <h3>Create a new session</h3>
              <hr className="w-50" />
              <Button
                variant="info"
                onClick={() => setShow(true)}
                className="my-5"
              >
                Create a Session
              </Button>

              <div className="pt-5 d-flex justify-content-around">
                <Link to="/profile" className="common_link btn btn-primary">
                  User Profile
                </Link>
                <Link
                  to="/session_history"
                  className="common_link btn btn-warning"
                >
                  Session History
                </Link>
                <button
                  onClick={handleLogout}
                  className="common_link btn btn-danger"
                >
                  Log out
                </button>
              </div>

              <Modal show={show} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                  <Modal.Title>Create a Session</Modal.Title>
                </Modal.Header>
                <Modal.Body className="p-5">
                  <Form onSubmit={handleSessionSubmit}>
                    <Form.Group controlId="session">
                      <Form.Label>Session Name</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        placeholder="Enter a session name..."
                        onChange={(e) => setSessionName(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group controlId="sessionDescription">
                      <Form.Label>Session Description</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        placeholder="Write a description...."
                        onChange={(e) => setSessionDescription(e.target.value)}
                      />
                    </Form.Group>
                    <Button variant="primary" type="submit" className="w-100">
                      Submit
                    </Button>
                  </Form>
                </Modal.Body>
              </Modal>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default CreateSession;
