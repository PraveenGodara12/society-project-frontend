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
        navigate('/addMember/'+0);
    }
    function editMember(id){
        navigate('/addMember/'+id);
    }
    function deleteMember(id){
        AdminService.deleteMember(id).then(res=>{
            setMemberRecords(res.data);
        });
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
                        <td>Edit</td>
                        <td>Delete</td>
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
                                <td><button className='btn btn-success' onClick={()=>editMember(rec.userID)}>Edit</button></td>
                                <td><button className='btn btn-danger' onClick={()=>deleteMember(rec.userID)}>Delete</button></td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    );
}
export default ShowMembers;