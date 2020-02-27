import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import Login from "./../Components/Login";
function PrivateRoute({ Component, isAuthenticated, loading, ...rest }) {
  return (
    <div>
      <Route
        {...rest}
        render={props =>
          !isAuthenticated ? <Redirect to="/login" /> : <Component {...rest} />
        }
      />
    </div>
  );
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    loading: state.auth.loading
  };
};
export default connect(mapStateToProps)(PrivateRoute);
