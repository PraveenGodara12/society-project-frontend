import React, {useState, useEffect} from "react";
import {useNavigate} from 'react-router-dom';
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



function AdminProfile(){
    let navigate = useNavigate();
    const isIdle = useIdle({timeToIdle: 1000*60*5});
    if(isIdle){
        navigate('/');
    }
    const [adminID,setAdminid] = useState(0);
    const [name,setName] = useState('');
    const [username,setUsername] = useState('');
    const [email,setEmail] = useState('');
    const [phone,setPhone] = useState('');

    useEffect(()=>{
        setAdminid(localStorage.getItem('adminID'));
        setName(localStorage.getItem('name'));
        setUsername(localStorage.getItem('username'));
        setEmail(localStorage.getItem('email'));
        setPhone(localStorage.getItem('phone'));
    },[adminID]);
    function showMembers(){
        navigate('/showMembers');
    }
    function showMaintenance(){
        navigate('/showMaintenance');
    }
    function showDefaulters(){
        navigate('/showDefaulters');
    }
    function showSocietyBillRecords(){
        navigate('/showSocietyBillRecords');
    }
    return (
        <div>
            <button className='btn btn-primary' onClick={showMembers}>Society Members</button>
            <button className='btn btn-primary' onClick={showMaintenance}>Maintenance Records</button>
            <button className='btn btn-primary' onClick={showDefaulters}>Show Defaulters Records</button>
            <button className='btn btn-primary' onClick={showSocietyBillRecords}>Show Society Bill Records</button>
            <h1>Login Success</h1>
            <table>
                <thead>
                    <tr>
                        <td>Admin ID</td>
                        <td>Name</td>
                        <td>Username</td>
                        <td>Email</td>
                        <td>Phone</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{adminID}</td>
                        <td>{name}</td>
                        <td>{username}</td>
                        <td>{email}</td>
                        <td>{phone}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
export default AdminProfile;