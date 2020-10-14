import React, { useState } from "react";
import { connect } from "react-redux";
import "./Forms.scss";

import { setAlert } from "./../Redux/Alert/alertActions";

import { regAuth, loadUser } from "./../Redux/Auth/authActions";
import { Link, Redirect } from "react-router-dom";

function Register(props) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
  });

  const { name, email, password, confirmPassword } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      props.setAlert("Passwords dont match", "crimson");
      setFormData({ ...formData, password: "", confirmPassword: "" });
    } else {
      props.regAuth({ name, email, password });
    }
  };
  if (props.isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <>
      <p className=" text-center reg-title">
        Register with our site to access all posts and connect to other devs!
      </p>
      <form className="register-container" onSubmit={handleSubmit}>
        <div className="form-group my-3 reg-form">
          <label htmlFor="name">Name</label>
          <input
            type="name"
            name="name"
            className="form-control"
            id="regname"
            value={name}
            placeholder="Enter your name"
            onChange={(e) => handleChange(e)}
            required
          />
        </div>
        <div className="form-group my-3 reg-form">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            id="regemail"
            value={email}
            placeholder="Enter your email"
            onChange={(e) => handleChange(e)}
            required
          />
        </div>
        <div className="form-group my-3 reg-form">
          <label htmlFor="password">Enter your password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            value={password}
            id="regpassword"
            placeholder="Enter your password"
            onChange={(e) => handleChange(e)}
            required
          />
        </div>
        <div className="form-group my-3 reg-form">
          <label htmlFor="password">Confirm your password</label>
          <input
            type="password"
            name="confirmPassword"
            className="form-control"
            value={confirmPassword}
            id="regconfpassword"
            placeholder="Enter your password again"
            onChange={(e) => handleChange(e)}
            required
          />
        </div>
        <button className="btn btn-md btn-primary mb-4 reg-form">Submit</button>
        <br />
        <Link to="/login" className="genlink">
          Already have an account? Log in here.
        </Link>
      </form>
    </>
  );
}
const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  };
};
export default connect(mapStateToProps, { setAlert, regAuth, loadUser })(
  Register
);
