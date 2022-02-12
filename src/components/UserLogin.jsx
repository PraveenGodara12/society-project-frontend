import React, { useState } from 'react';
import UserService from '../services/UserService';
import {useNavigate} from 'react-router-dom';
import validator from 'validator';

function UserLogin(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    let navigate = useNavigate();
    function myValidator(){
        let uValid=false;
        let pValid=false;
        if(validator.isAlphanumeric(username,'en-US',{ignore:"._"})&&validator.isLength(username,{min:12})){
            uValid=true;
        }
        if(validator.isStrongPassword(password,{minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1})){
            pValid=true;
        }
        return uValid&&pValid;
    }
    function login(e){
        e.preventDefault();
        if(!myValidator()){
            alert("Invalid Username or Password!");
            return;
        }
        let user = {username: username, password:password};
        console.log('User =>'+JSON.stringify(user));
        UserService.userLogin(user).then(res=>{
            localStorage.setItem('userID',res.data.userID);
            localStorage.setItem('name',res.data.name);
            localStorage.setItem('username',res.data.username);
            localStorage.setItem('email',res.data.email);
            localStorage.setItem('phone',res.data.phone);
            localStorage.setItem('houseNo',res.data.houseNo);
            localStorage.setItem('flatSize',res.data.flatSize);
            navigate('/userProfile');
        });
    }
    return (
        <div>
                <br></br>
                <div className="container">
                    <div className="row">
                        <div className="card col-md-6 offset-md-3 offset-md-3">
                            {
                                <h2 className='text-center'>User Login</h2>
                            }
                            <div className="card-body">
                                <form onSubmit={login}>
                                    <div className="form-group">
                                        <label> Username: </label>
                                        <input placeholder="Enter username" name="username" className="form-control"
                                            value={username} onChange={(event)=>setUsername(event.target.value)} />
                                    </div>
                                    <div className="form-group">
                                        <label> Password: </label>
                                        <input placeholder="Enter password" name="password" className="form-control"
                                            value={password} onChange={(event)=>setPassword(event.target.value)} />
                                    </div>

                                    <button className="btn btn-success" >Login</button>
                                </form>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
    );
}

export default UserLogin;