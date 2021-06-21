import React from "react";
import { Button, Card } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";

const Participates = ({ userList, handleLeaveBtn }) => {
  return (
    <Card
      body
      style={{ display: "flex", flexDirection: "column", height: "100%" }}
    >
      <div>
        <h2>Participates</h2>
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
            {userList.map((user) => {
              return (
                <div
                  className="participate mb-2 d-flex align-items-center"
                  key={user.id}
                >
                  {user.photo ? (
                    <img
                      src={user.photo}
                      width="50"
                      style={{ borderRadius: "50%", marginRight: "10px " }}
                      alt=""
                    />
                  ) : (
                    <FaUserCircle
                      size="2rem"
                      style={{ color: "#000", marginRight: "10px" }}
                    />
                  )}
                  <h6 className="user-name mb-0">{user.name}</h6>
                </div>
              );
            })}
          </div>
        </div>

        <Button
          variant="danger"
          className="mt-3 w-100"
          onClick={handleLeaveBtn}
        >
          Leave Session
        </Button>
      </div>
    </Card>
  );
};

export default Participates;
