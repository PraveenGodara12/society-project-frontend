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

function ShowMembers(){
    let navigate = useNavigate();
    const isIdle = useIdle({timeToIdle: 1000*60*5});
    if(isIdle){
        navigate('/');
    }

    const [memberRecords,setMemberRecords] = useState([]);

    useEffect(()=>{
        AdminService.getSocietyMembers().then((res)=>{
            setMemberRecords(res.data);
        }) 
    },[]);

    function addMember(){
        navigate('/addMember/'+0);
    }
    function adminProfile(){
        navigate('/adminProfile');
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
            <button className='btn btn-primary' onClick={adminProfile}>Profile</button>
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