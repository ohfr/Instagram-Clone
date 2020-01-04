import React, { useState, useEffect } from 'react';
import Nav from './Nav';
import api from '../Utils/api';
import Post from './Post';

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
    
    return (
        <div className="home-div">
            <Nav />
            {data.map((cur, index) => {
                return <Post key={index} post_id={cur.id} title={cur.title} image={cur.image} username={cur.username} comments={cur.comments} />
            })}
        </div>
    );
};


export default Home;