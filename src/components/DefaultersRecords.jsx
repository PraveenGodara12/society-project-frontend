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

function DefaultersRecords() {
    let navigate = useNavigate();
    const isIdle = useIdle({ timeToIdle: 1000 * 60 * 5 });
    if (isIdle) {
        navigate('/');
    }
    const [month, setMonth] = useState("");
    const [year, setYear] = useState(0);
    const [maintenanceRecords, setMaintenanceRecords] = useState([]);
    const [monthList, setMonthList] = useState([]);
    const [yearList, setYearList] = useState([]);

    useEffect(() => {
        let rec = { month, year };
        AdminService.getDefaultersRecords(rec).then((res) => {
            setMaintenanceRecords(res.data);
            var mLis = res.data.map(mr => {
                return mr.month;
            });
            setMonth(res.data[0].month);
            setMonthList([...new Set(mLis)]);
            var yLis = res.data.map(mr => {
                return mr.year;
            });
            setYear(res.data[0].year)
            setYearList([...new Set(yLis)]);
        })
    }, []);

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
                    <div className="text-center">
                        <h1>
                            Defaulters Records
                        </h1>
                    </div>
                    <div className='row'>
                        <span className='col-sm-2'>
                            <div className="form-group">
                                <label htmlFor="month">month</label>
                                <select className='myformselect' id="month" defaultValue={month} onChange={(event) => setMonth(event.target.value)}>
                                    {
                                        monthList.map(
                                            mon =>
                                                <option value={mon}>{mon}</option>
                                        )
                                    }
                                </select>
                            </div>
                        </span>
                        <span className='col-sm-2'>
                            <div className="form-group">
                                <label htmlFor="year">Year</label>
                                <select className='myformselect' id="year" defaultValue={year} onChange={(event) => setYear(event.target.value)}>
                                    {
                                        yearList.map(
                                            mon =>
                                                <option value={mon}>{mon}</option>
                                        )
                                    }
                                </select>
                            </div>
                        </span>
                    </div>
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
                                    maintenanceRecords.filter(mrec => mrec.month === month && mrec.year === year).map(
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
            <footer class="page-footer font-small blue myFooter">
                <div class="footer-copyright text-center py-3"><span className='navi-links'>© 2020 Copyright:
                    <a href="https://localhost:3000/"> SocietyMaintenance.com</a></span>
                </div>
            </footer>
        </div>
    );
}
export default DefaultersRecords;