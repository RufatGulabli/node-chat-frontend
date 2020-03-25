import React, { Component } from 'react';
import { Link } from "react-router-dom";
import {
    Navbar,
    NavbarBrand,
    NavItem,
    Nav,
    NavLink,
    Collapse,
    NavbarToggler
} from 'reactstrap';

class Header extends Component {
    state = {
        isOpen: false
    }

    toggle = () => {
        this.setState({ isOpen: !this.state.isOpen });
    }

    render() {
        return (<div style={{ marginBottom: '30px' }}>
            <Navbar color="light" light expand="md">
                <NavbarBrand tag={Link} to="/">Chat App</NavbarBrand>
                <NavbarToggler onClick={this.toggle} />
                <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav className="mr-auto">
                        <NavItem>
                            <NavLink tag={Link} to="/live">Live Visitors</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink tag={Link} to="/roomchat">Room Chat</NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>

            </Navbar>
        </div>);
    }
}

export default Header;