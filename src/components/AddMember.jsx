import React, { useEffect, useState } from 'react';
import AdminService from '../services/AdminService';
import { useNavigate, useParams, Link } from 'react-router-dom';
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

function AddMember() {
    let navigate = useNavigate();
    const isIdle = useIdle({ timeToIdle: 1000 * 60 * 5 });
    if (isIdle) {
        navigate('/');
    }
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [houseNo, setHouseNo] = useState(0);
    const [flatSize, setFlatSize] = useState("");
    let id = useParams().id;

    useEffect(() => {
        AdminService.getUserById(id).then((res) => {
            setName(res.data.name);
            setUsername(res.data.username);
            setEmail(res.data.email);
            setPhone(res.data.phone);
            setHouseNo(res.data.houseNo);
            setFlatSize(res.data.flatSize);
        });
    }, []);
    function add(e) {
        e.preventDefault();
        let user = { name: name, username: username, email: email, phone: phone, houseNo: houseNo, flatSize: flatSize };
        AdminService.addUser(user, id).then(() => {
            navigate('/showMembers');
        });
    }
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
                                <Link className="nav-link" to={"/showDefaulters"}><p className='navi-links-active'>Defaulters</p></Link>
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
                    <div className="container">
                        <div className="row">
                            <div className="card col-md-6 offset-md-3 offset-md-3">
                                {
                                    <h2 className='text-center'>Add Member</h2>
                                }
                                <div className="card-body">
                                    <form onSubmit={add}>
                                        <div className="form-group">
                                            <label>Name</label>
                                            <input type="text" className="form-control" placeholder="Enter Name" name="name"
                                                value={name} onChange={(event) => setName(event.target.value)} />
                                        </div>

                                        <div className="form-group">
                                            <label>Username</label>
                                            <input type="text" className="form-control" placeholder="Enter username" name="username"
                                                value={username} onChange={(event) => setUsername(event.target.value)} />
                                        </div>

                                        <div className="form-group">
                                            <label>Email address</label>
                                            <input type="email" className="form-control" placeholder="Enter email" name="email"
                                                value={email} onChange={(event) => setEmail(event.target.value)} />
                                        </div>

                                        <div className="form-group">
                                            <label>Phone</label>
                                            <input type="text" className="form-control" placeholder="Enter phone number"
                                                value={phone} onChange={(event) => setPhone(event.target.value)} />
                                        </div>
                                        <div className="form-group">
                                            <label>House Number</label>
                                            <input type="number" className="form-control" placeholder="Enter house number"
                                                value={houseNo} onChange={(event) => setHouseNo(event.target.value)} />
                                        </div>
                                        <div className="form-group">
                                            <label>Flat Size</label>
                                            <input type="text" className="form-control" placeholder="Enter flat size"
                                                value={flatSize} onChange={(event) => setFlatSize(event.target.value)} />
                                        </div>

                                        <button type="submit" className="btn btn-primary btn-block">Add</button>
                                    </form>
                                </div>
                            </div>
                        </div>
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

export default AddMember;