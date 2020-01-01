import React, { useState, useEffect } from 'react';
import Nav from './Nav';
import api from '../Utils/api';
import Post from './Post';
import { connect } from 'react-redux';
import { fetchLogout } from '../Actions/userActions';
const Home = (props) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        api().get("/posts/all")
            .then(res => {
                console.log(res);
                setData(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    const handleLogout = () => {
        props.fetchLogout();
        props.history.push("/login");
    };
    
    return (
        <div>
            <button onClick={handleLogout}>Logout</button>
            <Nav />
            {data.map((cur, index) => {
                return <Post key={index} post_id={cur.id} title={cur.title} image={cur.image} username={cur.username} />
            })}
        </div>
    );
};

const mapDispatchToProps = {
    fetchLogout
};

export default connect(null, mapDispatchToProps)(Home);