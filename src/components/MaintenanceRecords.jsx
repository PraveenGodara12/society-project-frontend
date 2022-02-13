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

function MaintenanceRecords() {
    let navigate = useNavigate();
    const isIdle = useIdle({ timeToIdle: 1000 * 60 * 5 });
    if (isIdle) {
        navigate('/');
    }
    const [month, setMonth] = useState("Feb");
    const [year, setYear] = useState(2020);
    const [maintenanceRecords, setMaintenanceRecords] = useState([]);

    useEffect(() => {
        let rec = { month, year };
        AdminService.getMaintenanceRecords(rec).then((res) => {
            setMaintenanceRecords(res.data);
        })
    }, []);

    function addRecord() {
        navigate('/addRecord/' + 0);
    }
    function editRecord(id) {
        navigate('/addRecord/' + id);
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
                                <Link className="nav-link" to={"/showMaintenance"}><p className='navi-links-active'>Maintenance Records</p></Link>
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
                            Maintenance Records
                        </h1>
                    </div>
                    <button className='btn btn-primary' onClick={addRecord}>Add Record</button>
                    <br />
                    <div className='scrollMyTableBig'>
                        <table className='table table-bordered table-responsive table-striped'>
                            <thead>
                                <tr>
                                    <td>Record ID</td>
                                    <td>User ID</td>
                                    <td>Bill ID</td>
                                    <td>Garbage Collector</td>
                                    <td>Water Charges</td>
                                    <td>Electricity</td>
                                    <td>Others</td>
                                    <td>Total Amount</td>
                                    <td>Status</td>
                                    <td>Payment Date</td>
                                    <td>Edit</td>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    maintenanceRecords.map(
                                        rec =>
                                            <tr>
                                                <td>{rec.recordID}</td>
                                                <td>{rec.user.userID}</td>
                                                <td>{rec.bill.billID}</td>
                                                <td>{rec.garbageCollector}</td>
                                                <td>{rec.waterCharges}</td>
                                                <td>{rec.electricity}</td>
                                                <td>{rec.others}</td>
                                                <td>{rec.totalAmount}</td>
                                                <td>{rec.status}</td>
                                                <td>{rec.paymentDate}</td>
                                                <td><button className='btn btn-success' onClick={() => editRecord(rec.recordID)}>Edit</button></td>
                                            </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
        </div>
    );
}
export default MaintenanceRecords;