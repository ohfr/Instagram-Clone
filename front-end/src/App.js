import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import ProtectedRoute from './Components/ProtectedRoute';
import Home from './Components/Home';
import Login from './Components/Login';
import Register from './Components/Register';

function App() {
  return (
    <div className="App">
      <ProtectedRoute exact path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
    </div>
  );
}

export default App;
