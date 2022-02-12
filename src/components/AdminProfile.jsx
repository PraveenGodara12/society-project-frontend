import React from "react";
import {useNavigate} from 'react-router-dom';
function AdminProfile(){
    let navigate = useNavigate();
    function showMembers(){
        navigate('/showMembers');
    }
    function showMaintenance(){
        navigate('/showMaintenance');
    }
    return (
        <div>
            <button className='btn btn-primary' onClick={showMembers}>Society Members</button>
            <button className='btn btn-primary' onClick={showMaintenance}>Maintenance Records</button>
        </div>
    );
}
export default AdminProfile;