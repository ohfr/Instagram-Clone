import React, {useState, useEffect } from 'react';
import api from '../Utils/api';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchLogin } from '../Actions/userActions';

const Login = (props) => {
    const [user, setUser] = useState({
        username: '',
        password: ''
    });
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (user.username && user.password) {
            api().post("/users/login", user)
                .then(res => {
                    console.log(res.data)
                    localStorage.setItem("token", res.data.token);
                    props.fetchLogin(res.data);
                    props.history.push("/");
                })
                .catch(err => {
                    console.log(err);
                });

        };
    };

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div>
            <div>
                <h2>InstaClone</h2>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="username" placeholder="Username" value={user.username} onChange={handleChange} />
                    <input type="password" name="password" placeholder="Password" value={user.password} onChange={handleChange} />
                    <button type="submit">Login</button>
                </form>
                <p>Don't have an account? <Link to="/register">Sign Up!</Link></p>
            </div>
        </div>
    );
};

const mapDispathToProps = {
    fetchLogin,
};

export default connect(null, mapDispathToProps)(Login);