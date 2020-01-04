import React, { useState, useEffect } from 'react';
import Nav from './Nav';
import api from '../Utils/api';
import Post from './Post';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchUser } from '../Actions/userActions';

const Home = (props) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        if (!props.user.username) {
            props.fetchUser();
        }
        api().get("/posts/all")
            .then(res => {
                // console.log(res);
                setData(res.data);
            })
            .catch(err => {
                console.log(err);
            });
        console.log(props.user)
    }, []);
    
    return (
        <div className="home-div">
            <Route path="/" component={Nav} />
            {data.map((cur, index) => {
                return <Post key={index} post_id={cur.id} title={cur.title} image={cur.image} username={cur.username} comments={cur.comments} />
            })}
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        user: state.user
    };
};

const mapDispatchToProps = {
    fetchUser
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);