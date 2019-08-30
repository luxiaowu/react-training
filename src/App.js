import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import './App.scss';
import Welcome from './example/Welcome';
import Todo from './example/Todo'
import Calculator from './example/Calculator'
import logo from './images/logo.svg';

function App() {
  return (
    <Router>
      <div className="App">
        <div className="aside">
          <div style={{textAlign: 'center', borderBottom: '1px solid #fff'}}>
            <img src={logo} className="App-logo logo" alt="logo" />
          </div>
          <nav>
            <ul>
              <li> <Link to="/">Welcom</Link> </li>
              <li> <Link to="/lifting-state-up">状态提升（lifting-state-up）</Link> </li>
              <li> <Link to="/todo">todolist</Link> </li>
            </ul>
          </nav>
        </div>

        <div className="main">
          <Route path="/" exact component={Welcome} />
          <Route path="/lifting-state-up" component={Calculator} />
          <Route path="/todo" component={Todo} />
        </div>
      </div>
    </Router>
  );
}

export default App;
