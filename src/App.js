import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './components/Home';
import UserLogin from './components/UserLogin';
import UserProfile from './components/UserProfile';

function App() {
  return (
    <div>
        <Router>
          <div className="container">
            <h1>Hello</h1>
              <Routes> 
                    <Route path = "/" exact element = {<Home/>}></Route>
                    <Route path = "/userlogin" element = {<UserLogin/>}></Route>
                    <Route path = "/userProfile" element = {<UserProfile/>}></Route>
              </Routes>
          </div>
        </Router>
    </div>
  );
}

export default App;
