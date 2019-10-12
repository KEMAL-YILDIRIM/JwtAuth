import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Authenticate } from './pages/Authenticate';
import { Header } from './components/Header';

export const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <div>
        <Header/>
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
