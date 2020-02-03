import React, { useState } from "react";
import { connect } from "react-redux";
import { addPost } from "./../Redux/Posts/postActions";
function PostForm({ addPost }) {
  const [postText, setText] = useState("");
  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault();
          addPost({ postText });
          setText("");
        }}
        className="post-text-container"
      >
        <p className="reg-title">Make your own post!</p>
        <textarea
          name="text"
          cols="100"
          rows="5"
          placeholder="Penny for your thoughts?"
          value={postText}
          onChange={e => setText(e.target.value)}
        ></textarea>{" "}
        <button className="btn">Submit post</button>
      </form>
    </div>
  );
}

export default connect(null, { addPost })(PostForm);
