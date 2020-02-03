import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

function PrivateRoute({ Component, isAuthenticated, loading, ...rest }) {
  return (
    <div>
      <Route
        {...rest}
        render={props =>
          !isAuthenticated ? <Redirect to="/login" /> : <Component {...props} />
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
