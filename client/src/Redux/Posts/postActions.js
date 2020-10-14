import axios from "axios";
import { setAlert } from "./../Alert/alertActions";
export const getPosts = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/posts");

    dispatch({
      type: "GET_POSTS",
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: "POST_ERROR",
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
// get single post
export const getPost = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/posts/${id}`);

    dispatch({
      type: "GET_POST",
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: "POST_ERROR",
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
// Add like
export const addLike = (id) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/posts/like/${id}`);

    dispatch({
      type: "UPDATE_LIKES",
      payload: { id: id, likes: res.data },
    });
  } catch (error) {
    dispatch({
      type: "POST_ERROR",
      payload: { msg: error.response.statusText },
    });
  }
};

// remove like
export const removeLike = (id) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/posts/unlike/${id}`);
    dispatch({ type: "UPDATE_LIKES", payload: { id, likes: res.data } });
  } catch (error) {
    dispatch({
      type: "POST_ERROR",
      payload: { msg: error.response.statusText },
    });
  }
};

// delete post
export const deletePost = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/posts/${id}`);
    dispatch({ type: "DELETE_POST", payload: id });
    setAlert("Post deleted", "success");
  } catch (error) {
    dispatch({
      type: "POST_ERROR",
      payload: { msg: error.response.statusText },
    });
  }
};

// add post
export const addPost = (text) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.post(`/api/posts`, text, config);
    dispatch({ type: "ADD_POST", payload: res.data });
    dispatch(setAlert("Post added", "success"));
  } catch (error) {
    console.log(error);
    dispatch({
      type: "POST_ERROR",
      payload: { msg: error.response.statusText },
    });
  }
};

// add comment
export const addComment = (text, id) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.post(`/api/posts/comments/${id}`, text, config);
    dispatch({ type: "ADD_COMMENT", payload: { comment: res.data, id } });
    dispatch(setAlert("Comment added", "success"));
  } catch (error) {
    console.log(error);
    dispatch({
      type: "COMMENT_ERROR",
      payload: { msg: error.response.statusText },
    });
  }
};

// delete comment
export const removeComment = (pid, cid) => async (dispatch) => {
  try {
    await axios.delete(`/api/posts/comments/${pid}/${cid}`);
    dispatch({ type: "DELETE_COMMENT", payload: { pid, cid } });
    dispatch(setAlert("Comment deleted", "success"));
  } catch (error) {
    console.log(error);
    dispatch({
      type: "POST_ERROR",
      payload: { msg: error.response.statusText },
    });
  }
};
