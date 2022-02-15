import React, { useEffect, useState } from 'react';
import UserService from '../services/UserService';
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

function UserProfile() {
    let navigate = useNavigate();
    const isIdle = useIdle({ timeToIdle: 1000 * 60 * 5 });
    if (isIdle&&false) {
        navigate('/');
    }
    const [userid, setUserid] = useState(0);
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [houseNo, setHouseNo] = useState(0);
    const [flatSize, setFlatSize] = useState('');
    const [maintenanceRecords, setMaintenanceRecords] = useState([]);

    useEffect(() => {
        setUserid(localStorage.getItem('userID'));
        setName(localStorage.getItem('name'));
        setUsername(localStorage.getItem('username'));
        setEmail(localStorage.getItem('email'));
        setPhone(localStorage.getItem('phone'));
        setHouseNo(localStorage.getItem('houseNo'));
        setFlatSize(localStorage.getItem('flatSize'));

        UserService.getMaintenanceData(userid, new Date().getFullYear()).then((res) => {
            console.log(res.data);
            setMaintenanceRecords(res.data);
        })
    }, [userid]);
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
                                <Link className="nav-link" to={"/societyBillRecord"}><p className='navi-links'>Society Bills</p></Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to={"/userlogin"}><p className='navi-links'>Logout</p></Link>
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
                            <td>User ID</td><td>:</td><td>{userid}</td>
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
                        <tr>
                            <td>House Number</td><td>:</td><td>{houseNo}</td>
                        </tr>
                        <tr>
                            <td>Flat Size</td><td>:</td><td>{flatSize}</td>

                        </tr>
                    </table>
                    <br />
                    <div>
                        <h2>Maintenance Records</h2>
                    </div>
                    <div className='scrollMyTable'>
                        <table className='table table-bordered table-responsive table-striped'>
                            <thead>
                                <tr>
                                    <td>User ID</td>
                                    <td>Garbage Collector</td>
                                    <td>Water Charges</td>
                                    <td>Electricity</td>
                                    <td>Others</td>
                                    <td>Total Amount</td>
                                    <td>Status</td>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    maintenanceRecords.map(
                                        rec =>
                                            <tr>
                                                <td>{rec.user.userID}</td>
                                                <td>{rec.garbageCollector}</td>
                                                <td>{rec.waterCharges}</td>
                                                <td>{rec.electricity}</td>
                                                <td>{rec.others}</td>
                                                <td>{rec.totalAmount}</td>
                                                <td>{rec.status}</td>
                                            </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
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

export default UserProfile;