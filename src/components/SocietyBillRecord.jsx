import React, { useEffect, useState } from "react";
import UserService from "../services/UserService";

function SocietyBillRecord(){
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