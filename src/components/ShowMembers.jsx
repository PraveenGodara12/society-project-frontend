import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AdminService from '../services/AdminService';
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

function ShowMembers() {
    let navigate = useNavigate();
    const isIdle = useIdle({ timeToIdle: 1000 * 60 * 5 });
    if (isIdle) {
        navigate('/');
    }

    const [memberRecords, setMemberRecords] = useState([]);

    useEffect(() => {
        AdminService.getSocietyMembers().then((res) => {
            setMemberRecords(res.data);
        })
    }, []);

    function addMember() {
        navigate('/addMember/' + 0);
    }
    function adminProfile() {
        navigate('/adminProfile');
    }
    function editMember(id) {
        navigate('/addMember/' + id);
    }
    function deleteMember(id) {
        AdminService.deleteMember(id).then(res => {
            setMemberRecords(res.data);
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
                                <Link className="nav-link" to={"/showMembers"}><p className='navi-links-active'>Society Members</p></Link>
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
                        Society Members
                        </h1>
                    </div>
                    <div className='btn-group'>
                    <button className='btn btn-primary' onClick={addMember}>AddMember</button>
                    <button className='btn btn-primary' onClick={adminProfile}>Profile</button>
                    </div>
                    <div className='scrollMyTableBig'>
                        <table className='table table-bordered table-responsive table-striped'>
                            <thead>
                                <tr>
                                    <td>User ID</td>
                                    <td>Name</td>
                                    <td>Username</td>
                                    <td>Email</td>
                                    <td>Phone</td>
                                    <td>House Number</td>
                                    <td>Flat Size</td>
                                    <td>Edit</td>
                                    <td>Delete</td>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    memberRecords.map(
                                        rec =>
                                            <tr>
                                                <td>{rec.userID}</td>
                                                <td>{rec.name}</td>
                                                <td>{rec.username}</td>
                                                <td>{rec.email}</td>
                                                <td>{rec.phone}</td>
                                                <td>{rec.houseNo}</td>
                                                <td>{rec.flatSize}</td>
                                                <td><button className='btn btn-success' onClick={() => editMember(rec.userID)}>Edit</button></td>
                                                <td><button className='btn btn-danger' onClick={() => deleteMember(rec.userID)}>Delete</button></td>
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
export default ShowMembers;