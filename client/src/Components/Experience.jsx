import React from "react";
import Moment from "react-moment";
import { deleteExperience } from "./../Redux/Profile/profileActions";
import { connect } from "react-redux";
function Experience({ profile, deleteExperience, user }) {
  const render = profile
    ? profile.experience.map(exp => {
        return (
          <div className="experience" key={exp._id}>
            <div className="experience-deets">
              Title - <span className="golden">{exp.title}</span>{" "}
            </div>
            <div className="experience-deets">
              Company - <span className="golden">{exp.company}</span>
            </div>
            {exp.location && (
              <div className="experience-deets">
                Location - <span className="golden">{exp.location}</span>
              </div>
            )}
            <div className="experience-deets">
              Duration -{" "}
              <span>
                <Moment format="DD/MM/YYYY" className="golden">
                  <span>{exp.from}</span>
                </Moment>{" "}
                -{" "}
                {exp.current ? (
                  <span className="golden">Current</span>
                ) : (
                  <Moment format="DD/MM/YYYY">{exp.to}</Moment>
                )}
              </span>
            </div>
            {exp.description && <div>Job description - {exp.description}</div>}
            {user._id == profile.user._id && (
              <button
                className="btn"
                onClick={() => {
                  deleteExperience(exp._id);
                }}
              >
                Delete experience
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
export default connect(mapStateToProps, { deleteExperience })(Experience);
