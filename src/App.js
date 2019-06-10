import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';

import Home from './containers/home';
import Todo from './containers/todo';

class App extends Component {
  render() {
    return (
      <div>
        <ul>
          <li><Link to="/home">Home</Link></li>
          <li><Link to="/todo">Todo</Link></li>
        </ul>

        <Switch>
          <Route path="/todo" component={Todo} />
          <Route path="/" component={Home} />
        </Switch>

      </div>
    );
  }
}

export default App;
