import React, { useState }from 'react';
import api from '../Utils/api';
import { connect } from 'react-redux';

const Post = (props) => {
    const [post, setPost] = useState({
        // get this from redux
        username: props.user,
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
        console.log(post)
        api().post("/posts/comments", post)
            .then(res => {
                console.log(res);
            })
            .catch(err => console.log(err))
    };


    return (
        <div className="post-div">
            <div className="post-header">
                <h3 className="post-user">{props.username}</h3>
            </div>
            <div className="post-image-div">
                <img className="post-image" src={props.image} alt={props.title} />
            </div>
            <div>
                {/* likes button comment button */}
            </div>
            <div className="title-div">
                <h4 className="comment">{props.username} </h4>
                <p className="comment">{props.title}</p>
            </div>
            <div className="comments-div">
                {props.comments.map((cur, index) => {
                    return (
                        <div className="comments"key={index}>
                            <h4 className="comment">{cur.username} </h4>
                            <span className="comment">{cur.comment}</span>
                        </div>
                    );
                })}
            </div>
            <div>
                <form className="comment-form" onSubmit={handleSubmit}>
                    <input className="comment-box" type="text" placeholder="Add a Comment..." name="comment" onChange={handleChange} value={post.comment} />
                    <button className={post.comment ? "comment-btn" : "comment-btn-grayed" } type="submit">Post</button>
                </form>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        user: state.user.username
    };
};

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(Post);