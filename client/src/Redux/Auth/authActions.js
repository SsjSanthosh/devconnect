import axios from "axios";
import { setAlert } from "./../Alert/alertActions";
import setAuthToken from "./setAuthToken";
export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get("/auth");
    dispatch({ type: "USER_LOADED", payload: res.data });
  } catch (err) {
    dispatch({ type: "AUTH_ERROR" });
  }
};
export const regAuth = ({ name, email, password }) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  const body = JSON.stringify({ name, email, password });

  try {
    let res = await axios.post("/users", body, config);

    dispatch({ type: "REGISTER_SUCCESS", payload: res.data });
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(err => dispatch(setAlert(err.msg, "danger")));
    }
    dispatch({ type: "REGISTER_FAIL" });
  }
};

export const loginAuth = ({ email, password }) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  const body = JSON.stringify({ email, password });

  try {
    let res = await axios.post("/auth", body, config);

    dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(err => dispatch(setAlert(err.msg, "danger")));
    }
    dispatch({ type: "LOGIN_FAIL" });
  }
};

export const logout = () => dispatch => {
  dispatch({ type: "LOGOUT" });
  dispatch({ type: "CLEAR_PROFILE" });
};
