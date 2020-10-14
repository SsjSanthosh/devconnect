import axios from "axios";
import { setAlert } from "./../Alert/alertActions";

export const getProfile = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/profile/me");
    dispatch({ type: "GET_PROFILE", payload: res.data });
  } catch (err) {
    dispatch({
      type: "PROFILE_ERRORS",
      payload: { msg: err, status: err.response },
    });
  }
};

// get all profiles
export const getAllProfiles = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/profile");
    dispatch({
      type: "CLEAR_PROFILE",
    });
    dispatch({
      type: "GET_PROFILES",
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: "PROFILE_ERROR",
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

// get profile by ID
export const getProfileByUserID = (userID) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/profile/user/${userID}`);
    dispatch({
      type: "GET_PROFILE",
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: "PROFILE_ERROR",
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

// get GitHub repos
export const getRepos = (username) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/profile/github/${username}`);
    dispatch({
      type: "GET_REPOS",
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: "PROFILE_ERROR",
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};
export const createProfile = (formData, history, edit = false) => async (
  dispatch
) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.post("/api/profile", formData, config);

    dispatch({ type: "GET_PROFILE", payload: res.data });
    dispatch(setAlert(edit ? "Profile updated" : "Profile Created"));
    if (!edit) {
      history.push("/dashboard");
    }
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((err) => dispatch(setAlert(err.msg, "danger")));
    }
    dispatch({
      type: "PROFILE_ERRORS",
      payload: { msg: err.response.statusTex, status: err.response.status },
    });
  }
};

export const addExperience = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.put("/api/profile/experience", formData, config);

    dispatch({ type: "UPDATE_PROFILE", payload: res.data });
    dispatch(setAlert("Experience added"));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((err) => dispatch(setAlert(err.msg, "danger")));
    }
  }
};

export const addEducation = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.put("/api/profile/education", formData, config);

    dispatch({ type: "UPDATE_PROFILE", payload: res.data });
    dispatch(setAlert("Education added", "success"));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((err) => dispatch(setAlert(err.msg, "danger")));
    }
  }
};

export const deleteEducation = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/profile/education/${id}`);

    dispatch({ type: "UPDATE_PROFILE", payload: res.data });
    dispatch(setAlert("Education deleted", "success"));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((err) => dispatch(setAlert(err.msg, "danger")));
    }
  }
};

export const deleteExperience = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/profile/experience/${id}`);

    dispatch({ type: "UPDATE_PROFILE", payload: res.data });
    dispatch(setAlert("Experience deleted", "success"));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((err) => dispatch(setAlert(err.msg, "danger")));
    }
  }
};
