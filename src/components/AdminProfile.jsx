import React, { useState, useEffect } from "react";
import { useNavigate, Link } from 'react-router-dom';
import createActivityDetector from 'activity-detector';


function useIdle(options) {
    const [isIdle, setIsIdle] = React.useState(false)
    React.useEffect(() => {
        const activityDetector = createActivityDetector(options)
        activityDetector.on('idle', () => setIsIdle(true))
        activityDetector.on('active', () => setIsIdle(false))
        return () => activityDetector.stop()
    }, [])
    return isIdle
}



function AdminProfile() {
    let navigate = useNavigate();
    const isIdle = useIdle({ timeToIdle: 1000 * 60 * 5 });
    if (isIdle) {
        navigate('/');
    }
    const [adminID, setAdminid] = useState(0);
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    useEffect(() => {
        setAdminid(localStorage.getItem('adminID'));
        setName(localStorage.getItem('name'));
        setUsername(localStorage.getItem('username'));
        setEmail(localStorage.getItem('email'));
        setPhone(localStorage.getItem('phone'));
    }, [adminID]);
    return (
        <div>
            <div className='loginBackGround'>
                <nav className="navbar navbar-expand-lg navbar-light fixed-top">
                    <div className="container">
                        <h1>
                            Society Maintenance Portal
                        </h1>
                    </div>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                        <ul className="navbar-nav ml-auto navbar-right">
                            <li className="nav-item">
                                <Link className="nav-link" to={"/"}><p className='navi-links'>Home</p></Link>
                            </li>
                            <li className="nav-item ">
                                <Link className="nav-link" to={"/showMembers"}><p className='navi-links'>Society Members</p></Link>
                            </li>
                            <li className="nav-item ">
                                <Link className="nav-link" to={"/showMaintenance"}><p className='navi-links'>Maintenance Records</p></Link>
                            </li>
                            <li className="nav-item ">
                                <Link className="nav-link" to={"/showDefaulters"}><p className='navi-links'>Defaulters</p></Link>
                            </li>
                            <li className="nav-item ">
                                <Link className="nav-link" to={"/showSocietyBillRecords"}><p className='navi-links'>Society Bills</p></Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to={"/adminlogin"}><p className='navi-links'>Logout</p></Link>
                            </li>
                        </ul>
                    </div>
                </nav>
                <section className="myContent">
                    <div className="text-center">
                        <h1>
                            Login Success
                        </h1>
                    </div>
                    <table>
                        <tr>
                            <td>Admin ID</td><td>:</td><td>{adminID}</td>
                        </tr>
                        <tr>
                            <td>Name</td><td>:</td><td>{name}</td>
                        </tr>
                        <tr>
                            <td>Username</td><td>:</td><td>{username}</td>
                        </tr>
                        <tr>
                            <td>Email</td><td>:</td><td>{email}</td>
                        </tr>
                        <tr>
                            <td>Phone</td><td>:</td><td>{phone}</td>
                        </tr>
                    </table>
                </section>
            </div>
            <footer class="page-footer font-small blue myFooter">
                <div class="footer-copyright text-center py-3"><span className='navi-links'>© 2020 Copyright:
                    <a href="https://localhost:3000/"> SocietyMaintenance.com</a></span>
                </div>
            </footer>
        </div>
    );
}
export default AdminProfile;