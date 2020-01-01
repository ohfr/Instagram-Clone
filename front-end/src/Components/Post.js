import React, { useState }from 'react';
import api from '../Utils/api';

const Post = (props) => {
    const [post, setPost] = useState({
        // get this from redux
        // username: props.user.username,
        post_id: props.post_id,
        comment: ''
    });

    const handleChange = (e) => {
        setPost({
            ...post,
            comment: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // api call to add comment
    };


    return (
        <div>
            <div className="post-header">
                <h3>{props.username}</h3>
            </div>
            <div className="post-image">
                <img src={props.image} alt={props.title} />
            </div>
            <div>
                {/* likes button comment button */}
            </div>
            <div>
                <h3>{props.username}</h3>
                <span>{props.title}</span>
            </div>
            <div>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Add a Comment..." name="comment" onChange={handleChange} value={post.comment} />
                    <button type="submit">Post</button>
                </form>
            </div>
        </div>
    );
};

export default Post;