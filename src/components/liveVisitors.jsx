import React, { Component } from 'react';
import axios from 'axios';
import socket from '../socketConfig';
import { Table } from "reactstrap";

class LiveVisitors extends Component {

    state = {
        visitors: []
    }

    componentDidMount() {
        axios.get("http://geoplugin.net/json.gp").then(resp => {
            const visitor = {
                ip: resp.data.geoplugin_request,
                flag: `https://www.countryflags.io/${resp.data.geoplugin_countryCode}/flat/32.png`,
                city: resp.data.geoplugin_city,
                state: resp.data.geoplugin_region,
                country: resp.data.geoplugin_countryName
            };
            socket.emit("new_visitor", visitor);
            socket.on("visitors", (data) => {
                this.setState({ visitors: data });
            });
        });
    }


    renderBody = () => {
        const visitors = this.state.visitors.map((visitor, index) => {
            return (
                <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{visitor.ip || null}</td>
                    <td><img src={visitor.flag} alt={visitor.country} /></td>
                    <td>{visitor.city}</td>
                    <td>{visitor.state}</td>
                    <td>{visitor.country}</td>
                </tr>
            )
        });
        return visitors;
    }

    render() {
        return (
            <React.Fragment>
                <h3>Live Visitors</h3>
                <Table size="sm">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>IP</th>
                            <th>Flag</th>
                            <th>City</th>
                            <th>State</th>
                            <th>Country</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderBody()}
                    </tbody>
                </Table>
            </React.Fragment>
        );
    }
}

export default LiveVisitors;