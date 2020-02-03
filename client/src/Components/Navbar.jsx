import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.scss";
import { connect } from "react-redux";
import { logout } from "./../Redux/Auth/authActions";
function Navbar(props) {
  console.log(props.user);
  const guestLinks = (
    <div className="Navbar">
      <Link to="/">
        <span>Home</span>{" "}
      </Link>
      <Link to="/register">
        <span>Register</span>{" "}
      </Link>
      <Link to="/login">
        {" "}
        <span>Login</span>
      </Link>
      <Link to="/profiles">
        <span>Our users</span>
      </Link>
    </div>
  );

  const authLinks = (
    <div className="Navbar">
      <Link to="/">
        <span>Home </span>
      </Link>
      <Link to="/dashboard">
        <span>Dashboard</span>{" "}
      </Link>
      <Link to="/profiles">
        <span>Our users</span>
      </Link>
      <Link to="/posts">
        <span>Posts</span>
      </Link>
      <Link to="/" onClick={props.logout}>
        {" "}
        Logout , <span className="golden">{props.user.name}</span>
      </Link>
    </div>
  );
  return <div>{props.isAuthenticated ? authLinks : guestLinks}</div>;
}
const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
  };
};
export default connect(mapStateToProps, { logout })(Navbar);
