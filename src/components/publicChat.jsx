import React from "react";
import {
  InputGroup,
  Input,
  InputGroupAddon,
  Button,
  Row,
  Col,
  ListGroup,
  ListGroupItemHeading,
  ListGroupItem
} from "reactstrap";
import socket from "../socketConfig";

class PublicChat extends React.Component {
  state = {
    room: "",
    name: "",
    rooms: []
  };

  componentDidMount() {
    socket.on("available_rooms", data => {
      this.setState({ rooms: data });
    });
  }

  componentWillUnmount() {
    socket.removeListener("available_rooms");
    socket.removeListener("join");
  }

  onChange = (e, type) => {
    this.setState({ [type]: e.target.value });
  };

  onCreate = e => {
    console.log(e);
    let { room, name } = this.state;
    if (e) {
      room = e;
    }
    if (!name || !room) {
      alert("Please type your name and room");
      return;
    }
    socket.emit("join", { room, name }, err => {
      if (err) {
        console.log(err);
        return alert(err);
      }
    });
    this.props.history.push(`/chat?room=${room}&name=${name}`);
  };

  render() {
    return (
      <React.Fragment>
        <Row>
          <Col lg={{ size: 4, offset: 2 }} style={{ marginTop: "32px" }}>
            <Row>
              <InputGroup size="sm" style={{ marginBottom: "5px" }}>
                <InputGroupAddon addonType="prepend">Name</InputGroupAddon>
                <Input onChange={e => this.onChange(e, "name")} />
              </InputGroup>
            </Row>
            <Row>
              <InputGroup size="sm">
                <InputGroupAddon addonType="prepend">Room</InputGroupAddon>
                <Input onChange={e => this.onChange(e, "room")} />
              </InputGroup>
            </Row>
            <Row>
              <Button
                size="sm"
                color="warning"
                style={{ marginTop: "10px" }}
                onClick={() => this.onCreate()}
              >
                Create & Join the Room
              </Button>
            </Row>
          </Col>
          <Col lg={{ size: 4 }}>
            <ListGroup>
              <ListGroupItemHeading>Available Rooms</ListGroupItemHeading>
              {this.state.rooms.map((room, i) => {
                return (
                  <ListGroupItem
                    key={i}
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    {room}
                    <Button
                      color="success"
                      size="sm"
                      onClick={() => this.onCreate(room)}
                    >
                      Join
                    </Button>
                  </ListGroupItem>
                );
              })}
              {/* <ListGroupItem
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                NodeJS
                <Button
                  color="success"
                  size="sm"
                  onClick={() => this.onCreate("NodeJS")}
                >
                  Join
                </Button>
              </ListGroupItem> */}
              {/* <ListGroupItem
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                JavaScript
                <Button
                  color="success"
                  size="sm"
                  onClick={() => this.onCreate("Javascript")}
                >
                  Join
                </Button>
              </ListGroupItem> */}
            </ListGroup>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

export default PublicChat;
