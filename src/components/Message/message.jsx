import React from "react";
import "./Message.css";

const Message = ({ message, name }) => {
  const isCurrentUser = name === message.user;
  let justifyContent = {
    justifyContent: "flex-end"
  };

  if (!isCurrentUser) {
    justifyContent = {
      justifyContent: "flex-start"
    };
  }

  return (
    <div style={justifyContent} className="mycontainer">
      <div className="commonView">
        <div
          style={{
            color: "black",
            paddingRight: "10px",
            fontWeight: "bolder"
          }}
        >
          {message.user}:
        </div>
        <div> {message.text}</div>
      </div>
    </div>
  );
};

export default Message;
