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

function AddSocietyBillRecord() {
    let navigate = useNavigate();
    const isIdle = useIdle({ timeToIdle: 1000 * 60 * 5 });
    if (isIdle) {
        navigate('/');
    }
    const [garbageCollector, setGarbageCollector] = useState(0);
    const [waterCharges, setWaterCharges] = useState(0);
    const [electricity, setElectricity] = useState(0);
    const [others, setOthers] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);
    const [status, setStatus] = useState("Pending");
    const [paymentDate, setPayment] = useState();
    const [month, setMonth] = useState("");
    const [year, setYear] = useState(0);

    function add(e) {
        e.preventDefault();
        let mRecord = { garbageCollector: garbageCollector, waterCharges: waterCharges, electricity: electricity, others: others, totalAmount: totalAmount, status: status, paymentDate: paymentDate, month: month, year: year };
        AdminService.addSocietyBillRecord(mRecord).then(() => {
            navigate('/showSocietyBillRecords');
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
                                <Link className="nav-link" to={"/showDefaulters"}><p className='navi-links'>Defaulters</p></Link>
                            </li>
                            <li className="nav-item ">
                                <Link className="nav-link" to={"/showSocietyBillRecords"}><p className='navi-links-active'>Society Bills</p></Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to={"/adminlogin"}><p className='navi-links'>Logout</p></Link>
                            </li>
                        </ul>
                    </div>
                </nav>
                <section className="myContentBig">
                    <div className="container">
                        <div className="row">
                            <div className="card col-md-6 offset-md-3 offset-md-3">
                                {
                                    <h2 className='text-center'>Add Society Bill Record</h2>
                                }
                                <div className="card-body">
                                    <form onSubmit={add}>
                                        <div className='row'>
                                            <span className='col-sm-4'>
                                                <div className="form-group">
                                                    <label htmlFor="month">month</label>
                                                    <select className='myformselect' id="month" defaultValue={"Jan"} onChange={(event) => setMonth(event.target.value)}>
                                                        <option value="Jan">January</option>
                                                        <option value="Feb">February</option>
                                                        <option value="Mar">March</option>
                                                        <option value="Apr">April</option>
                                                        <option value="May">May</option>
                                                        <option value="Jun">June</option>
                                                        <option value="Jul">July</option>
                                                        <option value="Aug">August</option>
                                                        <option value="Sep">September</option>
                                                        <option value="Oct">October</option>
                                                        <option value="Nov">November</option>
                                                        <option value="Dec">December</option>
                                                    </select>
                                                </div>
                                            </span>
                                        </div>
                                        <div className="form-group">
                                            <label>Garbage Collector</label>
                                            <input type="number" className="form-control" placeholder="Enter garbage collector" name="garbageCollector"
                                                value={garbageCollector} onChange={(event) => setGarbageCollector(event.target.value)} />
                                        </div>

                                        <div className="form-group">
                                            <label>Water Charges</label>
                                            <input type="number" className="form-control" placeholder="Enter water charges" name="waterCharges"
                                                value={waterCharges} onChange={(event) => setWaterCharges(event.target.value)} />
                                        </div>

                                        <div className="form-group">
                                            <label>Electricity</label>
                                            <input type="number" className="form-control" placeholder="Enter electricity" name="electricity"
                                                value={electricity} onChange={(event) => setElectricity(event.target.value)} />
                                        </div>

                                        <div className="form-group">
                                            <label>Other Charges</label>
                                            <input type="number" className="form-control" placeholder="Enter other charges" name="others"
                                                value={others} onChange={(event) => setOthers(event.target.value)} />
                                        </div>

                                        <div className="form-group">
                                            <label>Total Amount</label>
                                            <input type="number" className="form-control" placeholder="Enter total amount" name="totalAmount"
                                                value={totalAmount} onChange={(event) => setTotalAmount(event.target.value)} />
                                        </div>

                                        <div className="form-group">
                                            <label>Status</label>
                                            <input type="text" className="form-control" placeholder="Enter status" name="status"
                                                value={status} onChange={(event) => setStatus(event.target.value)} />
                                        </div>
                                        <div className="form-group">
                                            <label>Year</label>
                                            <input type="number" className="form-control" placeholder="Enter year" name="year"
                                                value={year} onChange={(event) => setYear(event.target.value)} />
                                        </div>
                                        <br />
                                        <button type="submit" className="btn btn-primary btn-block loginButton">Add</button>
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

export default AddSocietyBillRecord;