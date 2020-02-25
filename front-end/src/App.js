import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import ProtectedRoute from './Components/ProtectedRoute';
import Home from './Components/Home';
import Login from './Components/Login';
import Register from './Components/Register';
import Profile from './Components/Profile';
import Nav from './Components/Nav';

function App() {
  return (
    <div className="App">
      <ProtectedRoute path="/" component={Nav} />
      <ProtectedRoute exact path="/" component={Home} />
      <ProtectedRoute path="/Profile" component={Profile} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
    </div>
  );
}

export default App;
