import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './components/Home';
import UserLogin from './components/UserLogin';

function App() {
  return (
    <div>
        <Router>
          <div className="container">
            <h1>Hello</h1>
              <Routes> 
                    <Route path = "/" element = {<Home/>}></Route>
                    <Route path = "/userlogin" element = {<UserLogin/>}></Route>
              </Routes>
          </div>
        </Router>
    </div>
  );
}

export default App;
