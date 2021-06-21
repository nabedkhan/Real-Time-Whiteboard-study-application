import React, { useContext, useEffect, useState } from "react";
import { Card, Col, Container, Row, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { UserContext } from "../App";
import { getUserSessionList } from "../firebase/firebase";

const SessionHistory = () => {
  const { loggedInUser } = useContext(UserContext);
  const [sessionList, setSessionList] = useState([]);

  useEffect(() => {
    getUserSessionList(loggedInUser.email).then((data) => {
      const sessions = [];
      data.forEach((doc) => sessions.push(doc.data()));
      setSessionList(sessions);
    });
  }, [loggedInUser]);

  return (
    <section className="custom-height d-flex align-items-center bg-primary">
      <Container>
        <Row>
          <Col md={12} lg={10} className="text-center offset-lg-1">
            <Card body className="p-5">
              <h3>Total Session List</h3>
              <hr className="w-50" />
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Session Name</th>
                    <th>Session Description</th>
                    <th>Session Link</th>
                    <th>Creation Date</th>
                  </tr>
                </thead>
                <tbody>
                  {sessionList.map((session, index) => (
                    <tr key={index}>
                      <td>{session.name}</td>
                      <td>{session.description}</td>
                      <td>{`https://real-time-study-server.herokuapp.com${session.link}`}</td>
                      <td>{Date(session.time).substring(0, 15)}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>

              <Link to="/" className="btn">
                Go Back
              </Link>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default SessionHistory;
