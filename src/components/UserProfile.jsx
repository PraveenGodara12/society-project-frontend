import React, { Component, useEffect, useState } from 'react';

function UserProfile() {
    const [userid,setUserid] = useState(0);
    const [name,setName] = useState('');
    const [username,setUsername] = useState('');
    const [email,setEmail] = useState('');
    const [phone,setPhone] = useState('');
    const [houseNo,setHouseNo] = useState(0);
    const [flatSize,setFlatSize] = useState('');

    useEffect(()=>{
        setUserid(localStorage.getItem('userID'));
        setName(localStorage.getItem('name'));
        setUsername(localStorage.getItem('username'));
        setEmail(localStorage.getItem('email'));
        setPhone(localStorage.getItem('phone'));
        setHouseNo(localStorage.getItem('houseNo'));
        setFlatSize(localStorage.getItem('flatSize'));
    });
    return (
        <div>
            <h1>Login Success</h1>
            <table>
                <thead>
                    <tr>
                        <td>User ID</td>
                        <td>Name</td>
                        <td>Username</td>
                        <td>Email</td>
                        <td>Phone</td>
                        <td>House Number</td>
                        <td>Flat Size</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{userid}</td>
                        <td>{name}</td>
                        <td>{username}</td>
                        <td>{email}</td>
                        <td>{phone}</td>
                        <td>{houseNo}</td>
                        <td>{flatSize}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default UserProfile;