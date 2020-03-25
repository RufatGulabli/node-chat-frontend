import React from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import Message from "../Message/message";
import "./messages.css";

const Messages = ({ messages, name }) => {
  return (
    <ScrollToBottom className="config">
      {messages.map((m, i) => {
        return (
          <div key={i}>
            <Message message={m} name={name} />
          </div>
        );
      })}
    </ScrollToBottom>
  );
};

export default Messages;
