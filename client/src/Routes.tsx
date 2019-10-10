import React from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Authenticate } from './pages/Authenticate';

export const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <div>
        <header>
          <div>
            <Link to="/">Home</Link>
          </div>
          <div>
            <Link to="/Login">Login</Link>
          </div>
          <div>
            <Link to="/Register">Register</Link>
          </div>
          <div>
            <Link to="/Authenticate">Authenticate</Link>
          </div>
        </header>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/Login" component={Login} />
          <Route exact path="/Register" component={Register} />
          <Route exact path="/Authenticate" component={Authenticate} />
        </Switch>
      </div>
    </BrowserRouter>
  )
}
