import React, { Component } from 'react';
import {useNavigate} from 'react-router-dom';

/*
class Home extends Component {
    constructor(props){
        super(props)
        this.state={
            value:''
        }
        this.userLogin=this.userLogin.bind(this);
    }
    userLogin(){
        let navigate = useNavigate();
        navigate('/userLogin');
    }
    render() {
        return (
            <div>
                <button className='btn btn-primary' onClick={this.userLogin}>User Login</button>
            </div>
        );
    }
}

export default Home;
*/
function Home(){
    let navigate = useNavigate();
    function userLogin(){
        navigate('/userLogin');
    }
    return (
        <div>
            <button className='btn btn-primary' onClick={userLogin}>User Login</button>
        </div>
    );
}
export default Home;