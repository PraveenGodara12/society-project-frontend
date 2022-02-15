import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './components/Home';
import UserLogin from './components/UserLogin';
import UserProfile from './components/UserProfile';
import AdminLogin from './components/AdminLogin';
import SocietyBillRecord from './components/SocietyBillRecord';
import AdminProfile from './components/AdminProfile';
import ShowMembers from './components/ShowMembers';
import AddMember from './components/AddMember';
import MaintenanceRecords from './components/MaintenanceRecords';
import AddMaintenanceRecord from './components/AddMaintenanceRecord';
import DefaultersRecords from './components/DefaultersRecords';
import SocietyBillRecordsAdmin from './components/SocietyBillRecordsAdmin';
import AddSocietyBillRecord from './components/AddSocietyBillRecord';

function App() {
  return (
        <Router>
              <Routes> 
                    <Route path = "/" exact element = {<Home/>}></Route>
                    <Route path = "/userlogin" element = {<UserLogin/>}></Route>
                    <Route path = "/adminLogin" element = {<AdminLogin/>}></Route>
                    <Route path = "/userProfile" element = {<UserProfile/>}></Route>
                    <Route path = "/adminProfile" element = {<AdminProfile/>}></Route>
                    <Route path = "/showMembers" element = {<ShowMembers/>}></Route>
                    <Route path = "/addMember/:id" element = {<AddMember/>}></Route>
                    <Route path = "/addRecord/:id" element = {<AddMaintenanceRecord/>}></Route>
                    <Route path = "/societyBillRecord" element = {<SocietyBillRecord/>}></Route>
                    <Route path = "/showMaintenance" element = {<MaintenanceRecords/>}></Route>
                    <Route path = "/showDefaulters" element = {<DefaultersRecords/>}></Route>
                    <Route path = "/showSocietyBillRecords" element = {<SocietyBillRecordsAdmin/>}></Route>
                    <Route path = "/addSocietyBillRecord" element = {<AddSocietyBillRecord/>}></Route>
              </Routes>
        </Router>
  );
}

export default App;
