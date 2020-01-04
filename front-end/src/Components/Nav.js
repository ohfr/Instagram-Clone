import React from 'react';
import { connect } from 'react-redux';
import { fetchLogout } from '../Actions/userActions';

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
                    <p className="nav-item">Search</p>
                    <p className="nav-item">Likes</p>
                    <p className="nav-item">Profile</p>
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