import React, { useState } from "react";

import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { loginAuth } from "../Redux/Auth/authActions";
export function Login(props) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: ""
  });

  const { email, password } = formData;

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    props.loginAuth({ email, password });
  };
  if (props.isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <>
      <p className="h4 text-center reg-title">
        Login to your existing account to have access to your profile and posts!
      </p>
      <form className="form-container " onSubmit={handleSubmit}>
        <div className="form-group my-3 reg-form">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            id="regemail"
            value={email}
            placeholder="Enter your email"
            onChange={e => handleChange(e)}
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
            onChange={e => handleChange(e)}
            required
          />
        </div>

        <button className="btn btn-md btn-primary mb-4 ">Submit</button>
        <br />
        <Link to="/register" className="genlink">
          Don't have an account? Register here.
        </Link>
      </form>
    </>
  );
}
const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated
  };
};
export default connect(mapStateToProps, { loginAuth })(Login);
