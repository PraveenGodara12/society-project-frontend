import React from "react";
import {useNavigate} from 'react-router-dom';
function AdminProfile(){
    let navigate = useNavigate();
    function showMembers(){
        navigate('/showMembers');
    }
    return (
        <div>
            <button className='btn btn-primary' onClick={showMembers}>Society Members</button>
        </div>
    );
}
export default AdminProfile;