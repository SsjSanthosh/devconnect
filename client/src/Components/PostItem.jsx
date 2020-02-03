import React from "react";
import { addLike, removeLike, deletePost } from "./../Redux/Posts/postActions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
function PostItem({ posts, user, addLike, removeLike, deletePost }) {
  const render = posts.map(post => {
    return (
      <div key={post._id} className="post reg-title">
        <div className="post-bifurc">
          <div className="post-left">
            <img src={post.avatar} width={80} height={80} alt="avatar" />
            {post.user === user && (
              <button className="btn" onClick={() => deletePost(post._id)}>
                Delete
              </button>
            )}
          </div>
          <div className="post-desc">
            <p className="golden">{post.name}</p>
            <p>{post.text}</p>
            <p>
              {" "}
              {post.likes.length ? (
                <span className="golden">{post.likes.length}</span>
              ) : (
                "No"
              )}{" "}
              likes
              <button
                className="btn"
                onClick={e => {
                  addLike(post._id);
                }}
              >
                Like
              </button>{" "}
              <button
                className="btn"
                onClick={e => {
                  removeLike(post._id);
                }}
              >
                Unlike
              </button>
            </p>
            <p>
              {" "}
              {post.comments.length > 0 ? (
                <span className="golden">{post.comments.length}</span>
              ) : (
                "No"
              )}{" "}
              comments
              <Link className="golden" to={`/posts/${post._id}`}>
                See full post
              </Link>
            </p>
          </div>
        </div>
      </div>
    );
  });
  return <div className="post-mapper-div">{render}</div>;
}

const mapStateToProps = state => {
  return {
    user: state.auth.user._id
  };
};
export default connect(mapStateToProps, { addLike, removeLike, deletePost })(
  PostItem
);
