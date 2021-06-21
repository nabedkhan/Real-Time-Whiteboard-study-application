import React, { useContext, useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import io from "socket.io-client";
import { UserContext } from "../App";
import Draw from "../components/Draw";
import Messages from "../components/Messages";
import Participates from "../components/Participates";
import { auth } from "../firebase/firebase";

let socket;
const Dashboard = () => {
  const { sessionName } = useParams();
  const history = useHistory();
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);
  const [userList, setUserList] = useState([]);
  const [messages, setMessages] = useState([]);
  const [operations, setOperations] = useState([]);

  useEffect(() => {
    socket = io("https://real-time-study-server.herokuapp.com", { transport : ['websocket'] });

    // new user join
    socket.emit("join", {
      sessionName,
      email: loggedInUser["email"],
      others: loggedInUser,
    });

    // get all users list
    socket.on("userList", ({ userList }) => {
      setUserList(userList);
    });

    // get all messages
    socket.on("message", (msg) => {
      setMessages((existingMsg) => [...existingMsg, msg]);
    });

    // get all drawing items
    socket.on("draw", (draw) => {
      setOperations(draw);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionName]);

  // if user not admin then can't draw
  if (!loggedInUser.isAdmin) {
    require("../header.css");
  }

  const handleLeaveBtn = async (e) => {
    e.preventDefault();
    if (window.confirm("Are you sure you want to leave?")) {
      try {
        await auth.signOut();
        localStorage.removeItem("user");
        setLoggedInUser(null);
        socket.close();
        history.push("/");
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleWriteMessage = (e) => {
    if (e.target.value !== "" && e.key === "Enter") {
      socket.emit("message", e.target.value);
      e.target.value = "";
    }
  };

  const handleDrawChange = (newOperation, afterOperation) => {
    socket.emit("draw", afterOperation);
  };

  return (
    <section className="custom-height bg-primary">
      <Container fluid>
        <Row>
          <Col md={2} className="px-0">
            <Participates userList={userList} handleLeaveBtn={handleLeaveBtn} />
          </Col>

          <Col md={8} className="px-0 drawing-board">
            <Draw operations={operations} handleDrawChange={handleDrawChange} />
          </Col>

          <Col md={2} className="px-0">
            <Messages
              handleWriteMessage={handleWriteMessage}
              messages={messages}
            />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Dashboard;
