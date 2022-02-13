import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Home() {
    let navigate = useNavigate();
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
                                <Link className="nav-link" to={"/"}><p className='navi-links-active'>Home</p></Link>
                            </li>
                            <li className="nav-item ">
                                <Link className="nav-link" to={"/userlogin"}><p className='navi-links'>User Login</p></Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to={"/adminlogin"}><p className='navi-links'>Admin Login</p></Link>
                            </li>
                        </ul>
                    </div>
                </nav>
                <br></br>
                <section className="container text-center">
                    <div className="row">
                        <div className="card col-md-8 offset-md-2 offset-md-2 homepagecontent">
                            <h1>Welcome to Society Maintenance Portal</h1>
                        </div>
                    </div>
                    <div className='row'>
                    <div className="card col-md-8 offset-md-2 offset-md-2 homepagecontent">
                        <h5>The perfect solution to make living in Society a pleasant and convenient experience</h5>
                        <p>Key factors of Society Maintenance Portal is the ease of operating the portal both for admins and users, and the portal is quite comprehensive for managing and maintaining.</p>
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

export default Home;