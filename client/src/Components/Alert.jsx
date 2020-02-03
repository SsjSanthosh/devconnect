import React from "react";
import { connect } from "react-redux";

function Alert(props) {
  const { alert } = props;

  return (
    <>
      {alert !== null &&
        alert.length > 0 &&
        alert.map(a => {
          return <div style={{ color: "gold" }}>{a.msg}</div>;
        })}
    </>
  );
}

const mapStateToProps = state => {
  return {
    alert: state.alert
  };
};
export default connect(mapStateToProps)(Alert);
