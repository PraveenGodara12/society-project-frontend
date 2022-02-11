import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './components/Home';
import UserLogin from './components/UserLogin';
import UserProfile from './components/UserProfile';
import UserLogin2 from './components/UserLogin2';
import SocietyBillRecord from './components/SocietyBillRecord';
import AdminProfile from './components/AdminProfile';
import ShowMembers from './components/ShowMembers';
import AddMember from './components/AddMember';

function App() {
  return (
        <Router>
              <Routes> 
                    <Route path = "/" exact element = {<Home/>}></Route>
                    <Route path = "/userlogin" element = {<UserLogin/>}></Route>
                    <Route path = "/userlogin2" element = {<UserLogin2/>}></Route>
                    <Route path = "/userProfile" element = {<UserProfile/>}></Route>
                    <Route path = "/adminProfile" element = {<AdminProfile/>}></Route>
                    <Route path = "/showMembers" element = {<ShowMembers/>}></Route>
                    <Route path = "/addMember" element = {<AddMember/>}></Route>
                    <Route path = "/societyBillRecord" element = {<SocietyBillRecord/>}></Route>
              </Routes>
        </Router>
  );
}

export default App;
