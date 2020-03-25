import React from 'react';
import { Container } from 'reactstrap';
import Header from './components/header';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Layout from './containers/layout';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Container>
        <Switch>
          <Route path="/" component={Layout} />
        </Switch>
      </Container>
    </BrowserRouter>
  );
}

export default App;
