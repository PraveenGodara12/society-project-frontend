import React, { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom';
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

function DefaultersRecords(){
    let navigate = useNavigate();
    const isIdle = useIdle({timeToIdle: 1000*60*5});
    if(isIdle){
        navigate('/');
    }
    const [month,setMonth] = useState("Feb");
    const [year,setYear] = useState(2020);
    const [maintenanceRecords,setMaintenanceRecords] = useState([]);

    useEffect(()=>{
        let rec = {month,year};
        AdminService.getDefaultersRecords(rec).then((res)=>{
            setMaintenanceRecords(res.data);
        }) 
    },[]);

    function editRecord(id){
        navigate('/addRecord/'+id);
    }
    
    return (
        <div>
            <h1>Defaulters Records</h1>
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
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    );
}
export default DefaultersRecords;