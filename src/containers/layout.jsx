import React from 'react'
import { Route, Switch } from "react-router-dom";
import routes from "../routes";

const Layout = (props) => {
    return (
        <Switch >
            {routes.map((route, idx) => {
                return route.Component
                    ? (<Route key={idx} path={route.path} exact={route.exact}
                        render={props => <route.Component {...props} />} />)
                    : null;
            })}
        </Switch>
    );
}

export default Layout;