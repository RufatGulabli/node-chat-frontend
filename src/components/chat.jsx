import React, { useState, useEffect } from "react";
import socket from "../socketConfig";
import querystring from "query-string";
import Messages from "./Messages/messages";
import {
  InputGroupAddon,
  InputGroup,
  Button,
  Input,
  Row,
  Col
} from "reactstrap";

const Chat = ({ location, history }) => {
  const [messages, setMessages] = useState([]);
  const [myMessage, setMyMessage] = useState("");
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");

  useEffect(() => {
    const { room, name } = querystring.parse(location.search);
    setRoom(room);
    setName(name);
  }, [room, name, location.search]);

  useEffect(() => {
    socket.on("message", data => {
      setMessages(msgs => msgs.concat([data]));
    });
    return () => {
      socket.emit("forceDisconnect");
      socket.removeListener("message");
    };
  }, []);

  const onSend = () => {
    if (!myMessage) {
      return;
    }
    socket.emit("message", {
      room: room,
      message: myMessage,
      user: name
    });
    setMyMessage("");
  };

  return (
    <Row>
      <Col lg={{ size: 8, offset: 2 }}>
        <h5>Room: {room}</h5>
        <div>
          <Messages messages={messages} name={name} />
          <InputGroup>
            <Input
              onChange={e => setMyMessage(e.target.value)}
              value={myMessage}
              onKeyPress={e => (e.key === "Enter" ? onSend() : null)}
            />
            <InputGroupAddon addonType="append">
              <Button color="primary" onClick={onSend}>
                Send
              </Button>
            </InputGroupAddon>
          </InputGroup>
        </div>
      </Col>
    </Row>
  );
};

// class Chat extends Component {
//   state = {
//     messages: [],
//     myMessage: "",
//     name: "",
//     room: ""
//   };

//   componentDidMount() {
//     console.log("Component Did Mount...");
//     const { room, name } = querystring.parse(this.props.location.search);
//     socket.on("message", data => {
//       console.log("socket event...");
//       const msgs = [...this.state.messages];
//       msgs.push(data);
//       this.setState({ messages: msgs });
//     });
//     this.setState({
//       name,
//       room
//     });
//   }

//   onSetMyMessage = e => {
//     this.setState({ myMessage: e.target.value });
//   };

//   onSend = () => {
//     const { room, myMessage, name } = this.state;
//     socket.emit("message", {
//       room: room,
//       message: myMessage,
//       user: name
//     });
//     this.setState({ myMessage: "" });
//   };

//   render() {
//     const { room, myMessage, name, messages } = this.state;
//     return (
//       <Row>
//         <Col lg={{ size: 8, offset: 2 }}>
//           <h5>Room: {room}</h5>
//           <div>
//             <Messages messages={messages} name={name} />
//             <InputGroup>
//               <Input
//                 onChange={e => this.onSetMyMessage(e)}
//                 value={myMessage}
//                 onKeyPress={e => (e.key === "Enter" ? this.onSend() : null)}
//               />
//               <InputGroupAddon addonType="append">
//                 <Button color="primary" onClick={this.onSend}>
//                   Send
//                 </Button>
//               </InputGroupAddon>
//             </InputGroup>
//           </div>
//         </Col>
//       </Row>
//     );
//   }
// }

export default Chat;
