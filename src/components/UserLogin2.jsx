import React, {  useState } from 'react';
import UserService from '../services/UserService';
import {useNavigate,Link} from 'react-router-dom';

/*
class UserLogin extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username: '',
            password: ''
        }
        this.changeUsernameHandler = this.changeUsernameHandler.bind(this);
        this.changePasswordHandler = this.changePasswordHandler.bind(this);
        this.login = this.login.bind(this);
    }

    changeUsernameHandler(event){
        this.setState({username:event.target.value});
        console.log("login");
    }
    changePasswordHandler(event){
        this.setState({password:event.target.value});
        console.log("login");
    }
    login(e){
        e.preventDefault();
        let user = {username: this.state.username, password:this.state.password};
        console.log('User =>'+JSON.stringify(user));
        UserService.userLogin(user).then(res=>{
            localStorage.setItem('user',res.data);

        });
    }
    render() {
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
                                <form onSubmit={this.login}>
                                    <div className="form-group">
                                        <label> Username: </label>
                                        <input placeholder="Enter username" name="username" className="form-control"
                                            value={this.state.username} onChange={this.changeUsernameHandler} />
                                    </div>
                                    <div className="form-group">
                                        <label> Username: </label>
                                        <input placeholder="Enter username" name="username" className="form-control"
                                            value={this.state.username} onChange={this.changeUsernameHandler} />
                                    </div>
                                    <div className="form-group">
                                        <label> Password: </label>
                                        <input placeholder="Enter password" name="password" className="form-control"
                                            value={this.state.password} onChange={this.changePasswordHandler} />
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
}

export default UserLogin;
*/

function UserLogin2(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    let navigate = useNavigate();
    function login(e){
        e.preventDefault();
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
    <div className='loginBackGround'>
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container">
          <h1>
            Wardhman Society Maintenance Portal
          </h1>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to={"/userlogin"}>User Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/adminlogin"}>Admin Login</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="auth-wrapper">
        <div className="auth-inner">
        <form onSubmit={login}>
                <h3>Login</h3>

                <div className="form-group">
                    <label>Username</label>
                    <input type="text" name="username" className="form-control" placeholder="Enter username" 
                    value={username} onChange={(event)=>setUsername(event.target.value)}/>
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" name="password" className="form-control" placeholder="Enter password"
                    value={password} onChange={(event)=>setPassword(event.target.value)}/>
                </div>

                <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                    </div>
                </div>

                <button type="submit" className="btn btn-primary btn-block">Submit</button>
                <p className="forgot-password text-right">
                    Forgot <a href="#">password?</a>
                </p>
            </form>
        </div>
      </div>
    </div>
    </div>
    );
}

export default UserLogin2;