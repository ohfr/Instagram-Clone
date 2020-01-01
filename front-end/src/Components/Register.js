import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../Utils/api';
import { connect } from 'react-redux';
import { fetchLogin } from '../Actions/userActions';

const Register = (props) => {
    const [user,setUser] = useState({
        username: '',
        password: '',
        first_name: '',
        last_name: '',
    });

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (user.username && user.password && user.first_name && user.last_name) {
            api().post("/users/register", user)
                .then(res => {
                    console.log(res);
                    localStorage.setItem("token", res.data.token);
                    props.fetchLogin(res.data);
                    props.history.push("/");
                })
                .catch(err => {
                    console.log(err);
                });
        };  
    };

    return (
        <div>
            <div>
                <h2>InstaClone</h2>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Username" name="username" value={user.username} onChange={handleChange} />
                    <input type="password" placeholder="Password" name="password" value={user.password} onChange={handleChange} />
                    <input type="text" placeholder="First Name" name="first_name" value={user.first_name} onChange={handleChange} />
                    <input type="text" placeholder="Last Name" name="last_name" value={user.last_name} onChange={handleChange} />
                    <button type="submit">Sign Up!</button>
                </form>
                <p>Already have an account? <Link to="/login">Log In</Link></p>
            </div>
        </div>
    );
};

const mapDispachToProps = {
    fetchLogin
};

export default connect(null, mapDispachToProps)(Register);
