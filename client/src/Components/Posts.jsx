import React, { useEffect } from "react";
import { connect } from "react-redux";

import { getPosts } from "./../Redux/Posts/postActions";
import PostItem from "./PostItem";
import PostForm from "./PostForm";
function Posts({ getPosts, posts }) {
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  const render = posts !== null ? <PostItem posts={posts} /> : null;

  return (
    <div className="posts-container">
      <PostForm />
      <p className="reg-title utc">Check out other user posts!</p>
      <div>{render}</div>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    posts: state.post.posts
  };
};
export default connect(mapStateToProps, { getPosts })(Posts);
