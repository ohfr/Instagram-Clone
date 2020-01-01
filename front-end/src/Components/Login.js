import React, {useState, useEffect } from 'react';
import api from '../Utils/api';
import { Link } from 'react-router-dom';

const Login = () => {
    const [user, setUser] = useState({
        username: '',
        password: ''
    });
    
    const handleSubmit = (e) => {
        if (user) {
            api().post("/login", user)
                .then(res => {

                })
                .catch(err => {

                });
        };
    };
    const handleChange = (e) => {
        setUser({
            [e.target.name]: e.target.value
        });
    };
    return (
        <div>
            <div>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="username" placeholder="Username" value={user.username} onChange={handleChange} />
                    <input type="password" name="password" placeholder="Password" value={user.password} onChange={handleChange} />
                    <button type="submit">Login</button>
                </form>
                <button>Don't have an account? <Link to="/register">Sign Up!</Link></button>
            </div>
        </div>
    );
};

export default Login;