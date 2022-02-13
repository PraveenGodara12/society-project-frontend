import React, { useEffect, useState } from "react";
import UserService from "../services/UserService";
import createActivityDetector from 'activity-detector';
import { useNavigate, Link } from 'react-router-dom';

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

function SocietyBillRecord() {
    let navigate = useNavigate();
    const isIdle = useIdle({ timeToIdle: 1000 * 60 * 5 });
    if (isIdle) {
        navigate('/');
    }
    const [billRecord, setBillRecord] = useState([]);

    useEffect(() => {
        UserService.getSocietyBillRecords().then(res => {
            setBillRecord(res.data);
        })
    }, []);

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
                                <Link className="nav-link" to={"/userProfile"}><p className='navi-links'>Profile</p></Link>
                            </li>
                            <li className="nav-item ">
                                <Link className="nav-link" to={"/societyBillRecord"}><p className='navi-links-active'>Society Bills</p></Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to={"/userlogin"}><p className='navi-links'>Logout</p></Link>
                            </li>
                        </ul>
                    </div>
                </nav>
                <section className="myContent">
                    <h1>Society Bill Records</h1>
                    <div className='scrollMyTable'>
                        <table className='table table-bordered table-responsive table-striped'>
                            <thead>
                                <tr>
                                    <td>Month</td>
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
                                    billRecord.map(
                                        rec =>
                                            <tr>
                                                <td>{rec.month}</td>
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
export default SocietyBillRecord;