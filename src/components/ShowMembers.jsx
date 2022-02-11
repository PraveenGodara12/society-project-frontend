import React, { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom';
import AdminService from '../services/AdminService';

function ShowMembers(){

    const [memberRecords,setMemberRecords] = useState([]);

    useEffect(()=>{
        AdminService.getSocietyMembers().then((res)=>{
            setMemberRecords(res.data);
        }) 
    },[]);

    let navigate = useNavigate();

    function addMember(){
        navigate('/addMember');
    }
    
    return (
        <div>
            <h1>Society Members</h1>
            <button className='btn btn-primary' onClick={addMember}>AddMember</button>
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
                        memberRecords.map(
                            rec => 
                            <tr>
                                <td>{rec.userID}</td>
                                <td>{rec.name}</td>
                                <td>{rec.username}</td>
                                <td>{rec.email}</td>
                                <td>{rec.phone}</td>
                                <td>{rec.houseNo}</td>
                                <td>{rec.flatSize}</td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    );
}
export default ShowMembers;