import React, { useEffect, useState } from 'react';
import UserService from '../services/UserService';
import { useNavigate, Link } from 'react-router-dom';
import validator from 'validator';

function UserLogin() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [rememberme, setRememberme] = useState(false);

    useEffect(() => {
        setRememberme(localStorage.getItem("rememberme"));
        if (localStorage.getItem("rememberme")) {
            console.log(localStorage.getItem("username"));
            setUsername(localStorage.getItem("username"));
            setPassword(localStorage.getItem("password"));
        }
    }, []);

    let navigate = useNavigate();
    function myValidator() {
        let uValid = false;
        let pValid = false;
        if (validator.isAlphanumeric(username, 'en-US', { ignore: "._" }) && validator.isLength(username, { min: 12 })) {
            uValid = true;
        }
        if (validator.isStrongPassword(password, { minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 })) {
            pValid = true;
        }
        return uValid && pValid;
    }
    function login(e) {
        e.preventDefault();
        if (!myValidator()) {
            alert("Invalid Username or Password!");
            return;
        }
        let user = { username: username, password: password };
        console.log('User =>' + JSON.stringify(user));
        UserService.userLogin(user).then(res => {
            localStorage.setItem('userID', res.data.userID);
            localStorage.setItem('name', res.data.name);
            localStorage.setItem('username', res.data.username);
            localStorage.setItem('email', res.data.email);
            localStorage.setItem('phone', res.data.phone);
            localStorage.setItem('houseNo', res.data.houseNo);
            localStorage.setItem('flatSize', res.data.flatSize);
            if (rememberme) {
                localStorage.setItem('password', res.data.password);
                localStorage.setItem('rememberme', true);
            } else {
                localStorage.setItem('password', '');
                localStorage.setItem('rememberme', false);
            }
            navigate('/userProfile');
        });
    }
    return (
        <div>
        <div className="loginBackGround">
            <nav className="navbar navbar-expand-lg navbar-light fixed-top">
                <div className="container">
                    <h1>
                        Society Maintenance Portal
                    </h1>
                </div>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                    <ul className="navbar-nav ml-auto navbar-right">
                        <li className="nav-item">
                            <Link className="nav-link" to={"/"}><p className='navi-links'>Home</p></Link>
                        </li>
                        <li className="nav-item ">
                            <Link className="nav-link" to={"/userlogin"}><p className='navi-links-active'>User Login</p></Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to={"/adminlogin"}><p className='navi-links'>Admin Login</p></Link>
                        </li>
                    </ul>
                </div>
            </nav>
            <br></br>
            <section className="container">
                <div className="row">
                    <div className="card col-md-6 offset-md-3 offset-md-3">
                        <br />
                        {
                            <h2 className='text-center'>User Login</h2>
                        }
                        <div className="card-body">
                            <form onSubmit={login}>
                                <div className="form-group">
                                    <label> Username: </label>
                                    <input placeholder="Enter username" name="username" className="form-control"
                                        type="text" value={username} onChange={(event) => setUsername(event.target.value)} />
                                </div>
                                <br />
                                <div className="form-group">
                                    <label> Password: </label>
                                    <input placeholder="Enter password" name="password" className="form-control"
                                        type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
                                </div>
                                <br />
                                <div className="form-group">
                                    <input name="rememberme" id="rememberme" className="form-check-input"
                                        type="checkbox" checked={rememberme} onChange={(event) => setRememberme(event.target.checked)} />
                                    <label htmlFor="rememberme"> Remember Me </label>
                                </div>
                                <br />
                                <div className="text-center"><button type="submit" className="btn btn-success loginButton" >Login</button></div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
        <footer class="page-footer font-small blue myFooter">
        <div class="footer-copyright text-center py-3"><span className='navi-links'>© 2020 Copyright:
            <a href="https://localhost:3000/"> SocietyMaintenance.com</a></span>
        </div>
    </footer>
    </div>
    );
}

export default UserLogin;