import React, { useState, useEffect } from 'react';
import AdminService from '../services/AdminService';
import {useNavigate} from 'react-router-dom';
import validator from 'validator';

function AdminLogin(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [rememberme, setRememberme] = useState(false);

    useEffect(()=>{
        setRememberme(localStorage.getItem("rememberme"));
        if(localStorage.getItem("rememberme")){
            console.log(localStorage.getItem("username"));
            setUsername(localStorage.getItem("username"));
            setPassword(localStorage.getItem("password"));
        }
    },[]);

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
        AdminService.adminLogin(user).then(res=>{
            localStorage.setItem('adminID',res.data.adminID);
            localStorage.setItem('name',res.data.name);
            localStorage.setItem('username',res.data.username);
            localStorage.setItem('email',res.data.email);
            localStorage.setItem('phone',res.data.phone);
            if(rememberme){
                localStorage.setItem('password', res.data.password);
                localStorage.setItem('rememberme',true);
            }else{
                localStorage.setItem('password', '');
                localStorage.setItem('rememberme',false);
            }
            navigate('/adminProfile');
        });
    }
    return (
        <div>
                <br></br>
                <div className="container">
                    <div className="row">
                        <div className="card col-md-6 offset-md-3 offset-md-3">
                            {
                                <h2 className='text-center'>Admin Login</h2>
                            }
                            <div className="card-body">
                                <form onSubmit={login}>
                                    <div className="form-group">
                                        <label> Username: </label>
                                        <input placeholder="Enter username" name="username" className="form-control"
                                           type="text" value={username} onChange={(event)=>setUsername(event.target.value)} />
                                    </div>
                                    <div className="form-group">
                                        <label> Password: </label>
                                        <input placeholder="Enter password" name="password" className="form-control"
                                          type="password"  value={password} onChange={(event)=>setPassword(event.target.value)} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="rememberme"> Remember Me: </label>
                                        <input name="rememberme" id="rememberme" className="form-control"
                                           type="checkbox" checked={rememberme} onChange={(event)=>setRememberme(event.target.checked)} />
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

export default AdminLogin;