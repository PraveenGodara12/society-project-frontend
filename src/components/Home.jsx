import React from 'react';
import {useNavigate} from 'react-router-dom';

function Home(){
    let navigate = useNavigate();
    function userLogin(){
        navigate('/userLogin');
    }
    function adminLogin(){
        navigate('/adminLogin');
    }
    return (
        <div>
            <button className='btn btn-primary' onClick={userLogin}>User Login</button>
            <button className='btn btn-primary' onClick={adminLogin}>Admin Login</button>
        </div>
    );
}
export default Home;