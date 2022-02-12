import React, { useEffect, useState } from "react";
import UserService from "../services/UserService";
import createActivityDetector from 'activity-detector';
import {useNavigate} from 'react-router-dom';

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

function SocietyBillRecord(){
    let navigate = useNavigate();
    const isIdle = useIdle({timeToIdle: 1000*60*5});
    if(isIdle){
        navigate('/');
    }
    const [billRecord, setBillRecord] = useState([]);

    useEffect(()=>{
        UserService.getSocietyBillRecords().then(res=>{
            setBillRecord(res.data);
        })
    },[]);

    return (
        <div>
            <h1>Society Bill Records</h1>
            <table>
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
    );
}
export default SocietyBillRecord;