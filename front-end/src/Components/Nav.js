import React from 'react';
import { connect } from 'react-redux';
import { fetchLogout } from '../Actions/userActions';
import { Link } from 'react-router-dom';

const Nav = (props) => {
    
    const handleLogout = () => {
        props.fetchLogout();
        props.history.push("/login");
    };

    return (
        <header className="nav-header">
            <nav className="nav">
                <div className="nav-left">
                    {/* logo here */}

                    {/* italics font for title */}
                    <h1 className="logo-h1">InstaClone</h1>
                </div>
                <div className="nav-right">
                    <Link className="nav-item" to="/">Search</Link>
                    <Link className="nav-item"to="/">Likes</Link>
                    <Link className="nav-item"to="/">Profile</Link>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            </nav>
        </header>
    );
};

const mapDispatchToProps = {
    fetchLogout
};

export default connect(null, mapDispatchToProps)(Nav);