import React, { useEffect, useState } from 'react';
import UserService from '../services/UserService';
import {useNavigate} from 'react-router-dom';

function UserProfile() {
    const [userid,setUserid] = useState(0);
    const [name,setName] = useState('');
    const [username,setUsername] = useState('');
    const [email,setEmail] = useState('');
    const [phone,setPhone] = useState('');
    const [houseNo,setHouseNo] = useState(0);
    const [flatSize,setFlatSize] = useState('');
    const [maintenanceRecords,setMaintenanceRecords] = useState([]);

    useEffect(()=>{
        setUserid(localStorage.getItem('userID'));
        setName(localStorage.getItem('name'));
        setUsername(localStorage.getItem('username'));
        setEmail(localStorage.getItem('email'));
        setPhone(localStorage.getItem('phone'));
        setHouseNo(localStorage.getItem('houseNo'));
        setFlatSize(localStorage.getItem('flatSize'));

        UserService.getMaintenanceData(userid,new Date().getFullYear()).then((res)=>{
            console.log(res.data);
            setMaintenanceRecords(res.data);
        })
    },[userid]);

    let navigate = useNavigate();
    function showBill(){
        navigate('/societyBillRecord');
    }
    return (
        <div>
            <h1>Login Success</h1>
            <button className='btn btn-primary' onClick={showBill}>Show Society Bill Records</button>
            <table>
                <thead>
                    <tr>
                        <td>User ID</td>
                        <td>Name</td>
                        <td>Username</td>
                        <td>Email</td>
                        <td>Phone</td>
                        <td>House Number</td>
                        <td>Flat Size</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{userid}</td>
                        <td>{name}</td>
                        <td>{username}</td>
                        <td>{email}</td>
                        <td>{phone}</td>
                        <td>{houseNo}</td>
                        <td>{flatSize}</td>
                    </tr>
                </tbody>
            </table>
            <table>
                <thead>
                    <tr>
                        <td>User ID</td>
                        <td>Name</td>
                        <td>Username</td>
                        <td>Email</td>
                        <td>Phone</td>
                        <td>House Number</td>
                        <td>Flat Size</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        maintenanceRecords.map(
                            rec => 
                            <tr>
                                <td>{rec.user.userID}</td>
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

export default UserProfile;