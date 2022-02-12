import React, { useEffect, useState } from 'react';
import AdminService from '../services/AdminService';
import { useNavigate, useParams } from 'react-router-dom';

function AddMaintenanceRecord() {
    const [user, setUser] = useState(0);
    const [bill, setBill] = useState(0);
    const [garbageCollector, setGarbageCollector] = useState(0);
    const [waterCharges, setWaterCharges] = useState(0);
    const [electricity, setElectricity] = useState(0);
    const [others, setOthers] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);
    const [status, setStatus] = useState("Pending");
    const [paymentDate, setPayment] = useState();
    const [month, setMonth] = useState("");
    const [year, setYear] = useState(0);
    const [userList, setUserList] = useState([]);
    const [billList, setBillList] = useState([]);
    let id = useParams().id;

    useEffect(()=>{
        if(id!=0){
            AdminService.getMaintenanceRecordById(id).then((res)=>{
                setUser(res.data.user.userID);
                setBill(res.data.bill.billID);
                setGarbageCollector(res.data.garbageCollector);
                setWaterCharges(res.data.waterCharges);
                setElectricity(res.data.electricity);
                setOthers(res.data.others);
                setTotalAmount(res.data.totalAmount);
                setStatus(res.data.status);
                setPayment(res.data.paymentDate);
                setMonth(res.data.month);
                setYear(res.data.year);
            });
            return;
        }
        AdminService.getSocietyMembers().then((res)=>{
            setUser(res.data[0].userID);
            setUserList(res.data);
        });
        AdminService.getSocietyBill().then((res)=>{
            setBill(res.data[0].billID);
            setBillList(res.data);
        });
    },[]);
    let navigate = useNavigate();
    function add(e) {
        e.preventDefault();
        let mRecord = {garbageCollector:garbageCollector, waterCharges: waterCharges, electricity:electricity, others:others, totalAmount: totalAmount, status: status, paymentDate: paymentDate, month: month, year: year };
        console.log(user);
        AdminService.addMaintenanceRecord(mRecord,user,bill,id).then(() => {
            navigate('/showMaintenance');
        });
    }
    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="card col-md-6 offset-md-3 offset-md-3">
                        {
                            <h2 className='text-center'>Add Member</h2>
                        }
                        <div className="card-body">
                            <form onSubmit={add}>
                                <div className="form-group">
                                    <label htmlFor="user">User</label>
                                    <select name="user" id="user" onChange={(event)=>setUser(event.target.value)}>
                                        {
                                            userList.map(
                                                u =>
                                                <option value={u.userID}>{u.userID}. {u.name}</option>
                                            )
                                        }
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="bill">Bill</label>
                                    <select name="bill" id="bill" onChange={(event)=>setBill(event.target.value)}>
                                        {
                                            billList.map(
                                                u =>
                                                <option value={u.billID}>{u.billID}. {u.month}</option>
                                            )
                                        }
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Garbage Collector</label>
                                    <input type="number" className="form-control" placeholder="Enter garbage collector" name="garbageCollector" 
                                    value={garbageCollector} onChange={(event)=>setGarbageCollector(event.target.value)}/>
                                </div>

                                <div className="form-group">
                                    <label>Water Charges</label>
                                    <input type="number" className="form-control" placeholder="Enter water charges" name="waterCharges"
                                    value={waterCharges} onChange={(event)=>setWaterCharges(event.target.value)} />
                                </div>

                                <div className="form-group">
                                    <label>Electricity</label>
                                    <input type="number" className="form-control" placeholder="Enter electricity" name="electricity"
                                    value={electricity} onChange={(event)=>setElectricity(event.target.value)} />
                                </div>

                                <div className="form-group">
                                    <label>Other Charges</label>
                                    <input type="number" className="form-control" placeholder="Enter other charges" name="others"
                                    value={others} onChange={(event)=>setOthers(event.target.value)} />
                                </div>

                                <div className="form-group">
                                    <label>Total Amount</label>
                                    <input type="number" className="form-control" placeholder="Enter total amount" name="totalAmount"
                                    value={totalAmount} onChange={(event)=>setTotalAmount(event.target.value)} />
                                </div>

                                <div className="form-group">
                                    <label>Status</label>
                                    <input type="text" className="form-control" placeholder="Enter status" name="status"
                                    value={status} onChange={(event)=>setStatus(event.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="month">month</label>
                                    <select id="month" defaultValue={"Jan"} onChange={(event)=>setMonth(event.target.value)}>
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
                                <div className="form-group">
                                    <label>Year</label>
                                    <input type="number" className="form-control" placeholder="Enter year" name="year"
                                    value={year} onChange={(event)=>setYear(event.target.value)} />
                                </div>

                                <button type="submit" className="btn btn-primary btn-block">Add</button>
                            </form>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default AddMaintenanceRecord;