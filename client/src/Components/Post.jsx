import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import { withRouter } from "react-router-dom";
import {
  addComment,
  removeComment,
  getPost,
} from "./../Redux/Posts/postActions";
function Post({ post, addComment, removeComment, match, getPost, user }) {
  const [text, setText] = useState("");
  useEffect(() => {
    getPost(match.params.id);
  }, [getPost, match.params.id]);

  return (
    <div className="posts-container ">
      <div className="reg-title">
        {post.text}
        <p>{post.name}</p>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addComment({ text }, match.params.id);
          getPost(match.params.id);
          setText("");
        }}
        className="post-text-container "
      >
        <p className="reg-title">Add a comment</p>
        <textarea
          name="text"
          cols="60"
          rows="2"
          placeholder="Penny for your thoughts?"
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>{" "}
        <br />
        <button className="btn">Submit</button>
      </form>
      <span className="reg-title">Comments</span> -
      <div className="comment-div">
        {post != null &&
          post.comments &&
          post.comments.map((comment) => {
            return (
              <div className="comment reg-title" key={comment._id}>
                <img src={comment.avatar} alt="avatar" width="80" height="80" />

                <div className="comment-desc">
                  <p>{comment.name}</p>
                  <p>{comment.text}</p>
                  {user === comment.user && (
                    <button
                      className="btn"
                      onClick={() => {
                        removeComment(match.params.id, comment._id);
                      }}
                    >
                      Delete Comment
                    </button>
                  )}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    post: state.post.post,
    user: state.auth.user._id,
  };
};
export default withRouter(
  connect(mapStateToProps, { addComment, removeComment, getPost })(Post)
);
