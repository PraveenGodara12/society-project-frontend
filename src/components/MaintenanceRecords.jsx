import React, { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom';
import AdminService from '../services/AdminService';

function MaintenanceRecords(){
    const [month,setMonth] = useState("Feb");
    const [year,setYear] = useState(2020);
    const [maintenanceRecords,setMaintenanceRecords] = useState([]);

    useEffect(()=>{
        let rec = {month,year};
        AdminService.getMaintenanceRecords(rec).then((res)=>{
            setMaintenanceRecords(res.data);
        }) 
    },[]);

    let navigate = useNavigate();

    function addRecord(){
        navigate('/addRecord/'+0);
    }
    function editRecord(id){
        navigate('/addRecord/'+id);
    }
    function deleteRecord(id){
        AdminService.deleteRecord(id).then(res=>{
            setMaintenanceRecords(res.data);
        });
    }
    
    return (
        <div>
            <h1>Maintenance Records</h1>
            <button className='btn btn-primary' onClick={addRecord}>Add Record</button>
            <table>
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
                        <td>Delete</td>
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
                                <td><button className='btn btn-success' onClick={()=>editRecord(rec.recordID)}>Edit</button></td>
                                <td><button className='btn btn-danger' onClick={()=>deleteRecord(rec.recordID)}>Delete</button></td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    );
}
export default MaintenanceRecords;