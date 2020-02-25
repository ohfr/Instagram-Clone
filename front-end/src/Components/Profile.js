import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import api from '../Utils/api';
import { fetchUser } from '../Actions/userActions';

const Profile = (props) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        if (!props.user.username) {
            props.fetchUser();
        }else if (props.user.username) {
        api().get(`/posts/${props.user.username}`)
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            });
        }
    }, [props.user]);

    return (
        <div>

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
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);