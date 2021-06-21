import React, { useContext } from "react";
import { Card } from "react-bootstrap";
import { UserContext } from "../App";

const Messages = ({ handleWriteMessage, messages }) => {
  const {
    loggedInUser: { email },
  } = useContext(UserContext);

  return (
    <Card
      body
      style={{ display: "flex", flexDirection: "column", height: "100%" }}
    >
      <h2>Messages</h2>
      <hr />
      <div>
        <div
          style={{
            height: "80vh",
            padding: "5px",
            overflow: "auto",
            backgroundColor: "#f7f7f9",
          }}
        >
          {messages.map((message, index) => {
            return (
              <div
                className={`${
                  message.email === email
                    ? "outgoing-msg chat"
                    : "incoming-msg chat"
                } mb-2`}
                key={index}
              >
                <h6 className="user-name mb-0">{message.user}</h6>
                <p className="user-message mb-0">{message.text}</p>
                <span className="time_date">
                  {new Date().toLocaleTimeString()}
                </span>
              </div>
            );
          })}
        </div>
        <input
          type="text"
          className="form-control message-input mt-3"
          placeholder="Write a new message..."
          onKeyPress={handleWriteMessage}
        />
      </div>
    </Card>
  );
};

export default Messages;
