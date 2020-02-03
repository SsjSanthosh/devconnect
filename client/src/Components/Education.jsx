import React from "react";
import Moment from "react-moment";
import { connect } from "react-redux";
import { deleteEducation } from "./../Redux/Profile/profileActions";
function Education({ profile, deleteEducation, user }) {
  const render = profile
    ? profile.education.map(edu => {
        return (
          <div className="education" key={edu._id}>
            <div className="education-deets">
              School / University <span className="golden"> {edu.school} </span>
            </div>
            <div className="education-deets">
              Degree <span className="golden">{edu.degree}</span>{" "}
            </div>

            <div className="education-deets">
              Duration -{" "}
              <div>
                <span className="golden">
                  <Moment format="DD/MM/YYYY">{edu.from}</Moment>
                </span>{" "}
                -{" "}
                {edu.current ? (
                  <span className="golden">Current</span>
                ) : (
                  <Moment format="DD/MM/YYYY">
                    <span className="golden">{edu.to}</span>
                  </Moment>
                )}
              </div>
            </div>
            {user._id == profile.user._id && (
              <button
                className="btn"
                onClick={() => {
                  deleteEducation(edu._id);
                }}
              >
                Delete education
              </button>
            )}
          </div>
        );
      })
    : null;
  return <div>{render}</div>;
}
const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    loading: state.profile.loading,
    profile: state.profile.profile,
    user: state.auth.user
  };
};
export default connect(mapStateToProps, { deleteEducation })(Education);
